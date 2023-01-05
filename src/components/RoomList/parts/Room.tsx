import React from 'react';
import { Card, CardHeader, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { Room as RoomData } from '@/components/RoomList/hooks/useRooms';

type Prop = {
  roomData: RoomData;
};

export const Room: React.FC<Prop> = ({ roomData }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/rooms/${roomData.id}`)}>
      <CardHeader p='3'>
        <Heading size='sm'>{roomData.name}</Heading>
        <Text fontSize='xx-small' color={'gray.500'}>
          {roomData.id}
        </Text>
      </CardHeader>
      {/* TODO: 参加者一覧を出す */}
      {/* <CardBody p='3'>
        <Box>
          <Heading size='xs'>参加者</Heading>
          <Text pt='2' fontSize='sm'></Text>
        </Box>
      </CardBody> */}
    </Card>
  );
};
