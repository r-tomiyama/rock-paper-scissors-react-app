import React, { useCallback } from 'react';
import { FinishedGameTable, Room } from '@/pages/Room/hooks';
import { useCreateNextGame, useGameResult } from './hooks';
import { usePlayer } from '@/providers/PlayerProvider';
import { GameTable } from '@/sharedComponents';
import { Alert, AlertIcon, Link, Text } from '@chakra-ui/react';

type Prop = {
  room: Room;
  game: FinishedGameTable;
};

export const FinishedRoom: React.FC<Prop> = ({ room, game }) => {
  // TODO: 結果をアニメーション表示する

  const { trigger } = useCreateNextGame();
  const { player } = usePlayer();
  const { status, message } = useGameResult(game);

  const nextGame = useCallback(async (): Promise<void> => {
    await trigger({ room, playerId: player.id });
  }, [room, player]);

  return (
    <>
      <Alert status={status}>
        <AlertIcon />
        <Text>{message}</Text>
        {game.isJoined && (
          <Link
            color='gray.600'
            fontWeight='semibold'
            textDecoration='underline'
            ml='5vw'
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => nextGame()}
          >
            続けますか?
          </Link>
        )}
      </Alert>
      <GameTable
        isJoined={game.isJoined}
        leftUserId={game.leftUserId}
        rightUserId={game.rightUserId}
        leftHand={game.leftHand}
        rightHand={game.rightHand}
      />
    </>
  );
};
