import React from 'react';
import { useParams } from 'react-router-dom';
import { Center, Text } from '@chakra-ui/react';

import { useRoom } from '@/hooks/database/useRoom';
import { Spinner } from '@/sharedComponents';
import { Room as RoomContent } from '@/components/Room';

export function Room() {
  const { id } = useParams();
  const { data: room, isValidating } = useRoom(id);

  return (
    <>
      {room ? (
        <RoomContent room={room} />
      ) : isValidating ? (
        <Spinner />
      ) : (
        <Center height={300}>
          <Text fontSize='5xl'>ROOM NOT FOUND</Text>
        </Center>
      )}
    </>
  );
}
