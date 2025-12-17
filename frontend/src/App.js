import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AppLayout } from './layouts/AppLayout';
import { routeConfig, renderRoutes } from './routes';

// Create React Query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {renderRoutes(routeConfig, <AppLayout />)}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
