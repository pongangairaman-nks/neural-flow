import {
  Zap, Layers, Database, MessageSquare, BarChart3, Gamepad2,
  Settings, FileText, Grid3x3
} from 'lucide-react';

/**
 * Home page features configuration
 * Used in HomePage.js to display feature cards
 */
export const FEATURES = [
  {
    icon: Zap,
    title: 'Pipelines',
    description: 'Build powerful automation workflows',
    href: '/pipelines',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Layers,
    title: 'Agents',
    description: 'Create intelligent autonomous agents',
    href: '/agents',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Database,
    title: 'Knowledge Bases',
    description: 'Manage your data and knowledge',
    href: '/knowledge',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: MessageSquare,
    title: 'Chatbots',
    description: 'Deploy conversational AI',
    href: '/chatbots',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track and analyze performance',
    href: '/analytics',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Gamepad2,
    title: 'Playground',
    description: 'Test and experiment freely',
    href: '/playground',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: Settings,
    title: 'Transformations',
    description: 'Transform and process data',
    href: '/transformations',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: FileText,
    title: 'Forms',
    description: 'Create interactive forms',
    href: '/forms',
    color: 'from-rose-500 to-rose-600',
  },
  {
    icon: Grid3x3,
    title: 'Portals',
    description: 'Build custom portals',
    href: '/portals',
    color: 'from-amber-500 to-amber-600',
  },
];
