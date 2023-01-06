import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Room } from '@/pages/Room/hooks';

type Prop = {
  room: Room;
};

export const FinishedRoom: React.FC<Prop> = ({ room }) => {
  return (
    <Box>
      <Text>
        {room.id}: {room.name}
      </Text>
      <Box>
        <Text>結果</Text>
        {/* TODO: 勝ち負けを表示 */}
      </Box>
      <Box>
        {/* TODO: 押したらhistoryを積む */}
        <Button>続ける</Button>
      </Box>
    </Box>
  );
};
