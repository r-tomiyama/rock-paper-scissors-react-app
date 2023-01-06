import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { fetcher } from './fetcher';
import { Room, Result, SetHistories, Game } from './types';
import { subscriber } from './subscriber';
import { useCurrentGame, useDetermineRoomStatus } from '@/pages/Room/hooks';

export const useRoom = (documentId?: string): Result => {
  const { determineRoomStatus } = useDetermineRoomStatus();
  const { getCurrentGame } = useCurrentGame();

  const [room, setRoom] = useState<Room>();
  const [game, setGame] = useState<Game>();

  const setHistories: SetHistories = (room, histories) => {
    const currentGame = getCurrentGame(histories);
    const status = determineRoomStatus(currentGame);

    setRoom({ ...room, status, histories });
    setGame(currentGame);
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
    game,
    isValidating,
  };
};
