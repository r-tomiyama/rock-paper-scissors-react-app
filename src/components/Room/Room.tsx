import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Room as RoomType } from '@/hooks/database/useRoom';

type Prop = {
  room: RoomType;
};

export const Room: React.FC<Prop> = ({ room }) => {
  return (
    <Box>
      <Text>
        {room.id}: {room.name}
      </Text>
    </Box>
  );
};
