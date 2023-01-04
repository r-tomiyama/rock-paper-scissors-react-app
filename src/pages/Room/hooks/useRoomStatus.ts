import { Room } from '@/pages/Room/hooks';

export type Status = 'WAITING' | 'PLAYING' | 'FINISHED';

export const useRoomStatus = (room: Room): { status: Status } => {
  if (room.histories.length < 1) {
    return { status: 'WAITING' };
  }
  const lastHistory = room.histories[room.histories.length - 1];

  if (
    lastHistory.rightUserId &&
    lastHistory.leftUserId &&
    lastHistory.rightHand &&
    lastHistory.leftHand
  ) {
    return { status: 'FINISHED' };
  } else if (lastHistory.rightUserId && lastHistory.leftUserId) {
    return { status: 'PLAYING' };
  } else {
    return { status: 'WAITING' };
  }
};
