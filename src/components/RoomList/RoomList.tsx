import React from 'react';
import { Box } from '@chakra-ui/react';

import { Room } from './parts';
import { useRooms } from '@/hooks/firestore/useRooms';
import { Spinner } from '@/sharedComponents';

export const RoomList: React.FC = () => {
  const { rooms, isValidating } = useRooms();
  return (
    <>
      {isValidating ? (
        <Spinner />
      ) : (
        <Box>
          {rooms.map((r, i) => (
            <Room key={i} name={r.name} />
          ))}
        </Box>
      )}
    </>
  );
};
