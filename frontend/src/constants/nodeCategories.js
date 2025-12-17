/**
 * Node categories and tabs configuration
 * Used in BodyTopPanel.js to display available nodes by category
 */

export const NODE_TABS = [
  { id: 'nodes', label: 'Nodes' },
  { id: 'start', label: 'Start' },
  { id: 'objects', label: 'Objects' },
  { id: 'knowledge', label: 'Knowledge' },
  { id: 'ai', label: 'AI' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'logic', label: 'Logic' },
  { id: 'data', label: 'Data' },
  { id: 'chat', label: 'Chat' },
];

export const NODES_BY_CATEGORY = {
  nodes: [
    { type: 'input', label: 'Input' },
    { type: 'text', label: 'Text' },
    { type: 'llm', label: 'LLM' },
    { type: 'output', label: 'Output' },
  ],
  start: [
    { type: 'input', label: 'Input' },
    { type: 'trigger', label: 'Trigger' },
    { type: 'start', label: 'Start' },
    { type: 'browserExtension', label: 'Browser Extension' },
  ],
  objects: [
    { type: 'output', label: 'Output' },
    { type: 'note', label: 'Note' },
    { type: 'group', label: 'Group' },
  ],
  knowledge: [
    { type: 'note', label: 'Note' },
    { type: 'group', label: 'Group' },
  ],
  ai: [
    { type: 'llm', label: 'LLM' },
    { type: 'chat', label: 'Chat' },
  ],
  integrations: [
    { type: 'browserExtension', label: 'Browser Extension' },
  ],
  logic: [
    { type: 'trigger', label: 'Trigger' },
    { type: 'start', label: 'Start' },
  ],
  data: [
    { type: 'input', label: 'Input' },
    { type: 'output', label: 'Output' },
  ],
  chat: [
    { type: 'chat', label: 'Chat' },
    { type: 'llm', label: 'LLM' },
  ],
};
