import { GameTable, Hand, Seat } from '@/domain/game';
import { Player } from '@/providers/PlayerProvider';

export const generateFinishedGameTable = (tableInfo: {
  playerSeat?: Seat;
  leftUserId: string;
  rightUserId: string;
  leftHand: Hand;
  rightHand: Hand;
}): GameTable => {
  const { playerSeat, leftHand, rightHand } = tableInfo;
  if (playerSeat) {
    const playerHand = playerSeat === 'LEFT' ? leftHand : rightHand;
    const opponentHand = playerSeat === 'LEFT' ? rightHand : leftHand;

    return {
      status: 'FINISHED',
      isJoined: !!playerSeat,
      ...tableInfo,
      leftHand: playerHand,
      rightHand: opponentHand,
      playerHand,
      opponentHand,
    };
  } else {
    return {
      status: 'FINISHED',
      isJoined: !!playerSeat,
      ...tableInfo,
    };
  }
};

export const generatePlayingGameTable = (tableInfo: {
  playerSeat?: Seat;
  leftUserId: string;
  rightUserId: string;
  leftHand?: Hand;
  rightHand?: Hand;
}): GameTable => {
  const { playerSeat, leftHand, rightHand } = tableInfo;

  if (playerSeat) {
    const playerHand = playerSeat === 'LEFT' ? leftHand : rightHand;

    return {
      status: 'PLAYING',
      isJoined: !!playerSeat,
      ...tableInfo,
      leftHand: playerHand,
    };
  } else {
    return {
      status: 'PLAYING',
      isJoined: !!playerSeat,
      ...tableInfo,
    };
  }
};

export const generateWaitingGameTable = (tableInfo: {
  player: Player;
  playerSeat?: Seat;
  leftUserId?: string;
  rightUserId?: string;
}): GameTable => {
  const { player, playerSeat, leftUserId, rightUserId } = tableInfo;
  const opponentUserId = leftUserId === player.id ? rightUserId : leftUserId;

  return {
    status: 'WAITING',
    isJoined: !!playerSeat,
    leftUserId: playerSeat ? player.id : undefined,
    rightUserId: opponentUserId,
  };
};
