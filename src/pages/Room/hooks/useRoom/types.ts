import { RoomHistory } from '@/services/firestore/types/RoomHistory';
import { Room as RoomData } from '@/services/firestore/types/Room';

export type Room = {
  id: string;
  histories: RoomHistory[];
} & RoomData;

export type Result = {
  room?: Room;
  isValidating: boolean;
};
