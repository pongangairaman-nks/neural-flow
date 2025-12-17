import { ComingSoonPage } from '../pages/ComingSoonPage';
import HomePage from '../pages/HomePage';
import { PipelinePage } from '../pages/PipelinePage';

export const routeConfig = [
  {
    category: 'Main',
    routes: [
      {
        path: '/',
        element: <HomePage />,
        label: 'Home',
      },
    ],
  },
  {
    category: 'Logic',
    routes: [
      {
        path: '/pipelines',
        element: <PipelinePage />,
        label: 'Pipelines',
      },
      {
        path: '/pipelines/:id',
        element: <PipelinePage />,
        label: 'Pipeline Detail',
      },
      {
        path: '/agents',
        element: <ComingSoonPage title="Agents" />,
        label: 'Agents',
      },
      {
        path: '/transformations',
        element: <ComingSoonPage title="Transformations" />,
        label: 'Transformations',
      },
    ],
  },
  {
    category: 'Data',
    routes: [
      {
        path: '/knowledge',
        element: <ComingSoonPage title="Knowledge Bases" />,
        label: 'Knowledge Bases',
      },
      {
        path: '/tables',
        element: <ComingSoonPage title="Tables" />,
        label: 'Tables',
      },
      {
        path: '/files',
        element: <ComingSoonPage title="Files" />,
        label: 'Files',
      },
    ],
  },
  {
    category: 'Interfaces',
    routes: [
      {
        path: '/chatbots',
        element: <ComingSoonPage title="Chatbots" />,
        label: 'Chatbots',
      },
      {
        path: '/search',
        element: <ComingSoonPage title="Search" />,
        label: 'Search',
      },
      {
        path: '/forms',
        element: <ComingSoonPage title="Forms" />,
        label: 'Forms',
      },
      {
        path: '/voicebots',
        element: <ComingSoonPage title="Voicebots" />,
        label: 'Voicebots',
      },
      {
        path: '/rulebots',
        element: <ComingSoonPage title="Rulebots" />,
        label: 'Rulebots',
      },
      {
        path: '/portals',
        element: <ComingSoonPage title="Portals" />,
        label: 'Portals',
      },
    ],
  },
  {
    category: 'Observability',
    routes: [
      {
        path: '/analytics',
        element: <ComingSoonPage title="Analytics" />,
        label: 'Analytics',
      },
      {
        path: '/playground',
        element: <ComingSoonPage title="Playground" />,
        label: 'Playground',
      },
      {
        path: '/evaluators',
        element: <ComingSoonPage title="Evaluators" />,
        label: 'Evaluators',
      },
    ],
  },
];
