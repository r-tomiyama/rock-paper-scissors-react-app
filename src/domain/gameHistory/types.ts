import { RoomHistory } from '@/services/firestore/types/RoomHistory';

export type GameHistory = {
  id: string;
} & RoomHistory;
