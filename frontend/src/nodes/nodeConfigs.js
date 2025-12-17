import React from 'react';
import { NodeHeader } from './core/ui/NodeHeader';
import { Callout } from './core/ui/Callout';
import { PillField } from './core/fields/PillField';

export const inputNodeConfig = {
  kind: 'customInput',
  title: 'Input',
  style: { width: 420 },
  className: 'rounded-xl border border-neutral-200 bg-white p-3 space-y-3 shadow-sm dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 dark:border-slate-700 dark:shadow-xl',
  renderHeader: ({ actions, collapsed }) => (
    <div className="space-y-2">
      <NodeHeader kind="customInput" title="Input" collapsed={collapsed} onExpand={actions.toggleCollapse} onClose={actions.closeNode} />
      <div className="rounded-md border border-blue-200 bg-blue-50 text-blue-900 px-3 py-2 text-sm dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
        Pass data of different types into your workflow
      </div>
    </div>
  ),
  renderBeforeFields: ({ id, state, setField }) => {
    const value = state?.inputName ?? id.replace('customInput-', 'input_');
    return (
      <div className="space-y-3">
        <PillField value={value} onChange={(v) => setField('inputName', v)} />
        <Callout title="Suggestion: Give the node a distinct name">Give the node a distinct name</Callout>
      </div>
    );
  },
  renderCollapsedBody: () => (
    <Callout title="Suggestion: Give the node a distinct name">Give the node a distinct name</Callout>
  ),
  fields: [
    {
      key: 'inputName',
      type: 'pill',
      hidden: true,
      deriveDefault: ({ id, data }) => (data?.inputName || id.replace('customInput-', 'input_')),
    },
    {
      key: 'inputType',
      label: 'Type',
      type: 'select',
      badge: 'Dropdown',
      options: ['Text', 'File'],
      deriveDefault: ({ data }) => (data?.inputType || 'Text'),
    },
  ],
  handles: [
    {
      key: 'value',
      type: 'source',
      position: 'Right',
      id: ({ id }) => `${id}-value`,
    },
  ],
};

export const outputNodeConfig = {
  kind: 'customOutput',
  title: 'Output',
  style: { width: 420 },
  className: 'rounded-xl border border-neutral-200 bg-white p-3 space-y-3 shadow-sm dark:bg-gradient-to-br dark:from-emerald-900 dark:to-slate-900 dark:border-emerald-700 dark:shadow-xl',
  errorClassName: 'ring-2 ring-red-200 border-red-300 dark:ring-red-700 dark:border-red-600',
  showErrorFooter: true,
  errorFooterMessage: 'Output field is required',
  renderHeader: ({ actions, collapsed }) => (
    <div className="space-y-2">
      <NodeHeader kind="customOutput" title="Output" collapsed={collapsed} onExpand={actions.toggleCollapse} onClose={actions.closeNode} />
      <div className="rounded-md border border-emerald-200 bg-emerald-50 text-emerald-900 px-3 py-2 text-sm dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
        Output data of different types from your workflow.
      </div>
    </div>
  ),
  renderBeforeFields: ({ id, state, setField }) => {
    const value = state?.outputName ?? id.replace('customOutput-', 'output_');
    return <PillField value={value} onChange={(v) => setField('outputName', v)} />;
  },
  fields: [
    {
      key: 'outputName',
      type: 'pill',
      hidden: true,
      deriveDefault: ({ id, data }) => (data?.outputName || id.replace('customOutput-', 'output_')),
    },
    {
      key: 'outputType',
      label: 'Type',
      type: 'select',
      badge: 'Dropdown',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'Image' },
      ],
      deriveDefault: ({ data }) => (data?.outputType || 'Text'),
    },
    {
      key: 'output',
      label: 'Output',
      type: 'textarea',
      badge: 'Text',
      placeholder: 'Type "{{" to utilize variables',
      required: true,
      requiredMessage: 'Output field is required',
      deriveDefault: ({ data }) => (data?.output || ''),
      className: 'mt-1',
    },
    {
      key: 'formatOutput',
      label: 'Format output',
      type: 'switch',
      deriveDefault: ({ data }) => (typeof data?.formatOutput === 'boolean' ? data.formatOutput : true),
      className: 'mt-1',
    },
  ],
  handles: [
    {
      key: 'value',
      type: 'target',
      position: 'Left',
      id: ({ id }) => `${id}-value`,
    },
  ],
};

