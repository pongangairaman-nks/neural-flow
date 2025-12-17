import {
  Zap, Layers, Database, MessageSquare, BarChart3, Gamepad2,
  Settings, FileText, Grid3x3, Cpu, Lightbulb, Table2, CheckCircle2
} from 'lucide-react';

/**
 * Icon and color mapping for all pages/features
 * Used in ComingSoonPage.js and other components
 */
export const ICON_MAP = {
  'Pipelines': { icon: Zap, color: 'from-blue-500 to-blue-600' },
  'Agents': { icon: Layers, color: 'from-purple-500 to-purple-600' },
  'Knowledge Bases': { icon: Database, color: 'from-green-500 to-green-600' },
  'Chatbots': { icon: MessageSquare, color: 'from-pink-500 to-pink-600' },
  'Analytics': { icon: BarChart3, color: 'from-orange-500 to-orange-600' },
  'Playground': { icon: Gamepad2, color: 'from-indigo-500 to-indigo-600' },
  'Transformations': { icon: Settings, color: 'from-cyan-500 to-cyan-600' },
  'Forms': { icon: FileText, color: 'from-rose-500 to-rose-600' },
  'Portals': { icon: Grid3x3, color: 'from-amber-500 to-amber-600' },
  'Tables': { icon: Table2, color: 'from-teal-500 to-teal-600' },
  'Files': { icon: FileText, color: 'from-violet-500 to-violet-600' },
  'Search': { icon: Lightbulb, color: 'from-yellow-500 to-yellow-600' },
  'Voicebots': { icon: MessageSquare, color: 'from-red-500 to-red-600' },
  'Rulebots': { icon: Cpu, color: 'from-slate-500 to-slate-600' },
  'Evaluators': { icon: CheckCircle2, color: 'from-lime-500 to-lime-600' },
};
