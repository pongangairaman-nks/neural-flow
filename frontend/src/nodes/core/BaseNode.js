import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { HandleRenderer } from './HandleRenderer';
import { useCanvasStore } from '../../store/canvasStore';

// Basic field registry for built-in field types
import { TextField } from './fields/TextField';
import { SelectField } from './fields/SelectField';
import { TextAreaField } from './fields/TextAreaField';
import { SwitchField } from './fields/SwitchField';
import { PillField } from './fields/PillField';

const defaultContainerStyle = {
  width: 360,
};

const builtinFieldRenderers = {
  text: TextField,
  select: SelectField,
  textarea: TextAreaField,
  switch: SwitchField,
  pill: PillField,
};

export const BaseNode = ({ id, data, config }) => {
  const ctx = useMemo(() => ({ id, data: data || {} }), [id, data]);
  const removeNode = useCanvasStore((s) => s.removeNode);
  const updateNodeField = useCanvasStore((s) => s.updateNodeField);
  const nodesState = useCanvasStore((s) => s.nodes);
  const updateNodeInternals = useUpdateNodeInternals();

  const computeInitialState = useCallback(() => {
    if (typeof config?.deriveInitialState === 'function') {
      return config.deriveInitialState(ctx) || {};
    }
    const st = {};
    (config?.fields || []).forEach((f) => {
      const def = typeof f.deriveDefault === 'function' ? f.deriveDefault(ctx) : f.defaultValue;
      st[f.key] = def;
    });
    return st;
  }, [config, ctx]);

  const [state, setState] = useState(() => computeInitialState());
  const [collapsed, setCollapsed] = useState(!!ctx.data.collapsed);

  // Debounce store updates to avoid fast typing triggering nested updates
  const timersRef = useRef({});
  const scheduleStoreUpdate = useCallback((key, value) => {
    if (!updateNodeField) return;
    const timers = timersRef.current;
    if (timers[key]) clearTimeout(timers[key]);
    timers[key] = setTimeout(() => {
      updateNodeField(id, key, value);
      delete timers[key];
    }, 150);
  }, [id, updateNodeField]);

  useEffect(() => {
    setCollapsed(!!ctx.data.collapsed);
  }, [ctx.data.collapsed]);

  // Ensure default field values exist in node.data so other nodes can reference them by name
  useEffect(() => {
    if (!updateNodeField) return;
    (config?.fields || []).forEach((f) => {
      const key = f.key;
      const current = ctx.data?.[key];
      const v = state?.[key];
      if (typeof current === 'undefined' && typeof v !== 'undefined') {
        updateNodeField(id, key, v);
      }
    });
  }, [config, ctx.data, id, state, updateNodeField]);

  const setField = useCallback((key, value) => {
    setState((prev) => {
      if (prev[key] === value) return prev;
      const next = { ...prev, [key]: value };
      if (typeof config?.onStateChange === 'function') {
        config.onStateChange(next, ctx);
      }
      scheduleStoreUpdate(key, value);
      return next;
    });
  }, [config, ctx, scheduleStoreUpdate]);

  useEffect(() => () => {
    const timers = timersRef.current;
    Object.keys(timers).forEach((k) => clearTimeout(timers[k]));
  }, []);

  const Container = config?.containerComponent || 'div';
  const containerStyleFromConfig = typeof config?.containerStyle === 'function'
    ? (config.containerStyle({ id, data, state }) || {})
    : (config?.containerStyle || {});
  const containerStyle = { ...defaultContainerStyle, ...(config?.style || {}), ...containerStyleFromConfig };

  const fieldErrors = useMemo(() => {
    const errs = {};
    (config?.fields || []).forEach((f) => {
      if (f.required) {
        const v = state[f.key];
        const isEmpty = v == null || (typeof v === 'string' && v.trim() === '');
        if (isEmpty) errs[f.key] = f.requiredMessage || `${f.label || f.key} is required`;
      }
    });
    const extra = typeof config?.validate === 'function' ? (config.validate(state, ctx) || {}) : {};
    return { ...errs, ...extra };
  }, [state, config, ctx]);

  const hasErrors = Object.keys(fieldErrors).length > 0;
  const containerClassName = `${config?.className || ''} ${hasErrors ? (config?.errorClassName || 'border-red-300 ring-2 ring-red-200') : ''}`.trim();

  const actions = {
    toggleCollapse: () => {
      setCollapsed((prev) => {
        const next = !prev;
        if (updateNodeField) updateNodeField(id, 'collapsed', next);
        return next;
      });
    },
    closeNode: () => {
      if (removeNode) removeNode(id);
    },
  };

  const header = config?.renderHeader
    ? config.renderHeader({ id, data, state, actions, collapsed })
    : (
      <div>
        <span>{config?.title || ctx?.data?.title}</span>
      </div>
    );

  const description = config?.description || null;

  const fields = (config?.fields || []).map((f) => {
    if (f.hidden) return null;
    const FieldComp = (config?.fieldRenderers && config.fieldRenderers[f.type]) || builtinFieldRenderers[f.type];
    if (!FieldComp) return null;
    const value = state[f.key];
    const onChange = (v) => setField(f.key, v);
    return (
      <FieldComp
        key={f.key}
        label={f.label}
        value={value}
        onChange={onChange}
        options={f.options}
        inputProps={f.inputProps}
        className={f.className}
        placeholder={f.placeholder}
        badge={f.badge}
        error={fieldErrors[f.key]}
      />
    );
  });

  // Dynamic handles (e.g., variables in Text node)
  const dynamicHandles = useMemo(() => {
    if (typeof config?.dynamicHandles === 'function') {
      return config.dynamicHandles({ id, data, state }) || [];
    }
    return [];
  }, [config, id, data, state]);

  const handlesToRender = useMemo(() => {
    const base = config?.handles || [];
    return [...base, ...dynamicHandles];
  }, [config, dynamicHandles]);
  const handlesKey = useMemo(() => handlesToRender.map(h => (typeof h.id === 'function' ? h.id({ id }) : h.id)).sort().join('|'), [handlesToRender, id]);

  // Inform React Flow that the node's handles changed
  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals, handlesKey]);

  // Allow configs to derive connections/edges from state
  useEffect(() => {
    if (typeof config?.onStateDerivedConnections !== 'function') return;
    const getStore = () => useCanvasStore.getState();
    const nodes = nodesState || getStore().nodes || [];

    const addEdgeIfMissing = (conn) => {
      const s = getStore();
      const exists = (s.edges || []).some((e) => (
        e.source === conn.source && e.target === conn.target &&
        e.sourceHandle === conn.sourceHandle && e.targetHandle === conn.targetHandle
      ));
      if (!exists) {
        // Defer to next frame so RF can register newly added handles
        requestAnimationFrame(() => {
          const s2 = getStore();
          s2.onConnect?.(conn);
        });
      }
    };

    const pruneEdgesForTargetHandles = (targetId, allowedTargetHandles, handlePrefix) => {
      const allowed = new Set(allowedTargetHandles || []);
      const prefix = handlePrefix || `${targetId}-var-`;
      const s = getStore();
      const nextEdges = (s.edges || []).filter((e) => {
        if (e.target !== targetId) return true;
        if (!e.targetHandle || !e.targetHandle.startsWith(prefix)) return true;
        return allowed.has(e.targetHandle);
      });
      if (nextEdges.length !== (s.edges || []).length) {
        useCanvasStore.setState({ edges: nextEdges });
      }
    };

    config.onStateDerivedConnections({ id, data, state, nodes, addEdgeIfMissing, pruneEdgesForTargetHandles });
  }, [config, id, data, state, nodesState]);

  return (
    <Container style={containerStyle} className={containerClassName}>
      {handlesToRender && handlesToRender.length > 0 && (
        <HandleRenderer id={id} handles={handlesToRender} />
      )}
      {!(collapsed && config?.hideHeaderWhenCollapsed) && header}
      {!(collapsed && config?.hideHeaderWhenCollapsed) && description && (
        <div>
          <span>{description}</span>
        </div>
      )}
      {collapsed ? (
        typeof config?.renderCollapsedBody === 'function' ? config.renderCollapsedBody({ id, data, state, setField }) : null
      ) : (
        <>
          {typeof config?.renderBeforeFields === 'function' ? config.renderBeforeFields({ id, data, state, setField }) : null}
          <div>
            {fields}
          </div>
          {hasErrors && config?.showErrorFooter && (
            <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
              {config?.errorFooterMessage || 'There are validation errors'}
            </div>
          )}
          {typeof config?.renderFooter === 'function' ? config.renderFooter({ id, data, state, errors: fieldErrors }) : null}
        </>
      )}
    </Container>
  );
};
