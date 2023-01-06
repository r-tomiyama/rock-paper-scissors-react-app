import { Game } from '@/pages/Room/hooks/useRoom/types';

export type GameResult = 'WIN' | 'LOSE' | 'DRAW';

export const useGameResult = (game: Game): { result: GameResult } => {
  const playerHand = game.playerSeat === 'LEFT' ? game.leftHand : game.rightHand;
  const opponentHand = game.playerSeat === 'LEFT' ? game.rightHand : game.leftHand;

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
