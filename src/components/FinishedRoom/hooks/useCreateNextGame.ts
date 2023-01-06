import { addDoc } from 'firebase/firestore';
import useSWRMutation from 'swr/mutation';

import { roomHistoriesCollection } from '@/services/firestore/firestoreService';

import { Key } from 'swr';
import { Room } from '@/pages/Room/hooks';

const fetcher = async (
  _k: string,
  options: { arg: { room: Room; playerId: string } },
): Promise<void> => {
  await addDoc(roomHistoriesCollection(options.arg.room.id), {
    leftUserId: options.arg.playerId,
    createdAt: new Date(),
  });
};

export const useCreateNextGame = () => {
  return useSWRMutation<void, Error, Key, { room: Room; playerId: string }>('api/room', fetcher);
};
