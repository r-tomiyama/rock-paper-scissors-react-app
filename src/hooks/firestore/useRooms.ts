import { getDocs } from 'firebase/firestore';
import useSWR from 'swr';

import { roomsCollection } from '../../services/firestore/firestoreService';
import { Room } from '../../services/firestore/types/Room';

const fetcher = async () => {
  const querySnapshot = await getDocs(roomsCollection);
  const rooms = querySnapshot.docs.map((d) => d.data());

  return { rooms };
};

type ReturnType =
  | {
      rooms: Room[];
      isValidating: false;
    }
  | {
      rooms: never[];
      isValidating: true;
    };

export const useRooms = (): ReturnType => {
  const { data, isValidating } = useSWR('rooms', fetcher);

  const result: ReturnType =
    data && !isValidating
      ? {
          rooms: data.rooms,
          isValidating: false,
        }
      : {
          rooms: [],
          isValidating: true,
        };

  return result;
};
