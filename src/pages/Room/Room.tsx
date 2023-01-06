import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Center, Text } from '@chakra-ui/react';

import { useRoom } from '@/pages/Room/hooks';
import { Spinner } from '@/sharedComponents';
import { PlayingRoom } from '@/components/PlayingRoom';
import { WaitingRoom } from '@/components/WaitingRoom';
import { FinishedRoom } from '@/components/FinishedRoom';

export const Room: React.FC = () => {
  const { id } = useParams();
  const { room, isValidating } = useRoom(id);

  const renderRoom = useMemo(() => {
    if (typeof room === 'undefined') {
      return <></>;
    }
    switch (room.status) {
      case 'WAITING':
        return <WaitingRoom room={room} />;
      case 'PLAYING':
        return <PlayingRoom room={room} />;
      case 'FINISHED':
        return <FinishedRoom room={room} />;
    }
  }, [room?.status]);

  return (
    <>
      {room ? (
        renderRoom
      ) : isValidating ? (
        <Spinner />
      ) : (
        <Center height={300}>
          <Text fontSize='5xl'>ROOM NOT FOUND</Text>
        </Center>
      )}
    </>
  );
};
