import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Room } from '@/pages/Room/hooks';

type Prop = {
  room: Room;
};

export const WaitingRoom: React.FC<Prop> = ({ room }) => {
  return (
    <Box>
      <Text>
        {room.id}: {room.name}
      </Text>
      <Box>
        <Text>メンバーが揃うのを待っています</Text>
      </Box>
      <Box>
        <Button>参加します</Button>
      </Box>
    </Box>
  );
};
