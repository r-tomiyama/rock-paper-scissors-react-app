import { Center } from '@chakra-ui/layout';
import { Spinner as ChakraSpinner } from '@chakra-ui/spinner';
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <Center h='100%'>
      <ChakraSpinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Center>
  );
};
