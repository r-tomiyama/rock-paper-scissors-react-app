import { Hand, RoomHistory as RoomHistoryData } from '@/services/firestore/types/RoomHistory';
import { Room as RoomData } from '@/services/firestore/types/Room';
import { Seat, Status } from '../';

export type Room = {
  id: string;
  histories: RoomHistoryData[] | never[];
  // TODO: histories をまとめて取得し、空配列のケースがないようにする
} & RoomData;

export type RoomHistory = {
  id: string;
} & RoomHistoryData;

export type Game = {
  status: Status;
  isPlaying: boolean;
  isWatching: boolean;
  playerSeat?: Seat;
  leftUserId?: string;
  rightUserId?: string;
  playerHand?: Hand;
  opponentHand?: Hand;
} & RoomHistory;

export type SetHistories = (_r: Room, _hs: RoomHistory[]) => void;

export type Result = {
  room?: Room;
  game?: Game;
  isValidating: boolean;
};
