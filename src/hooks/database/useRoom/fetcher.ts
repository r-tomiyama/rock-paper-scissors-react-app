import { getDoc } from 'firebase/firestore';

import { roomDoc } from '@/services/firestore/firestoreService';
import { Room } from './types';

export const fetcher = async ([_k, documentId]: [string, string]): Promise<Room | undefined> => {
  const roomSnapshot = await getDoc(roomDoc(documentId));
  const room = roomSnapshot.data();

  if (typeof room === 'undefined') {
    return undefined;
  }

  return { id: roomSnapshot.id, ...room, histories: [] };
};
