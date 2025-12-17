export const headerConfig = {
  '/': {
    title: 'Home',
    breadcrumbs: [{ label: 'Home', href: '/' }],
  },
  '/pipelines': {
    title: 'Untitled Pipeline',
    breadcrumbs: [
      { label: 'Pipelines', href: '/pipelines' },
      { label: 'Untitled Pipeline', href: '/pipelines/1' },
    ],
    actions: [
      { id: 'run', label: 'Submit', variant: 'primary' },
      { id: 'import', label: 'Import', variant: 'secondary' },
      { id: 'export', label: 'Export', variant: 'secondary' },
      { id: 'clear', label: 'Clear', variant: 'secondary' },
    ],
  },
  '/agents': {
    title: 'Agents',
    breadcrumbs: [{ label: 'Agents', href: '/agents' }],
  },
  '/transformations': {
    title: 'Transformations',
    breadcrumbs: [{ label: 'Transformations', href: '/transformations' }],
  },
  '/knowledge': {
    title: 'Knowledge Bases',
    breadcrumbs: [{ label: 'Knowledge Bases', href: '/knowledge' }],
  },
  '/tables': {
    title: 'Tables',
    breadcrumbs: [{ label: 'Tables', href: '/tables' }],
  },
  '/files': {
    title: 'Files',
    breadcrumbs: [{ label: 'Files', href: '/files' }],
  },
  '/chatbots': {
    title: 'Chatbots',
    breadcrumbs: [{ label: 'Chatbots', href: '/chatbots' }],
  },
  '/search': {
    title: 'Search',
    breadcrumbs: [{ label: 'Search', href: '/search' }],
  },
  '/forms': {
    title: 'Forms',
    breadcrumbs: [{ label: 'Forms', href: '/forms' }],
  },
  '/voicebots': {
    title: 'Voicebots',
    breadcrumbs: [{ label: 'Voicebots', href: '/voicebots' }],
  },
  '/rulebots': {
    title: 'Rulebots',
    breadcrumbs: [{ label: 'Rulebots', href: '/rulebots' }],
  },
  '/portals': {
    title: 'Portals',
    breadcrumbs: [{ label: 'Portals', href: '/portals' }],
  },
  '/analytics': {
    title: 'Analytics',
    breadcrumbs: [{ label: 'Analytics', href: '/analytics' }],
  },
  '/playground': {
    title: 'Playground',
    breadcrumbs: [{ label: 'Playground', href: '/playground' }],
  },
  '/evaluators': {
    title: 'Evaluators',
    breadcrumbs: [{ label: 'Evaluators', href: '/evaluators' }],
  },
};
