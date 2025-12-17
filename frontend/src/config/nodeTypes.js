export const NODE_TYPES = {
  INPUT: 'customInput',
  OUTPUT: 'customOutput',
  TEXT: 'text',
  LLM: 'llm',
};

export const NODE_TYPE_LABELS = {
  [NODE_TYPES.INPUT]: 'Input',
  [NODE_TYPES.OUTPUT]: 'Output',
  [NODE_TYPES.TEXT]: 'Text',
  [NODE_TYPES.LLM]: 'LLM',
};

export const HANDLE_TYPES = {
  SOURCE: 'source',
  TARGET: 'target',
};

export const HANDLE_POSITIONS = {
  LEFT: 'Left',
  RIGHT: 'Right',
  TOP: 'Top',
  BOTTOM: 'Bottom',
};
