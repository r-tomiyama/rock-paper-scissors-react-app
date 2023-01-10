import { updateDoc } from 'firebase/firestore';
import useSWRMutation from 'swr/mutation';
import { Key } from 'swr';

import { roomHistoryDoc } from '@/services/firestore/firestoreService';
import { Hand, PlayingGameTable, getPlayerSeat } from '@/domain/game';
import { Player, usePlayer } from '@/providers/PlayerProvider';

type FetcherArg = { roomId: string; game: PlayingGameTable; hand: Hand };

const fetcher =
  (player: Player) =>
  async (_k: string, options: { arg: FetcherArg }): Promise<void> => {
    const playerSeat = getPlayerSeat(player, {
      leftUserId: options.arg.game.leftUserId,
      rightUserId: options.arg.game.rightUserId,
    });

    const ref = roomHistoryDoc({ roomId: options.arg.roomId, documentId: options.arg.game.id });
    await updateDoc(ref, {
      [playerSeat === 'LEFT' ? 'leftHand' : 'rightHand']: options.arg.hand,
    });
  };

export const useSelectHand = () => {
  const { player } = usePlayer();
  return useSWRMutation<void, Error, Key, FetcherArg>('api/room/hand', fetcher(player));
};
