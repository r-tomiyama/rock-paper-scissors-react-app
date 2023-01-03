import React from 'react';
import { Box } from '@chakra-ui/react';
import { Room } from './parts';
import { useRooms } from '../../hooks/firestore/useRooms';

export const RoomList: React.FC = () => {
  const { rooms, isValidating } = useRooms();
  return (
    <>
      {isValidating || (
        <Box>
          {rooms.map((r, i) => (
            <Room key={i} name={r.name} />
          ))}
        </Box>
      )}
    </>
  );
};
