import React from 'react';
import { Box, Center, Flex, Text } from '@chakra-ui/react';

import { Hand } from '@/services/firestore/types/RoomHistory';
import { Image } from './parts';
import { ActionButtons } from './parts/ActionButtons';
import { Game } from '@/pages/Room/hooks/useRoom/types';

type Prop = {
  leftUserId?: string;
  rightUserId?: string;
  game: Game;
  selectHand?: (_hand: Hand) => Promise<void>;
};

export const GameTable: React.FC<Prop> = ({ leftUserId, rightUserId, game, selectHand }) => {
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

        <ActionButtons
          selectedHand={game.leftHand}
          isPlaying={game.isPlaying}
          selectHand={selectHand}
        />
      </Box>

      <Box width='50%'>
        <Image type='opponent' />

        <Center mb='5vh'>
          <Text>{rightUserId}</Text>
        </Center>

        {/* TODO: 結果の場合、相手の手を表示する */}
        <ActionButtons selectedHand={game.rightHand} isPlaying={false} />
      </Box>
    </Flex>
  );
};
