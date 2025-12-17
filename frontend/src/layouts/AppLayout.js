import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/header/Sidebar';
import { MainShell } from '../components/body/MainShell';
import { Modal } from '../components/common/Modal';
import { useCanvasStore } from '../store/canvasStore';
import { useHeaderConfig } from '../hooks';
import { useParsePipelineMutation } from '../services';
import { fileUtils } from '../utils';

export const AppLayout = () => {
  const [resultOpen, setResultOpen] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const [exportErrorOpen, setExportErrorOpen] = useState(false);
  const [submitErrorOpen, setSubmitErrorOpen] = useState(false);
  const [emptyCanvasOpen, setEmptyCanvasOpen] = useState(false);
  const [pipelineName, setPipelineName] = useState('Untitled Pipeline');
  const nodes = useCanvasStore((s) => s.nodes);
  const edges = useCanvasStore((s) => s.edges);
  const loadPipeline = useCanvasStore((s) => s.loadPipeline);
  const clearPipeline = useCanvasStore((s) => s.clearPipeline);
  const fileInputRef = React.useRef(null);
  
  // React Query mutation for parsing pipeline
  const { mutate: parsePipeline, isPending: resultLoading } = useParsePipelineMutation();
  
  const headerProps = useHeaderConfig();
  
  const handleBreadcrumbChange = (newName) => {
    setPipelineName(newName);
  };
  
  const submitPipeline = () => {
    if (nodes.length === 0) {
      setSubmitErrorOpen(true);
      return;
    }
    parsePipeline(
      { nodes, edges },
      {
        onSuccess: (data) => {
          setResultData(data);
          setResultOpen(true);
        },
        onError: (error) => {
          setResultData({ error: error?.message || String(error) });
          setResultOpen(true);
        },
      }
    );
  };
  const exportPipeline = () => {
    if (nodes.length === 0) {
      setExportErrorOpen(true);
      return;
    }
    const pipelineData = {
      name: pipelineName,
      nodes,
      edges,
      exportedAt: new Date().toISOString(),
    };
    const filename = `${pipelineName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`;
    fileUtils.downloadJSON(pipelineData, filename);
  };

  const importPipeline = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const pipelineData = await fileUtils.readJSONFile(file);
      loadPipeline(pipelineData);
      // Restore pipeline name if it exists in the imported data
      if (pipelineData.name) {
        setPipelineName(pipelineData.name);
      }
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      alert(`Failed to import pipeline: ${error.message}`);
    }
  };

  const handleClearCanvas = () => {
    if (nodes.length === 0 && edges.length === 0) {
      setEmptyCanvasOpen(true);
      return;
    }
    setClearConfirmOpen(true);
  };

  const confirmClearCanvas = () => {
    clearPipeline();
    setClearConfirmOpen(false);
  };

  const enhancedActions = (headerProps.actions || []).map((a) => {
    if (a.id === 'run') return { 
      ...a, 
      onClick: submitPipeline,
      disabled: resultLoading,
      isLoading: resultLoading,
    };
    if (a.id === 'export') return { ...a, onClick: exportPipeline };
    if (a.id === 'import') return { ...a, onClick: () => fileInputRef.current?.click() };
    if (a.id === 'clear') return { ...a, onClick: handleClearCanvas };
    return a;
  });

  return (
    <div className="flex overflow-hidden bg-neutral-100 dark:bg-neutral-900" style={{ height: '100vh', width: '100vw' }}>
      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={importPipeline}
        style={{ display: 'none' }}
      />

      {/* Sidebar - Persistent */}
      <Sidebar />

      {/* Main Shell - Only content updates */}
      <div className="flex-1 p-2 overflow-hidden">
        <MainShell 
          headerProps={{
            ...headerProps,
            breadcrumbs: headerProps.breadcrumbs?.map((crumb, idx) => 
              idx === headerProps.breadcrumbs.length - 1 
                ? { ...crumb, label: pipelineName }
                : crumb
            ),
            actions: enhancedActions,
            onBreadcrumbChange: handleBreadcrumbChange,
          }}
        >
          <Outlet />
        </MainShell>
        <Modal
          isOpen={resultOpen}
          onClose={() => { setResultOpen(false); setResultData(null); }}
          title="Pipeline Analysis"
          size="md"
        >
          {resultData?.error ? (
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-3 text-sm text-red-800 dark:text-red-200">
                {resultData.error}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-3 flex items-center gap-2 text-sm text-green-800 dark:text-green-200">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Pipeline submitted successfully!</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-3 text-center">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">Nodes</div>
                  <div className="text-xl font-semibold">{resultData?.num_nodes ?? '-'}</div>
                </div>
                <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-3 text-center">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">Edges</div>
                  <div className="text-xl font-semibold">{resultData?.num_edges ?? '-'}</div>
                </div>
                <div className="rounded-lg border border-neutral-200 dark:border-neutral-700 p-3 text-center">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">Is DAG</div>
                  <div className={`inline-flex items-center justify-center mt-1 px-2 py-0.5 rounded text-sm font-medium ${resultData?.is_dag ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                    {resultData?.is_dag ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Clear Canvas Confirmation Modal */}
        <Modal
          isOpen={clearConfirmOpen}
          onClose={() => setClearConfirmOpen(false)}
          title="Clear Canvas"
          size="sm"
        >
          <div className="space-y-4">
            <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-4 flex gap-3">
              <div className="flex-shrink-0 pt-0.5">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  Are you sure you want to clear all nodes and edges from the canvas?
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setClearConfirmOpen(false)}
                className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearCanvas}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-medium text-sm"
              >
                Clear Canvas
              </button>
            </div>
          </div>
        </Modal>

        {/* Export Error Modal */}
        <Modal
          isOpen={exportErrorOpen}
          onClose={() => setExportErrorOpen(false)}
          title="Empty Pipeline"
          size="sm"
        >
          <div className="space-y-4">
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 p-4 flex gap-3">
              <div className="flex-shrink-0 pt-0.5">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  No nodes available to export.
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  Please add nodes to your pipeline first.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setExportErrorOpen(false)}
                className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors font-medium text-sm"
              >
                Understood
              </button>
            </div>
          </div>
        </Modal>

        {/* Submit Error Modal */}
        <Modal
          isOpen={submitErrorOpen}
          onClose={() => setSubmitErrorOpen(false)}
          title="Cannot Submit"
          size="sm"
        >
          <div className="space-y-4">
            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 p-4 flex gap-3">
              <div className="flex-shrink-0 pt-0.5">
                <svg className="w-5 h-5 text-red-600 dark:text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                  At least one node is required.
                </p>
                <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                  Please add nodes to your pipeline before submitting.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setSubmitErrorOpen(false)}
                className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors font-medium text-sm"
              >
                Understood
              </button>
            </div>
          </div>
        </Modal>

        {/* Empty Canvas Modal */}
        <Modal
          isOpen={emptyCanvasOpen}
          onClose={() => setEmptyCanvasOpen(false)}
          title="Canvas is Empty"
          size="sm"
        >
          <div className="space-y-4">
            <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 p-4 flex gap-3">
              <div className="flex-shrink-0 pt-0.5">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0zm3 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Your canvas is already empty.
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  Add some nodes to get started.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setEmptyCanvasOpen(false)}
                className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors font-medium text-sm"
              >
                Got it
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
