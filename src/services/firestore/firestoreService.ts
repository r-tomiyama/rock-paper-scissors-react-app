import { collection, doc } from 'firebase/firestore';
import { db } from '@/services/firebaseService';
import { roomConverter } from './types/Room';

export const roomsCollection = collection(db, 'rooms').withConverter(roomConverter);
export const roomDoc = (documentId: string) =>
  doc(db, 'rooms', documentId).withConverter(roomConverter);
