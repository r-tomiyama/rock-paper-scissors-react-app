import { Hand } from '@/services/firestore/types/RoomHistory';

export type Seat = 'LEFT' | 'RIGHT';
export type Status = 'WAITING' | 'PLAYING' | 'FINISHED';

export type PlayingGameTable = isJoinAndPlaying | isWatchingAndPlaying;
export type FinishedGameTable = isJoinedAndFinished | isWatchingAndFinished;

export type GameTable = WaitingGameTable | PlayingGameTable | FinishedGameTable;

export type WaitingGameTable = {
  status: 'WAITING';
  isJoined: boolean;
  leftUserId?: string;
  rightUserId?: string;
};

type isJoinAndPlaying = {
  status: 'PLAYING';
  isJoined: true;
  leftUserId: string;
  rightUserId: string;
  leftHand?: Hand;
};

type isWatchingAndPlaying = {
  status: 'PLAYING';
  isJoined: false;
  leftUserId: string;
  rightUserId: string;
  leftHand?: Hand;
  rightHand?: Hand;
};

type isJoinedAndFinished = {
  status: 'FINISHED';
  isJoined: true;
  leftUserId: string;
  rightUserId: string;
  playerHand: Hand;
  opponentHand: Hand;
  leftHand: Hand;
  rightHand: Hand;
};

type isWatchingAndFinished = {
  status: 'FINISHED';
  isJoined: false;
  leftUserId: string;
  rightUserId: string;
  leftHand: Hand;
  rightHand: Hand;
};
