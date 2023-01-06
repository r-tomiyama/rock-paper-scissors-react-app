import { onSnapshot, orderBy, query, Unsubscribe } from 'firebase/firestore';

import { roomHistoriesCollection } from '@/services/firestore/firestoreService';
import { Room, SetHistories } from './types';

export const subscriber = (room: Room, action: SetHistories): Unsubscribe => {
  const q = query(roomHistoriesCollection(room.id), orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added' || change.type === 'modified') {
          console.log('New or Modified: ', change.doc.data());
          action(
            room,
            snapshot.docs.map((d) => ({ ...d.data(), id: d.id })),
          );
        }
      });
    },
    (error) => console.error(error),
  );
};
