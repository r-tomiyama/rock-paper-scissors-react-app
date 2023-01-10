import { Player } from '@/providers/PlayerProvider';
import { RoomHistory } from '..';

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
