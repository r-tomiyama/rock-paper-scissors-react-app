import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { fetcher } from './fetcher';
import { Room, Result } from './types';
import { subscriber } from './subscriber';

export const useRoom = (documentId?: string): Result => {
  const [room, setRoom] = useState<Room>();

  const { data, isValidating } = useSWR(['room', documentId], fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (data) {
      setRoom(data);
    }
  }, [data, setRoom]);

  useEffect(() => {
    if (!room) return void 0;

    const unsubscribe = subscriber(room, setRoom);

    return () => unsubscribe && unsubscribe();
  }, [room?.id, setRoom]);

  return {
    room,
    isValidating,
  };
};
