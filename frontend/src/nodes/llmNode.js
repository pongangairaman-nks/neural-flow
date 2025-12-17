// llmNode.js

import { createNodeComponent } from './core/nodeFactory';
import { llmNodeConfig } from './nodeConfigs';

export const LLMNode = createNodeComponent(llmNodeConfig);
