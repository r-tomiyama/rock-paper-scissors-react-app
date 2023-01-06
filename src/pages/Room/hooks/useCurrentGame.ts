import { usePlayer } from '@/providers/PlayerProvider';
import { Game, RoomHistory } from './useRoom/types';

export type Seat = 'LEFT' | 'RIGHT';

export const useCurrentGame = () => {
  const { player } = usePlayer();
  const getPlayerSeat = (game?: RoomHistory): Seat | undefined => {
    if (player.id === game?.leftUserId) {
      return 'LEFT';
    } else if (player.id === game?.rightUserId) {
      return 'RIGHT';
    }
  };

  const getCurrentGame = (histories: RoomHistory[]): Game | undefined => {
    const current = histories[0];
    return { ...current, playerSeat: getPlayerSeat(current) };
  };

  return {
    getCurrentGame,
  };
};
