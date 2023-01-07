import React, { useCallback } from 'react';
import { Room } from '@/pages/Room/hooks';
import { Game } from '@/pages/Room/hooks/useRoom/types';
import { useCreateNextGame, useGameResult } from './hooks';
import { usePlayer } from '@/providers/PlayerProvider';
import { GameTable } from '@/sharedComponents';
import { Alert, AlertIcon, Link, Text } from '@chakra-ui/react';

type Prop = {
  room: Room;
  game: Game;
};

export const FinishedRoom: React.FC<Prop> = ({ room, game }) => {
  // TODO: 結果をアニメーション表示する
  // TODO: 選択した手に色を付ける

  const { trigger } = useCreateNextGame();
  const { player } = usePlayer();
  const { result } = useGameResult(game);

  const nextGame = useCallback(async (): Promise<void> => {
    await trigger({ room, playerId: player.id });
  }, [room, player]);

  const status = game.isPlaying
    ? result === 'WIN'
      ? 'success'
      : result === 'LOSE'
      ? 'error'
      : 'warning'
    : 'info';

  const message = game.isPlaying
    ? result === 'WIN'
      ? '勝ちました!'
      : result === 'LOSE'
      ? '負けました...'
      : '引き分けでした'
    : 'ゲームを観戦中です';

  return (
    <>
      <Alert status={status}>
        <AlertIcon />
        <Text>{message}</Text>
        {game.isPlaying && (
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
        leftUserId={game.leftUserId}
        rightUserId={game.rightUserId}
        isPlayableInfo={false}
      />
    </>
  );
};
