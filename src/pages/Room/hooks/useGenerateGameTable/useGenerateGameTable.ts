import { usePlayer } from '@/providers/PlayerProvider';
import { Hand } from '@/services/firestore/types/RoomHistory';
import { Seat, GameTable } from './types';
import {
  generateFinishedGameTable,
  generatePlayingGameTable,
  generateWaitingGameTable,
} from './utils';

export const useGenerateGameTable = () => {
  const { player } = usePlayer();
  const generateGameTable = (tableInfo: {
    playerSeat?: Seat;
    leftUserId?: string;
    rightUserId?: string;
    leftHand?: Hand;
    rightHand?: Hand;
  }): GameTable => {
    const { leftUserId, rightUserId, rightHand, leftHand } = tableInfo;

    if (rightUserId && leftUserId && rightHand && leftHand) {
      return generateFinishedGameTable({
        ...tableInfo,
        rightUserId,
        leftUserId,
        rightHand,
        leftHand,
      });
    } else if (rightUserId && leftUserId) {
      return generatePlayingGameTable({
        ...tableInfo,
        rightUserId,
        leftUserId,
      });
    } else {
      return generateWaitingGameTable({ ...tableInfo, player });
    }
  };
  return { generateGameTable };
};