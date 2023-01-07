import { Game } from '@/pages/Room/hooks/useRoom/types';
import { Hand } from '@/services/firestore/types/RoomHistory';

export type GameResult = 'WIN' | 'LOSE' | 'DRAW';

export const useGameResult = (game: Game): { result: GameResult } => {
  // TODO: 型を改善する
  const playerHand = game.playerHand as Hand;
  const opponentHand = game.opponentHand as Hand;

  if (playerHand === 'ROCK') {
    if (opponentHand === 'PAPER') {
      return { result: 'LOSE' };
    } else if (opponentHand === 'SCISSOR') {
      return { result: 'WIN' };
    }
  } else if (playerHand === 'PAPER') {
    if (opponentHand === 'SCISSOR') {
      return { result: 'LOSE' };
    } else if (opponentHand === 'ROCK') {
      return { result: 'WIN' };
    }
  } else if (playerHand === 'SCISSOR') {
    if (opponentHand === 'ROCK') {
      return { result: 'LOSE' };
    } else if (opponentHand === 'PAPER') {
      return { result: 'WIN' };
    }
  }

  return { result: 'DRAW' };
};
