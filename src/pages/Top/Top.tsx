import React from 'react';
import './style.css';

import { RoomList } from '@/components/RoomList';
import { CreateRoomForm } from '@/components/CreateRoomForm';
import { Center } from '@chakra-ui/react';

export const Top: React.FC = () => {
  return (
    <>
      <Center pt='15vh' mb='10vh'>
        <CreateRoomForm />
      </Center>
      <RoomList />
    </>
  );
};
