// store.js - Canvas/Pipeline state management

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useCanvasStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    shouldFitView: false,
    getNodeID: (type) => {
        const newIDs = { ...(get().nodeIDs || {}) };
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      const prev = get().edges;
      const next = applyEdgeChanges(changes, prev);
      set({ edges: next });
    },
    onConnect: (connection) => {
      const prev = get().edges;
      const next = addEdge({
        ...connection,
        type: 'deletable',
        animated: true,
        markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}
      }, prev);
      set({ edges: next });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    removeNode: (nodeId) => {
      set({
        nodes: get().nodes.filter((n) => n.id !== nodeId),
        edges: get().edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
      });
    },
    removeEdge: (edgeId) => {
      set({
        edges: get().edges.filter((e) => e.id !== edgeId),
      });
    },
    loadPipeline: (pipelineData) => {
      if (pipelineData?.nodes && pipelineData?.edges) {
        set({
          nodes: pipelineData.nodes,
          edges: pipelineData.edges,
          shouldFitView: true,
        });
      }
    },
    clearPipeline: () => {
      set({
        nodes: [],
        edges: [],
        nodeIDs: {},
      });
    },
  }));

// Export as useStore for backward compatibility
export const useStore = useCanvasStore;
