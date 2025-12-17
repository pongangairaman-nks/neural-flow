import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';
import { X } from 'lucide-react';
import { useCanvasStore } from '../../store/canvasStore';

export default function DeletableEdge(props) {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd } = props;
  const removeEdge = useCanvasStore((s) => s.removeEdge);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const onDelete = (e) => {
    e.stopPropagation();
    if (removeEdge) removeEdge(id);
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ strokeDasharray: '6 6', stroke: '#6366f1', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', ...style }} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button
            onClick={onDelete}
            className="rounded-full border border-indigo-400 bg-white text-indigo-600 hover:bg-indigo-50 shadow-sm w-6 h-6 flex items-center justify-center"
            aria-label="Delete edge"
          >
            <X size={12} />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
