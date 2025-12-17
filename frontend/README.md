# Frontend

React-based pipeline builder with node abstraction system.

## Setup

```bash
npm install
npm start
```

Runs on `http://localhost:3000`

## Project Structure

```
src/
├── components/        # UI components (Header, Sidebar, Modal, etc.)
├── nodes/            # Node system (BaseNode, configs, factories)
├── store/            # Zustand stores (canvasStore, uiStore)
├── services/         # API services (React Query hooks)
├── constants/        # Centralized constants (features, icons, navigation, nodeCategories, uiStyles)
├── config/           # Configuration (apiConfig, headerConfig)
├── hooks/            # Custom hooks (useHeaderConfig)
├── utils/            # Utilities (fileUtils for export/import)
├── layouts/          # Layout components (AppLayout)
├── pages/            # Page components (HomePage, PipelinePage, ComingSoonPage)
├── routes/           # Routing configuration
└── App.js            # Main app component
```

## Technology Stack

- **React 18** - UI framework
- **React Router** - Client-side routing
- **React Flow** - Node/edge visualization
- **Zustand** - Lightweight state management
- **React Query** - Server state management with automatic caching
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

## Key Features

### Node Abstraction System

- **BaseNode** - Reusable node component handling all node logic
- **NodeFactory** - Factory function to create nodes from configs
- **Configuration-Driven** - Easy to add new node types
- **4 Node Types** - Input, Output, Text, LLM

**Adding a new node:**

1. Add config to `nodeConfigs.js`
2. Create wrapper file (3 lines)
3. Register in `PipelineUI.js`

### Text Node Features

- **Auto-Growing Textarea** - Adjusts height/width as user types
- **Variable Handles** - Detects `{{ variable }}` syntax
- **Auto-Connection** - Automatically connects to source nodes
- **Dynamic Handles** - Creates handles based on variables in text

### Styling

- **Tailwind CSS** - Professional utility-first styling
- **Dark Mode** - Full dark theme support
- **Color-Coded Nodes** - Visual distinction by type
- **Responsive Design** - Works on all screen sizes

## State Management

### Canvas Store (`store/canvasStore.js`)

Manages pipeline state using Zustand:

- `nodes` - Array of nodes in the pipeline
- `edges` - Array of connections between nodes
- `nodeIDs` - Counter for generating unique node IDs
- `addNode()` - Add node to canvas
- `removeNode()` - Remove node
- `updateNodeField()` - Update field value
- `loadPipeline()` - Load pipeline from JSON
- `clearPipeline()` - Clear all nodes/edges
- `getNodeID(type)` - Generate unique ID for node type

**Usage:**

```javascript
const nodes = useCanvasStore((state) => state.nodes);
const { nodes, edges } = useCanvasStore(
  (state) => ({ nodes: state.nodes, edges: state.edges })
);
const getNodeID = useCanvasStore((state) => state.getNodeID);
```

### UI Store (`store/uiStore.js`)

Manages UI state with localStorage persistence:

- `sidebarOpen` - Sidebar visibility (persisted)
- `theme` - Light/dark theme (persisted)
- `bodyTopPanelOpen` - Node panel visibility (persisted)
- `selectedNodeId` - Currently selected node (not persisted)
- `canvasZoom` - Canvas zoom level (not persisted)

**Usage:**

```javascript
const { theme, sidebarOpen } = useUIStore(
  (state) => ({ theme: state.theme, sidebarOpen: state.sidebarOpen })
);
const toggleTheme = useUIStore((state) => state.toggleTheme);
```

### API State Management (React Query)

Server state is managed using React Query:

- `useParsePipelineMutation()` - Hook for pipeline parsing
- Automatic loading, error, and success state management
- Built-in retry logic and caching

**Usage:**

```javascript
const { mutate: parsePipeline, isPending } = useParsePipelineMutation();

parsePipeline(
  { nodes, edges },
  {
    onSuccess: (data) => console.log('Success:', data),
    onError: (error) => console.log('Error:', error),
  }
);
```

## Components

### Canvas Components

