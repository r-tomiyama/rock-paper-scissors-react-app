import { addDoc } from 'firebase/firestore';
import useSWRMutation from 'swr/mutation';

import { roomsCollection } from '@/services/firestore/firestoreService';
import { Room } from '@/services/firestore/types/Room';
import { Key } from 'swr';

const fetcher = async (_k: string, options: { arg: Room }): Promise<string> => {
  const ref = await addDoc(roomsCollection, options.arg);
  return ref.id;
};

export const useCreateRoom = () => {
  return useSWRMutation<string, Error, Key, Room>('api/room', fetcher);
};
