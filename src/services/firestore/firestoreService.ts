import { collection } from 'firebase/firestore';
import { db } from '@/services/firebaseService';
import { roomConverter } from './types/Room';

export const roomsCollection = collection(db, 'rooms').withConverter(roomConverter);
