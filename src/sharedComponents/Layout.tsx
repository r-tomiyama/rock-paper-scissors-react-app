import React from 'react';

import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

export const Layout: React.FC = () => {
  return (
    <Container maxW={'3xl'} pt='20vh' pb='10vh'>
      <Outlet />
    </Container>
  );
};
