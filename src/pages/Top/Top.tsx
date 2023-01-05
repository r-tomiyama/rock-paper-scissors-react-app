import React from 'react';
import './style.css';

import { RoomList } from '@/components/RoomList';
import { CreateRoomForm } from '@/components/CreateRoomForm';

export const Top: React.FC = () => {
  return (
    <>
      <CreateRoomForm />
      <RoomList />
    </>
  );
};