export const llmNodeConfig = {
  kind: 'llm',
  title: 'OpenAI',
  style: { width: 560 },
  className: 'rounded-xl border border-neutral-200 bg-white p-3 space-y-3 shadow-sm dark:bg-gradient-to-br dark:from-purple-900 dark:to-slate-900 dark:border-purple-700 dark:shadow-xl',
  renderHeader: ({ actions, collapsed }) => (
    <NodeHeader kind="llm" title="OpenAI" collapsed={collapsed} onExpand={actions.toggleCollapse} onClose={actions.closeNode} />
  ),
  renderBeforeFields: ({ id, state, setField }) => {
    const value = state?.openaiName ?? id.replace('llm-', 'openai_');
    return <PillField value={value} onChange={(v) => setField('openaiName', v)} />;
  },
  fields: [
    {
      key: 'openaiName',
      type: 'pill',
      hidden: true,
      deriveDefault: ({ id, data }) => (data?.openaiName || id.replace('llm-', 'openai_')),
    },
    {
      key: 'system',
      label: 'System (Instructions)',
      type: 'textarea',
      badge: 'Text',
      placeholder: 'Answer the Question based on Context in a professional manner.',
      deriveDefault: ({ data }) => (data?.system || ''),
    },
    {
      key: 'prompt',
      label: 'Prompt',
      type: 'textarea',
      badge: 'Text',
      placeholder: 'Type "{{" to utilize variables E.g., Question: {{input_0.text}}',
      deriveDefault: ({ data }) => (data?.prompt || ''),
    },
    {
      key: 'model',
      label: 'Model',
      type: 'select',
      badge: 'Dropdown',
      options: [
        { value: 'gpt-4o', label: 'gpt-4o' },
        { value: 'gpt-4.1', label: 'gpt-4.1' },
        { value: 'gpt-5.1', label: 'gpt-5.1' },
      ],
      deriveDefault: ({ data }) => (data?.model || 'gpt-5.1'),
    },
    {
      key: 'usePersonalApiKey',
      label: 'Use Personal API Key',
      type: 'switch',
      deriveDefault: ({ data }) => (data?.usePersonalApiKey || false),
    },
  ],
  handles: [
    {
      key: 'system',
      type: 'target',
      position: 'Left',
      id: ({ id }) => `${id}-system`,
      style: { top: `${100 / 3}%` },
    },
    {
      key: 'prompt',
      type: 'target',
      position: 'Left',
      id: ({ id }) => `${id}-prompt`,
      style: { top: `${200 / 3}%` },
    },
    {
      key: 'response',
      type: 'source',
      position: 'Right',
      id: ({ id }) => `${id}-response`,
    },
  ],
};

