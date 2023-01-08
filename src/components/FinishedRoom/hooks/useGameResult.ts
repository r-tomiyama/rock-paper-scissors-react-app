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
    if (playerHand === 'ROCK') {
      if (opponentHand === 'PAPER') {
        return 'LOSE';
      } else if (opponentHand === 'SCISSOR') {
        return 'WIN';
      }
    } else if (playerHand === 'PAPER') {
      if (opponentHand === 'SCISSOR') {
        return 'LOSE';
      } else if (opponentHand === 'ROCK') {
        return 'WIN';
      }
    } else if (playerHand === 'SCISSOR') {
      if (opponentHand === 'ROCK') {
        return 'LOSE';
      } else if (opponentHand === 'PAPER') {
        return 'WIN';
      }
    }
    return 'DRAW';
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
