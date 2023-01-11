import { GameTable, useGenerateGameTable } from '@/domain/game';
import { GameHistory } from '..';

export const useCurrentGame = () => {
  const { generateGameTable } = useGenerateGameTable();

  const getCurrentGame = (histories: GameHistory[]): GameTable | undefined => {
    const currentHistory = histories[0];
    const gameTable = generateGameTable(currentHistory);

    return {
      ...currentHistory,
      ...gameTable,
    };
  };

  return {
    getCurrentGame,
  };
};
