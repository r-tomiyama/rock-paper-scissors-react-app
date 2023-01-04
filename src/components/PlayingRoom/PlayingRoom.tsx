import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Room } from '@/hooks/database/useRoom';

type Prop = {
  room: Room;
};

export const PlayingRoom: React.FC<Prop> = ({ room }) => {
  return (
    <Box>
      <Text>
        {room.id}: {room.name}
      </Text>
      <Box>
        <Text>手を選んでください</Text>
      </Box>
      <Box>
        <Button>グー</Button>
        <Button>チョキ</Button>
        <Button>パー</Button>
      </Box>
    </Box>
  );
};
