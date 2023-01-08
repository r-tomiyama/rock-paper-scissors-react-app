import { usePlayer } from '@/providers/PlayerProvider';
import { RoomHistory, GameTable, useGenerateGameTable } from '..';
import { getPlayerSeat, getSeatIds } from './utils';

export const useCurrentGame = () => {
  const { player } = usePlayer();
  const { generateGameTable } = useGenerateGameTable();

  const getCurrentGame = (histories: RoomHistory[]): GameTable | undefined => {
    const currentHistory = histories[0];
    const playerSeat = getPlayerSeat(player, currentHistory);
    const seatIds = getSeatIds(player, currentHistory, !!playerSeat);

    const gameTable = generateGameTable({
      playerSeat,
      ...seatIds,
      leftHand: currentHistory.leftHand,
      rightHand: currentHistory.rightHand,
    });

    return {
      ...currentHistory,
      ...gameTable,
    };
  };

  return {
    getCurrentGame,
  };
};
