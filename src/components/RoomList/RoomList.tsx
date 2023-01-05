import React from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';

import { Room } from './parts';
import { useRooms } from '@/components/RoomList/hooks';
import { Spinner } from '@/sharedComponents';

export const RoomList: React.FC = () => {
  const { rooms, isValidating } = useRooms();
  return (
    <>
      {isValidating ? (
        <Spinner />
      ) : (
        <>
          <Box py='3'>
            <Heading size={'md'}>ルーム一覧 🏠</Heading>
          </Box>
          <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            {rooms.map((r) => (
              <Room key={r.id} roomData={r} />
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  );
};
