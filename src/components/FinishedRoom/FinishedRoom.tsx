import React, { useCallback, useMemo } from 'react';
import { Room } from '@/pages/Room/hooks';
import { Game } from '@/pages/Room/hooks/useRoom/types';
import { useCreateNextGame } from './hooks';
import { usePlayer } from '@/providers/PlayerProvider';
import { ResultMessage } from './parts/ResultMessage';
import { GameTable } from '@/sharedComponents';

type Prop = {
  room: Room;
  game: Game;
};

export const FinishedRoom: React.FC<Prop> = ({ room, game }) => {
  // TODO: 結果をアニメーション表示する
  // TODO: 選択した手に色を付ける

  const { trigger } = useCreateNextGame();
  const { player } = usePlayer();

  const nextGame = useCallback(async (): Promise<void> => {
    await trigger({ room, playerId: player.id });
  }, [room, player]);

  const userId: { leftUserId?: string; rightUserId?: string } = useMemo(() => {
    // TODO: 型付けを改善する
    if (game.playerSeat) {
      return {
        leftUserId: player.id,
        rightUserId: game.leftUserId === player.id ? game.rightUserId : game.leftUserId,
      };
    } else {
      return { leftUserId: game.leftUserId, rightUserId: game.rightUserId };
    }
  }, [game.playerSeat]);

  return (
    <>
      {game.playerSeat && <ResultMessage game={game} nextAction={nextGame} />}
      <GameTable
        leftUserId={userId.leftUserId}
        rightUserId={userId.rightUserId}
        isPlayableInfo={false}
      />
    </>
  );
};
