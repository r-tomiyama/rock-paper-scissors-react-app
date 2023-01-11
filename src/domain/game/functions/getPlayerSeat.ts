import { Player } from '@/providers/PlayerProvider';
import { Seat } from '../types';

export const getPlayerSeat = (
  player: Player,
  seats: { leftUserId?: string; rightUserId?: string },
): Seat | undefined => {
  if (player.id === seats.leftUserId) {
    return 'LEFT';
  } else if (player.id === seats.rightUserId) {
    return 'RIGHT';
  }
};
