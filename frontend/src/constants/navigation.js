import {
  Home, Zap, Layers, Settings, Database, Table2, FileText,
  MessageSquare, Lightbulb, Cpu, Grid3x3, BarChart3, Gamepad2, CheckCircle2
} from 'lucide-react';

/**
 * Sidebar navigation sections configuration
 * Used in Sidebar.js to render navigation menu
 */
export const SIDEBAR_SECTIONS = [
  {
    title: 'MAIN',
    icon: null,
    items: [
      { id: 'home', label: 'Home', href: '/', icon: Home },
    ],
  },
  {
    title: 'LOGIC',
    icon: null,
    items: [
      { id: 'pipelines', label: 'Pipelines', href: '/pipelines', icon: Zap },
      { id: 'agents', label: 'Agents', href: '/agents', icon: Layers },
      { id: 'transformations', label: 'Transformations', href: '/transformations', icon: Settings },
    ],
  },
  {
    title: 'DATA',
    icon: null,
    items: [
      { id: 'knowledge', label: 'Knowledge Bases', href: '/knowledge', icon: Database },
      { id: 'tables', label: 'Tables', href: '/tables', icon: Table2 },
      { id: 'files', label: 'Files', href: '/files', icon: FileText },
    ],
  },
  {
    title: 'INTERFACES',
    icon: null,
    items: [
      { id: 'chatbots', label: 'Chatbots', href: '/chatbots', icon: MessageSquare },
      { id: 'search', label: 'Search', href: '/search', icon: Lightbulb },
      { id: 'forms', label: 'Forms', href: '/forms', icon: FileText },
      { id: 'voicebots', label: 'Voicebots', href: '/voicebots', icon: MessageSquare },
      { id: 'rulebots', label: 'Rulebots', href: '/rulebots', icon: Cpu },
      { id: 'portals', label: 'Portals', href: '/portals', icon: Grid3x3 },
    ],
  },
  {
    title: 'OBSERVABILITY',
    icon: null,
    items: [
      { id: 'analytics', label: 'Analytics', href: '/analytics', icon: BarChart3 },
      { id: 'playground', label: 'Playground', href: '/playground', icon: Gamepad2 },
      { id: 'evaluators', label: 'Evaluators', href: '/evaluators', icon: CheckCircle2 },
    ],
  },
];
