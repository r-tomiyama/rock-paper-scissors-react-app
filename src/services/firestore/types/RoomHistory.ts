import { Hand } from '@/domain/game';
import { DocumentData, FirestoreDataConverter, Timestamp } from 'firebase/firestore';

export type RoomHistory = {
  leftUserId?: string;
  rightUserId?: string;
  leftHand?: Hand;
  rightHand?: Hand;
  createdAt: Date;
};

function assert(data: DocumentData): asserts data is RoomHistory {
  data.createdAt = (data.createdAt as Timestamp).toDate();
  const _d = data as Partial<RoomHistory>;
  // if () {
  //   throw new Error('invalid data');
  // }
}

export const historyConverter: FirestoreDataConverter<RoomHistory> = {
  fromFirestore: (snapshot, option) => {
    const data = snapshot.data(option);
    assert(data);
    return data;
  },
  toFirestore: (model: RoomHistory) => ({
    ...model,
    createdAt: Timestamp.fromDate(model.createdAt),
  }),
};
