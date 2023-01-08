import { FinishedGameTable } from '@/pages/Room/hooks';
import { Hand } from '@/services/firestore/types/RoomHistory';

export type GameResult = 'WIN' | 'LOSE' | 'DRAW';

export const useGameResult = (
  game: FinishedGameTable,
): {
  status: 'error' | 'info' | 'warning' | 'success' | 'loading';
  message: string;
} => {
  const judge = (playerHand: Hand, opponentHand: Hand): GameResult => {
    if (playerHand === opponentHand) {
      return 'DRAW';
    } else if (
      (playerHand === 'ROCK' && opponentHand === 'SCISSOR') ||
      (playerHand === 'SCISSOR' && opponentHand === 'PAPER') ||
      (playerHand === 'PAPER' && opponentHand === 'ROCK')
    ) {
      return 'WIN';
    } else {
      return 'LOSE';
    }
  };

  if (game.isJoined) {
    const result = judge(game.playerHand, game.opponentHand);
    return {
      status: result === 'WIN' ? 'success' : result === 'LOSE' ? 'error' : 'warning',
      message:
        result === 'WIN' ? '勝ちました!' : result === 'LOSE' ? '負けました...' : '引き分けでした',
    };
  } else {
    return {
      status: 'info',
      message: 'ゲームを観戦中です',
    };
  }
};
