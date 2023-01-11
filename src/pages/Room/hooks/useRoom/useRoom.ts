import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { fetcher } from './fetcher';
import { subscriber } from './subscriber';
import { Room } from '@/domain/room';
import { GameTable } from '@/domain/game';
import { GameHistory, useCurrentGame } from '@/domain/gameHistory';

export const useRoom = (documentId?: string): Result => {
  const { getCurrentGame } = useCurrentGame();

  const [room, setRoom] = useState<Room>();
  const [gameTable, setGameTable] = useState<GameTable>();

  const updateRoom: UpdateRoom = (room, histories) => {
    const currentGame = getCurrentGame(histories);

    setRoom({ ...room, histories });
    setGameTable(currentGame);
  };

  const { data, isValidating } = useSWR(['room', documentId], fetcher);

  useEffect(() => {
    if (data) {
      setRoom({ ...data, histories: [] });
    }
  }, [data, setRoom]);

  useEffect(() => {
    if (!room) return void 0;

    const unsubscribe = subscriber(room, updateRoom);

    return () => unsubscribe && unsubscribe();
  }, [room?.id, setRoom]);

  return {
    room,
    gameTable,
    isValidating,
  };
};

type Result = {
  room?: Room;
  gameTable?: GameTable;
  isValidating: boolean;
};

export type UpdateRoom = (_r: Room, _hs: GameHistory[]) => void;
