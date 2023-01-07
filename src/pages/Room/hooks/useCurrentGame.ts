import { usePlayer } from '@/providers/PlayerProvider';
import { useDetermineRoomStatus } from '.';
import { Game, RoomHistory } from './useRoom/types';

export type Seat = 'LEFT' | 'RIGHT';

export const useCurrentGame = () => {
  const { player } = usePlayer();
  const { determineRoomStatus } = useDetermineRoomStatus();

  const getPlayerSeat = (game?: RoomHistory): Seat | undefined => {
    if (player.id === game?.leftUserId) {
      return 'LEFT';
    } else if (player.id === game?.rightUserId) {
      return 'RIGHT';
    }
  };

  const getCurrentGame = (histories: RoomHistory[]): Game | undefined => {
    const current = histories[0];
    const status = determineRoomStatus(current);

    // TODO: リファクタ

    const isPlaying = player.id === current?.leftUserId || player.id === current?.rightUserId;
    const isWatching = (!isPlaying && !!current?.leftUserId && !!current?.rightUserId) || false;

    const playerSeat = getPlayerSeat(current);

    const opponentUserId =
      current.leftUserId === player.id ? current.rightUserId : current.leftUserId;

    const leftUserId = isWatching ? current.leftUserId : isPlaying ? player.id : undefined;
    const rightUserId = isWatching ? current.rightUserId : isPlaying ? opponentUserId : undefined;

    const playerHand = playerSeat === 'LEFT' ? current.leftHand : current.rightHand;
    const opponentHand = playerSeat === 'LEFT' ? current.rightHand : current.leftHand;

    const leftHand = isWatching ? current.leftHand : isPlaying ? playerHand : undefined;
    const rightHand = isWatching ? current.rightHand : isPlaying ? opponentHand : undefined;

    return {
      ...current,
      status,
      playerSeat,
      isPlaying,
      isWatching,
      leftUserId,
      rightUserId,
      playerHand,
      opponentHand,
      leftHand,
      rightHand,
    };
  };

  return {
    getCurrentGame,
  };
};
