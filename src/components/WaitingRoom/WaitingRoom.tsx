import React from 'react';
import { Box, Text } from '@chakra-ui/react';
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
      <Text>
        {room.id}: {room.name}
      </Text>
      <Box>
        <Text>メンバーが揃うのを待っています</Text>
      </Box>
      {!game.playerSeat && (
        <Box>
          <JoinGameForm roomId={room.id} playingGame={game} />
        </Box>
      )}
    </Box>
  );
};
