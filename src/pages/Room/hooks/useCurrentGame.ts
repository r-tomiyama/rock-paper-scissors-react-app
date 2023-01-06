import { usePlayer } from '@/providers/PlayerProvider';
import { RoomHistory } from './useRoom/types';

export type Seat = 'LEFT' | 'RIGHT';

export const useCurrentGame = () => {
  const { player } = usePlayer();

  const getCurrentGame = (histories: RoomHistory[]): RoomHistory | undefined => {
    return histories[0];
  };
  const getPlayerSeat = (game?: RoomHistory): Seat | undefined => {
    if (player.id === game?.leftUserId) {
      return 'LEFT';
    } else if (player.id === game?.rightUserId) {
      return 'RIGHT';
    }
  };

  return {
    getCurrentGame,
    getPlayerSeat,
  };
};
