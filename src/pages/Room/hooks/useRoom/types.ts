import { RoomHistory } from '@/services/firestore/types/RoomHistory';
import { Room as RoomData } from '@/services/firestore/types/Room';
import { Seat, Status } from '../';

export type Room = {
  id: string;
  histories: RoomHistory[] | never[];
  playingGame?: RoomHistory;
  playerSeat?: Seat;
  status: Status;
} & RoomData;

export type SetHistories = (_r: Room, _hs: RoomHistory[]) => void;

export type Result = {
  room?: Room;
  isValidating: boolean;
};
