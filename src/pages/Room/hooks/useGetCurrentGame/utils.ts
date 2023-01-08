import { Player } from '@/providers/PlayerProvider';
import { RoomHistory, Seat } from '..';

export const getPlayerSeat = (player: Player, gameHistory: RoomHistory): Seat | undefined => {
  if (player.id === gameHistory.leftUserId) {
    return 'LEFT';
  } else if (player.id === gameHistory.rightUserId) {
    return 'RIGHT';
  }
};

export const getSeatIds = (
  player: Player,
  gameHistory: RoomHistory,
  isJoined: boolean,
): { leftUserId?: string; rightUserId?: string } => {
  const opponentUserId =
    gameHistory.leftUserId === player.id ? gameHistory.rightUserId : gameHistory.leftUserId;

  const leftUserId = isJoined ? player.id : gameHistory.leftUserId;
  const rightUserId = isJoined ? opponentUserId : gameHistory.rightUserId;

  return {
    leftUserId,
    rightUserId,
  };
};
