import { getDoc } from 'firebase/firestore';

import { roomDoc } from '@/services/firestore/firestoreService';
import { Room } from '@/services/firestore/types/Room';

export const fetcher = async ([_k, documentId]: [string, string]): Promise<
  (Room & { id: string }) | undefined
> => {
  const roomSnapshot = await getDoc(roomDoc(documentId));
  const room = roomSnapshot.data();

  if (typeof room === 'undefined') {
    return undefined;
  }

  return { id: roomSnapshot.id, ...room };
};
