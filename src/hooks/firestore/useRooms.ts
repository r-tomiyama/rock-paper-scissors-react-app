import { getDocs } from 'firebase/firestore';
import { roomsCollection } from '../../services/firestore/firestoreService';

export const useRooms = async () => {
  const querySnapshot = await getDocs(roomsCollection);
  const res = querySnapshot.docs.map((d) => d.data());

  return {
    rooms: res,
  };
};
