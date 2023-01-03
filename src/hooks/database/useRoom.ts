import { getDoc } from 'firebase/firestore';
import useSWR, { SWRResponse } from 'swr';

import { roomDoc } from '@/services/firestore/firestoreService';
import { Room as RoomData } from '@/services/firestore/types/Room';

const fetcher = async ([_k, documentId]: [string, string]): Promise<Room | undefined> => {
  console.log('fetcher');
  const snapshot = await getDoc(roomDoc(documentId));
  const data = snapshot.data();
  console.log(data);

  if (data) {
    return { id: snapshot.id, ...data };
  } else {
    return undefined;
  }
};

export type Room = {
  id: string;
} & RoomData;

type ReturnType = SWRResponse<Room | undefined>;

export const useRoom = (documentId?: string): ReturnType => useSWR(['room', documentId], fetcher);
