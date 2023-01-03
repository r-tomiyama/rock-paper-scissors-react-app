import React from 'react';
import { Box } from '@chakra-ui/react';

import { Room } from './parts';
import { useRooms } from '@/hooks/database/useRooms';
import { Spinner } from '@/sharedComponents';

export const RoomList: React.FC = () => {
  const { rooms, isValidating } = useRooms();
  return (
    <>
      {isValidating ? (
        <Spinner />
      ) : (
        <Box>
          {rooms.map((r) => (
            <Room key={r.id} roomData={r} />
          ))}
        </Box>
      )}
    </>
  );
};
