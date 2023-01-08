import React from 'react';
import { Alert, AlertIcon, Box, Center } from '@chakra-ui/react';
import { Room, WaitingGameTable } from '@/pages/Room/hooks';
import { JoinGameForm } from '@/components/JoinGameForm';
import { GameTable } from '@/sharedComponents';

type Prop = {
  room: Room;
  game: WaitingGameTable;
};

export const WaitingRoom: React.FC<Prop> = ({ room, game }) => {
  return (
    <Box>
      <Alert status='info'>
        <AlertIcon />
        メンバーが揃うのを待っています!
      </Alert>
      <GameTable
        isJoined={game.isJoined}
        leftUserId={game.leftUserId}
        rightUserId={game.rightUserId}
      />
      {!game.isJoined && (
        <Center>
          <JoinGameForm roomId={room.id} playingGame={game} />
        </Center>
      )}
    </Box>
  );
};
