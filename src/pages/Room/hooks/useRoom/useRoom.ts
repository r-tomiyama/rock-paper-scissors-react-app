import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { fetcher } from './fetcher';
import { Room, Result, SetHistories } from './types';
import { subscriber } from './subscriber';
import { useCurrentGame, useDetermineRoomStatus } from '@/pages/Room/hooks';

export const useRoom = (documentId?: string): Result => {
  const { determineRoomStatus } = useDetermineRoomStatus();
  const { getCurrentGame, getPlayerSeat } = useCurrentGame();

  const [room, setRoom] = useState<Room>();
  const setHistories: SetHistories = (room, histories) => {
    const playingGame = getCurrentGame(histories);
    const playerSeat = getPlayerSeat(playingGame);
    const status = determineRoomStatus(playingGame);

    setRoom({ ...room, playingGame, playerSeat, status, histories });
  };

  const { data, isValidating } = useSWR(['room', documentId], fetcher);

  useEffect(() => {
    if (data) {
      setRoom({ ...data, status: 'WAITING', histories: [] });
    }
  }, [data, setRoom]);

  useEffect(() => {
    if (!room) return void 0;

    const unsubscribe = subscriber(room, setHistories);

    return () => unsubscribe && unsubscribe();
  }, [room?.id, setRoom]);

  return {
    room,
    isValidating,
  };
};
