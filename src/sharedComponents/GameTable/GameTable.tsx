import React from 'react';
import { Box, Center, Flex, Text } from '@chakra-ui/react';

import { Hand } from '@/services/firestore/types/RoomHistory';
import { Image } from './parts';
import { ActionButtons } from './parts/ActionButtons';

type Prop = {
  leftUserId?: string;
  rightUserId?: string;
  isPlayableInfo:
    | {
        isPlayable: true;
        selectedHand?: Hand;
        selectHand: (_hand: Hand) => Promise<void>;
      }
    | false;
};

export const GameTable: React.FC<Prop> = ({ leftUserId, rightUserId, isPlayableInfo }) => {
  return (
    <Flex py='5vh'>
      <Box width='50%'>
        {/* TODO: 効率化する */}
        {/* TODO: 名前がなくても見た目が整うようにする */}
        {/* TODO: 名前が改行されないようにする */}
        {/* TODO: 名前を表示できるようにする */}
        <Image type='player' />

        <Center mb='5vh'>
          <Text>{leftUserId}</Text>
        </Center>

        <ActionButtons isPlayableInfo={isPlayableInfo} />
      </Box>

      <Box width='50%'>
        <Image type='opponent' />

        <Center mb='5vh'>
          <Text>{rightUserId}</Text>
        </Center>

        <ActionButtons isPlayableInfo={false} />
      </Box>
    </Flex>
  );
};