export const textNodeConfig = {
  kind: 'text',
  title: 'Text',
  style: { width: 420 },
  className: 'rounded-xl border border-neutral-200 bg-white p-3 space-y-3 shadow-sm dark:bg-gradient-to-br dark:from-orange-900 dark:to-slate-900 dark:border-orange-700 dark:shadow-xl',
  errorClassName: 'ring-2 ring-red-200 border-red-300 dark:ring-red-700 dark:border-red-600',
  showErrorFooter: true,
  errorFooterMessage: 'Text field is required',
  renderHeader: ({ actions, collapsed }) => (
    <div className="space-y-2">
      <NodeHeader kind="text" title="Text" collapsed={collapsed} onExpand={actions.toggleCollapse} onClose={actions.closeNode} />
      <div className="rounded-md border border-orange-200 bg-orange-50 text-orange-900 px-3 py-2 text-sm dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-300">
        Accepts Text from upstream nodes and allows you to write additional text / concatenate different texts to pass to downstream nodes.
      </div>
    </div>
  ),
  renderBeforeFields: ({ id, state, setField }) => {
    const value = state?.textName ?? id.replace('text-', 'text_');
    return <PillField value={value} onChange={(v) => setField('textName', v)} />;
  },
  // Make container width responsive to the longest line in text
  containerStyle: ({ state }) => {
    const text = state?.text || '';
    const longest = text.split('\n').reduce((m, l) => Math.max(m, l.length), 0);
    const px = Math.min(640, Math.max(420, Math.round(longest * 7.2) + 48));
    return { width: px };
  },
  fields: [
    {
      key: 'textName',
      type: 'pill',
      hidden: true,
      deriveDefault: ({ id, data }) => (data?.textName || id.replace('text-', 'text_')),
    },
    {
      key: 'text',
      label: 'Text',
      type: 'textarea',
      badge: 'Text',
      placeholder: 'Type "{{" to utilize variables',
      inputProps: { autoGrow: true },
      required: true,
      requiredMessage: 'Text field is required',
      deriveDefault: ({ data }) => (data?.text || ''),
    },
  ],
  // Generate dynamic target handles for each {{var}} found
  dynamicHandles: ({ id, state }) => {
    const text = state?.text || '';
    const re = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;
    const names = new Set();
    let m;
    while ((m = re.exec(text)) !== null) names.add(m[1]);
    const list = Array.from(names).map((name) => ({
      key: `var-${name}`,
      type: 'target',
      position: 'Left',
      id: `${id}-var-${name}`,
      style: { zIndex: 10 },
      props: { isConnectable: true },
    }));
    return list;
  },
  // Auto-connect variable sources to the text node's variable targets
  onStateDerivedConnections: ({ id, state, nodes, addEdgeIfMissing, pruneEdgesForTargetHandles }) => {
    const text = state?.text || '';
    const re = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;
    const vars = new Set();
    let m;
    while ((m = re.exec(text)) !== null) vars.add(m[1]);

    const targetHandles = [];
    const nameKeys = ['inputName', 'outputName', 'textName', 'openaiName'];
    const sourceHandleByType = {
      customInput: (nid) => `${nid}-value`,
      text: (nid) => `${nid}-output`,
      llm: (nid) => `${nid}-response`,
      customOutput: null,
    };
    const idToDefaultName = (n) => {
      switch (n.type) {
        case 'customInput':
          return n.id.replace('customInput-', 'input_');
        case 'customOutput':
          return n.id.replace('customOutput-', 'output_');
        case 'text':
          return n.id.replace('text-', 'text_');
        case 'llm':
          return n.id.replace('llm-', 'openai_');
        default:
          return undefined;
      }
    };

    const byVarToId = (v) => {
      const m = /^(input|output|text|openai)_(\d+)$/.exec(v);
      if (!m) return undefined;
      const typeMap = { input: 'customInput', output: 'customOutput', text: 'text', openai: 'llm' };
      return `${typeMap[m[1]]}-${m[2]}`;
    };

    Array.from(vars).forEach((name) => {
      const targetHandle = `${id}-var-${name}`;
      targetHandles.push(targetHandle);
      // find a node whose display name equals the variable name
      let match = nodes.find((n) => {
        // Match by explicit data name
        if (nameKeys.some((k) => n?.data?.[k] === name)) return true;
        // Fallback: match default name derived from ID pattern
        const defName = idToDefaultName(n);
        return defName === name;
      });
      if (!match) {
        const nid = byVarToId(name);
        if (nid) match = nodes.find((n) => n.id === nid);
      }
      if (!match) return;
      const getSource = sourceHandleByType[match.type];
      if (!getSource) return;
      const sourceHandle = getSource(match.id);
      if (!sourceHandle) return;
      const conn = { source: match.id, target: id, sourceHandle, targetHandle };
      addEdgeIfMissing(conn);
    });
    pruneEdgesForTargetHandles(id, targetHandles, `${id}-var-`);
  },
  handles: [
    {
      key: 'output',
      type: 'source',
      position: 'Right',
      id: ({ id }) => `${id}-output`,
    },
  ],
};

// Optional: a registry map if needed by tools
export const nodeRegistry = {
  customInput: inputNodeConfig,
  customOutput: outputNodeConfig,
  llm: llmNodeConfig,
  text: textNodeConfig,
};
