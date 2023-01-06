import { RoomHistory } from './useRoom/types';

export type Status = 'WAITING' | 'PLAYING' | 'FINISHED';

export const useDetermineRoomStatus = () => {
  const determineRoomStatus = (game?: RoomHistory): Status => {
    if (!game) {
      return 'WAITING';
    }

    if (game.rightUserId && game.leftUserId && game.rightHand && game.leftHand) {
      return 'FINISHED';
    } else if (game.rightUserId && game.leftUserId) {
      return 'PLAYING';
    } else {
      return 'WAITING';
    }
  };

  return {
    determineRoomStatus,
  };
};
