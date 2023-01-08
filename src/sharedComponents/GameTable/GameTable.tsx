import React from 'react';
import { Box, Center, Flex, Text } from '@chakra-ui/react';

import { Hand } from '@/services/firestore/types/RoomHistory';
import { Image } from './parts';
import { ActionButtons } from './parts/ActionButtons';

type Prop = {
  isJoined: boolean;
  leftUserId?: string;
  rightUserId?: string;
  leftHand?: Hand;
  rightHand?: Hand;
  selectHand?: (_hand: Hand) => Promise<void>;
};

export const GameTable: React.FC<Prop> = ({
  isJoined,
  leftUserId,
  rightUserId,
  leftHand,
  rightHand,
  selectHand,
}) => {
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

        <ActionButtons selectedHand={leftHand} isPlaying={isJoined} selectHand={selectHand} />
      </Box>

      <Box width='50%'>
        <Image type='opponent' />

        <Center mb='5vh'>
          <Text>{rightUserId}</Text>
        </Center>

        <ActionButtons selectedHand={rightHand} isPlaying={false} />
      </Box>
    </Flex>
  );
};
