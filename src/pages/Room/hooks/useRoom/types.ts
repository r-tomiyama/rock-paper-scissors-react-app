import { RoomHistory as RoomHistoryData } from '@/services/firestore/types/RoomHistory';
import { Room as RoomData } from '@/services/firestore/types/Room';
import { Seat, Status } from '../';

export type Room = {
  id: string;
  histories: RoomHistoryData[] | never[];
  status: Status;
} & RoomData;

export type RoomHistory = {
  id: string;
} & RoomHistoryData;

export type SetHistories = (_r: Room, _hs: RoomHistory[]) => void;

export type Result = {
  room?: Room;
  isValidating: boolean;
};
