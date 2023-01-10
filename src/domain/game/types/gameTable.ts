import { Hand } from './types';

type BaseTable = { id: string };

export type PlayingGameTable = IsJoinedAndPlaying | IsWatchingAndPlaying;
export type FinishedGameTable = isJoinedAndFinished | IsWatchingAndFinished;

export type GameTable = WaitingGameTable | PlayingGameTable | FinishedGameTable;

export type WaitingGameTable = BaseTable & {
  status: 'WAITING';
  isJoined: boolean;
  leftUserId?: string;
  rightUserId?: string;
};

export type IsJoinedAndPlaying = BaseTable & {
  status: 'PLAYING';
  isJoined: true;
  leftUserId: string;
  rightUserId: string;
  leftHand?: Hand;
};

export type IsWatchingAndPlaying = BaseTable & {
  status: 'PLAYING';
  isJoined: false;
  leftUserId: string;
  rightUserId: string;
  leftHand?: Hand;
  rightHand?: Hand;
};

export type isJoinedAndFinished = BaseTable & {
  status: 'FINISHED';
  isJoined: true;
  leftUserId: string;
  rightUserId: string;
  playerHand: Hand;
  opponentHand: Hand;
  leftHand: Hand;
  rightHand: Hand;
};

export type IsWatchingAndFinished = BaseTable & {
  status: 'FINISHED';
  isJoined: false;
  leftUserId: string;
  rightUserId: string;
  leftHand: Hand;
  rightHand: Hand;
};
