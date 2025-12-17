import React from 'react';
import { Route } from 'react-router-dom';

export const renderRoutes = (routeConfig, layoutElement) => {
  return (
    <Route element={layoutElement}>
      {routeConfig.map((category) =>
        category.routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))
      )}
    </Route>
  );
};
