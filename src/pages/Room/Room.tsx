import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Center, Text } from '@chakra-ui/react';

import { useRoom } from '@/hooks/database/useRoom';
import { Spinner } from '@/sharedComponents';
import { PlayingRoom } from '@/components/PlayingRoom';
import { Status, useRoomStatus } from './hooks/useRoomStatus';
import { WaitingRoom } from '@/components/WaitingRoom';
import { FinishedRoom } from '@/components/FinishedRoom';

export const Room: React.FC = () => {
  const { id } = useParams();
  const { room, isValidating } = useRoom(id);

  const roomStatus: Status = useMemo(() => {
    if (room) {
      const { status } = useRoomStatus(room);
      return status;
    } else {
      return 'WAITING';
    }
  }, [room]);

  const renderRoom = useMemo(() => {
    if (typeof room === 'undefined') {
      return <></>;
    }
    switch (roomStatus) {
      case 'WAITING':
        return <WaitingRoom room={room} />;
      case 'PLAYING':
        return <PlayingRoom room={room} />;
      case 'FINISHED':
        return <FinishedRoom room={room} />;
    }
  }, [room, roomStatus]);

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
