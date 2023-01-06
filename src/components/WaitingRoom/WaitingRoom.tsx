import React from 'react';
import { Alert, AlertIcon, Box, Center, Text } from '@chakra-ui/react';
import { Room } from '@/pages/Room/hooks';
import { JoinGameForm } from '@/components/JoinGameForm';
import { Game } from '@/pages/Room/hooks/useRoom/types';

type Prop = {
  room: Room;
  game: Game;
};

export const WaitingRoom: React.FC<Prop> = ({ room, game }) => {
  return (
    <Box>
      <Alert status='info'>
        <AlertIcon />
        メンバーが揃うのを待っています!
      </Alert>
      {!game.playerSeat && (
        <Center py='10vh'>
          <JoinGameForm roomId={room.id} playingGame={game} />
        </Center>
      )}
    </Box>
  );
};
