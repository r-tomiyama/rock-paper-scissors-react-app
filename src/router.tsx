import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Room, Top } from './pages';
import { NotFound } from './pages/NotFound/NotFound';
import { Layout } from '@/sharedComponents/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <Top /> }],
  },
  {
    path: '/rooms',
    element: <Layout />,
    children: [
      { index: true, element: <Top /> },
      { path: ':id', element: <Room /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
