import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Room, Top } from './pages';
import { NotFound } from './pages/NotFound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Top />,
  },
  {
    path: '/rooms',
    element: <Top />,
  },
  {
    path: '/rooms/:id',
    element: <Room />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
