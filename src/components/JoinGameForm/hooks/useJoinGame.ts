import { runTransaction } from 'firebase/firestore';
import useSWRMutation from 'swr/mutation';

import { roomHistoryDoc } from '@/services/firestore/firestoreService';
import { Key } from 'swr';
import { db } from '@/services/firebaseService';

type FetcherArg = { roomId: string; historyId: string; playerId: string };

const fetcher = async (_k: string, options: { arg: FetcherArg }): Promise<void> => {
  const ref = roomHistoryDoc({ roomId: options.arg.roomId, documentId: options.arg.historyId });

  try {
    await runTransaction(db, async (transaction) => {
      const history = await transaction.get(ref);
      if (!history.exists()) {
        throw 'historyが存在しません';
      }

      transaction.update(ref, {
        [history.data().rightUserId ? 'leftUserId' : 'rightUserId']: options.arg.playerId,
      });
    });
  } catch (e) {
    console.error('Transaction failed: ', e);
  }
};

export const useJoinGame = () => {
  return useSWRMutation<void, Error, Key, FetcherArg>('api/room', fetcher);
};
