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

    const isPlaying = player.id === current?.leftUserId || player.id === current?.rightUserId;
    const isWatching = (!isPlaying && !!current?.leftUserId && !!current?.rightUserId) || false;

    const opponentUserId =
      current.leftUserId === player.id ? current.rightUserId : current.leftUserId;

    const leftUserId = isWatching ? current.leftUserId : isPlaying ? player.id : undefined;
    const rightUserId = isWatching ? current.rightUserId : isPlaying ? opponentUserId : undefined;

    return {
      ...current,
      playerSeat: getPlayerSeat(current),
      isPlaying,
      isWatching,
      leftUserId,
      rightUserId,
    };
  };

  return {
    getCurrentGame,
  };
};
