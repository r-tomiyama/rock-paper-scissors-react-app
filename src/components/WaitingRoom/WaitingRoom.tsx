import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Room } from '@/pages/Room/hooks';
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
          {/* TODO: 参加時に、名前を設定する */}
          {/* TODO: 参加する際に、新しいhistoryを積む */}
          <Button>参加します</Button>
        </Box>
      )}
    </Box>
  );
};
