import { RoomHistory } from '@/services/firestore/types/RoomHistory';
import { Room as RoomData } from '@/services/firestore/types/Room';

export type Room = {
  id: string;
  histories: RoomHistory[] | never[];
  // TODO: histories をまとめて取得し、空配列のケースがないようにする
} & RoomData;
