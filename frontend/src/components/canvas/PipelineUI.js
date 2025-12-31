import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import DeletableEdge from '../edges/DeletableEdge';
import { useCanvasStore } from '../../store/canvasStore';
import { useUIStore } from '../../store/uiStore';
import { shallow } from 'zustand/shallow';
import { InputNode } from '../../nodes/inputNode';
import { LLMNode } from '../../nodes/llmNode';
import { OutputNode } from '../../nodes/outputNode';
import { TextNode } from '../../nodes/textNode';
import { CanvasHeader } from '../body/CanvasHeader';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};
const edgeTypes = { deletable: DeletableEdge };

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  shouldFitView: state.shouldFitView,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const isDarkMode = useUIStore((state) => state.isDarkMode);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      shouldFitView
    } = useCanvasStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    // Handle fitView when pipeline is loaded
    useEffect(() => {
      if (shouldFitView && reactFlowInstance && nodes.length > 0) {
        setTimeout(() => {
          reactFlowInstance.fitView({ padding: 0.2, minZoom: 0.5, maxZoom: 1 });
          // Reset the flag
          useCanvasStore.setState({ shouldFitView: false });
        }, 0);
      }
    }, [shouldFitView, reactFlowInstance, nodes.length]);

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();

          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          const payload = event?.dataTransfer?.getData('application/reactflow');
          if (payload) {
            let appData = {};
            try {
              appData = JSON.parse(payload);
            } catch (e) {
              console.warn('Invalid drag payload', payload);
              return;
            }

            const rawType = appData?.nodeType;
            // map possible bare types to registered custom node types
            const typeMap = { input: 'customInput', output: 'customOutput' };
            const type = typeMap[rawType] || rawType;

            if (!type) return;
            if (!reactFlowInstance) {
              console.warn('ReactFlow instance not ready yet');
              return;
            }

            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };

            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const addFirstNode = useCallback(() => {
      if (!reactFlowInstance) return;
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const centerX = bounds.width / 2 - 210; 
      const centerY = bounds.height / 2 - 180; 
      const position = reactFlowInstance.project({ x: centerX, y: centerY });
      const nodeID = getNodeID('customInput');
      const newNode = {
        id: nodeID,
        type: 'customInput',
        position,
        data: getInitNodeData(nodeID, 'customInput'),
      };
      addNode(newNode);
      // Zoom out to fit the node nicely
    }, [reactFlowInstance, getNodeID, addNode]);

    return (
        <div 
          ref={reactFlowWrapper} 
          className={`w-full h-full ${isDarkMode ? 'dark' : 'light'}`}
          style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: isDarkMode ? '#0f172a' : '#ffffff' }}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='default'
                connectionLineStyle={{ stroke: '#6366f1', strokeWidth: 2.5, strokeDasharray: '6 6' }}
                fitView={false}
                defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                className={isDarkMode ? 'dark' : ''}
            >
                <Background color={isDarkMode ? "#555" : "#ccc"} gap={gridSize} size={2} />
                <Controls style={{
                  backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
                  borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                  color: isDarkMode ? '#ffffff' : '#000000',
                }} />
                <MiniMap style={{
                  backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
                  borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                }} />

                {/* Canvas Header Component */}
                <CanvasHeader />
            </ReactFlow>

            {/* Empty State UI */}
            {nodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center space-y-4 pointer-events-auto">
                  <button
                    onClick={addFirstNode}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-800/50 text-primary-700 dark:text-primary-300 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 border border-primary-200 dark:border-primary-800"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Your First Node
                  </button>
                </div>
              </div>
            )}
        </div>
    )
}
