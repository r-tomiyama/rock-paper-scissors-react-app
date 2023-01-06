import { updateDoc } from 'firebase/firestore';
import useSWRMutation from 'swr/mutation';

import { roomHistoryDoc } from '@/services/firestore/firestoreService';
import { Key } from 'swr';
import { Hand } from '@/services/firestore/types/RoomHistory';
import { Game } from '@/pages/Room/hooks/useRoom/types';

type FetcherArg = { roomId: string; game: Game; hand: Hand };

const fetcher = async (_k: string, options: { arg: FetcherArg }): Promise<void> => {
  const ref = roomHistoryDoc({ roomId: options.arg.roomId, documentId: options.arg.game.id });
  await updateDoc(ref, {
    [options.arg.game.playerSeat === 'LEFT' ? 'leftHand' : 'rightHand']: options.arg.hand,
  });
};

export const useSelectHand = () => {
  return useSWRMutation<void, Error, Key, FetcherArg>('api/room/hand', fetcher);
};
