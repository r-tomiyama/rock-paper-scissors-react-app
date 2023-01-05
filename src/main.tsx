import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { router } from './router';
import { PlayerProvider } from '@/providers/PlayerProvider';

const root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ChakraProvider>
      <PlayerProvider>
        <RouterProvider router={router} />
      </PlayerProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
