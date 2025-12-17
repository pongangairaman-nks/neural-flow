import { useLocation } from 'react-router-dom';
import { headerConfig } from '../config';

export const useHeaderConfig = () => {
  const location = useLocation();
  const path = location.pathname;

  // Check exact match first
  if (headerConfig[path]) {
    return headerConfig[path];
  }

  // Check dynamic routes (e.g., /pipelines/:id)
  if (path.startsWith('/pipelines/') && path !== '/pipelines') {
    return {
      ...headerConfig['/pipelines'],
      title: 'Pipeline Detail',
    };
  }

  // Default fallback
  return {
    title: 'Page',
    breadcrumbs: [{ label: 'Page', href: path }],
  };
};
