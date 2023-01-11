import { GameHistory } from '@/domain/gameHistory';
import { Player } from '@/providers/PlayerProvider';

export const getSeatIds = (
  player: Player,
  gameHistory: GameHistory,
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
