import React from 'react';
import { Handle, Position } from 'reactflow';
import { useCanvasStore } from '../../store/canvasStore';

const positionMap = {
  Left: Position.Left,
  Right: Position.Right,
  Top: Position.Top,
  Bottom: Position.Bottom,
};

export const HandleRenderer = ({ id, handles = [] }) => {
  const ctx = { id };
  const edges = useCanvasStore((s) => s.edges);

  // Group by side for optional auto vertical distribution when style.top is not provided
  const groups = handles.reduce((acc, h) => {
    const posKey = h.position || 'Right';
    acc[posKey] = acc[posKey] || [];
    acc[posKey].push(h);
    return acc;
  }, {});

  const computedHandles = Object.entries(groups).flatMap(([posKey, arr]) => {
    const count = arr.length;
    return arr.map((h, idx) => {
      const position = positionMap[posKey] || Position.Right;
      const computedId = typeof h.id === 'function' ? h.id(ctx) : h.id;
      const baseStyle = h.style || {};
      // Auto distribute if top not specified
      const style =
        baseStyle.top == null && (posKey === 'Left' || posKey === 'Right')
          ? { ...baseStyle, top: `${Math.round(((idx + 1) * 100) / (count + 1))}%` }
          : baseStyle;

      const isConnected = edges?.some((e) =>
        h.type === 'source'
          ? (e.source === id && e.sourceHandle === computedId)
          : (e.target === id && e.targetHandle === computedId)
      );

      const finalStyle = { pointerEvents: 'auto', zIndex: 20, ...style };
      const className = `${h.className ?? ''} handle-ring ${isConnected ? 'handle-connected' : ''}`.trim();

      const extraProps = h.props || {};

      return (
        <Handle
          key={`${posKey}-${computedId}`}
          type={h.type}
          position={position}
          id={computedId}
          style={finalStyle}
          className={className}
          {...extraProps}
        />
      );
    });
  });

  return <>{computedHandles}</>;
};
