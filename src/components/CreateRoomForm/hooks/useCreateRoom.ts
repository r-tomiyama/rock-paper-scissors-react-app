import { addDoc } from 'firebase/firestore';
import useSWRMutation from 'swr/mutation';

import { roomHistoriesCollection, roomsCollection } from '@/services/firestore/firestoreService';
import { Room } from '@/services/firestore/types/Room';
import { Key } from 'swr';

const fetcher = async (
  _k: string,
  options: { arg: { room: Room; playerId: string } },
): Promise<string> => {
  const ref = await addDoc(roomsCollection, options.arg.room);
  await addDoc(roomHistoriesCollection(ref.id), {
    leftUserId: options.arg.playerId,
    createdAt: new Date(),
  });
  return ref.id;
};

export const useCreateRoom = () => {
  return useSWRMutation<string, Error, Key, { room: Room; playerId: string }>('api/room', fetcher);
};