- **PipelineUI** - Main canvas with React Flow
- **CanvasArea** - Canvas container
- **CanvasHeader** - Canvas header with controls

### Layout Components

- **AppLayout** - Main application layout
- **MainShell** - Layout wrapper with header
- **Sidebar** - Left navigation sidebar

### Node Components

- **BaseNode** - Reusable node component
- **InputNode** - Input node type
- **OutputNode** - Output node type
- **TextNode** - Text node with variables
- **LLMNode** - LLM node type

### Common Components

- **Modal** - Dialog component
- **Popover** - Dropdown menu
- **Portal** - Portal for modals
- **NodeTile** - Node tile in panel

## Constants Management

All hardcoded values are centralized in `src/constants/`:

### `constants/features.js`

Home page feature cards configuration

```javascript
export const FEATURES = [
  { icon: Zap, title: 'Pipelines', ... },
  // ... more features
];
```

### `constants/iconMap.js`

Icon and color mappings for all pages

```javascript
export const ICON_MAP = {
  'Pipelines': { icon: Zap, color: 'from-blue-500 to-blue-600' },
  // ... more mappings
};
```

### `constants/navigation.js`

Sidebar navigation structure

```javascript
export const SIDEBAR_SECTIONS = [
  { title: 'MAIN', items: [...] },
  // ... more sections
];
```

### `constants/nodeCategories.js`

Node tabs and categories

```javascript
export const NODE_TABS = [
  { id: 'nodes', label: 'Nodes' },
  // ... more tabs
];
export const NODES_BY_CATEGORY = { ... };
```

### `constants/uiStyles.js`

UI component styling constants

```javascript
export const CALLOUT_TONES = {
  info: { border: '...', bg: '...', ... },
  // ... more tones
};
```

**Import from constants:**

```javascript
import { FEATURES, ICON_MAP, SIDEBAR_SECTIONS, NODE_TABS, CALLOUT_TONES } from '../constants';
```

## Development

### Adding a New Field Type

1. Create field component in `nodes/core/fields/`
2. Register in `BaseNode.js` builtinFieldRenderers
3. Use in node config with `type: 'fieldName'`

### Adding a New Node Type

1. Create config in `nodeConfigs.js`:

```javascript
export const myNodeConfig = {
  title: 'My Node',
  fields: [...],
  handles: [...],
  // ... other config
};
```

2. Create wrapper file `myNode.js`:

```javascript
import { createNodeComponent } from './core/nodeFactory';
import { myNodeConfig } from './nodeConfigs';
export const MyNode = createNodeComponent(myNodeConfig);
```

3. Register in `PipelineUI.js`:

```javascript
const nodeTypes = {
  myNode: MyNode,
  // ... other types
};
```

### Adding a New Feature/Page

1. Create page component in `pages/`
2. Add route in `routes/routeConfig.js`
3. Add navigation item in `constants/navigation.js`
4. Add feature card in `constants/features.js` if needed
5. Add icon mapping in `constants/iconMap.js` if needed

## Styling

Uses Tailwind CSS with dark mode support:

- `dark:` prefix for dark mode variants
- `hover:` for hover states
- `transition-` for smooth transitions
- Color palette: Indigo, Blue, Green, Red

**Node Type Colors:**

- Input: Blue
- Output: Green
- Text: Orange
- LLM: Purple

## Troubleshooting

**Nodes not appearing:**

- Check if node type is registered in `PipelineUI.js`
- Verify node config exists in `nodeConfigs.js`
- Check browser console for errors

**Styling not applied:**

- Ensure Tailwind CSS is imported in `index.css`
- Check class names are correct
- Clear browser cache

**Backend connection fails:**

- Ensure backend is running on `http://localhost:8000`
- Check CORS configuration in backend
- Verify API endpoint in `pipelineService.js`

**Dark mode not working:**

- Check if `dark` class is on `<html>` element
- Verify dark mode enabled in `tailwind.config.js`
- Check theme state in `uiStore.js`

**Variables not creating handles:**

- Verify variable syntax: `{{ variableName }}`
- Check regex pattern in `nodeConfigs.js`
- Ensure variable name is valid JavaScript identifier
