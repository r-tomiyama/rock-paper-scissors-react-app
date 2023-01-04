import { onSnapshot, orderBy, query, Unsubscribe } from 'firebase/firestore';

import { roomHistoriesCollection } from '@/services/firestore/firestoreService';
import { Room } from './types';

export const subscriber = (room: Room, action: (_r: Room) => void): Unsubscribe => {
  const q = query(roomHistoriesCollection(room.id), orderBy('createdAt', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added' || change.type === 'modified') {
          console.log('New or Modified: ', change.doc.data());
          action({
            ...room,
            histories: snapshot.docs.map((d) => d.data()),
          });
        }
      });
    },
    (error) => console.error(error),
  );
};
