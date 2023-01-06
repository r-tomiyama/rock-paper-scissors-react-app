import { collection, doc } from 'firebase/firestore';
import { db } from '@/services/firebaseService';

import { roomConverter } from './types/Room';
import { historyConverter } from './types/RoomHistory';

export const roomsCollection = collection(db, 'rooms').withConverter(roomConverter);
export const roomDoc = (documentId: string) =>
  doc(db, 'rooms', documentId).withConverter(roomConverter);

export const roomHistoriesCollection = (documentId: string) =>
  collection(db, 'rooms', documentId, 'histories').withConverter(historyConverter);
export const roomHistoryDoc = (arg: { roomId: string; documentId: string }) =>
  doc(db, 'rooms', arg.roomId, 'histories', arg.documentId).withConverter(historyConverter);
