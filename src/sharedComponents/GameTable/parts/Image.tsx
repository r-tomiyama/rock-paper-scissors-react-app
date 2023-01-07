import React from 'react';
import { Flex, Image as ChakraImage } from '@chakra-ui/react';

type Prop = {
  type: 'player' | 'opponent';
};

export const Image: React.FC<Prop> = React.memo(function Image(prop) {
  return (
    <Flex justifyContent='center'>
      <Flex height='35vw' width='35vw' alignContent='center'>
        <ChakraImage src={`/images/${prop.type}.png`} margin='auto 0' />
      </Flex>
    </Flex>
  );
});
