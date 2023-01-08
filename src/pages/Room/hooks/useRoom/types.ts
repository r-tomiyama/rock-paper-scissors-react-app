import { RoomHistory as RoomHistoryData } from '@/services/firestore/types/RoomHistory';
import { Room as RoomData } from '@/services/firestore/types/Room';

export type Room = {
  id: string;
  histories: RoomHistoryData[] | never[];
  // TODO: histories をまとめて取得し、空配列のケースがないようにする
} & RoomData;

export type RoomHistory = {
  id: string;
} & RoomHistoryData;

export type UpdateRoom = (_r: Room, _hs: RoomHistory[]) => void;
