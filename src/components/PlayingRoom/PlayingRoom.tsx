import React, { useCallback, useMemo } from 'react';
import { Alert, AlertIcon, Box } from '@chakra-ui/react';
import { Room } from '@/pages/Room/hooks';
import { Game } from '@/pages/Room/hooks/useRoom/types';
import { useSelectHand } from './hooks';
import { Hand } from '@/services/firestore/types/RoomHistory';
import { GameTable } from '@/sharedComponents';

type Prop = {
  room: Room;
  game: Game;
};

export const PlayingRoom: React.FC<Prop> = ({ room, game }) => {
  const { trigger } = useSelectHand();

  const selectHand = useCallback(async (hand: Hand): Promise<void> => {
    await trigger({ roomId: room.id, game, hand });
  }, []);

  const selectedHand = useMemo(
    () => (game.playerSeat === 'LEFT' ? game['leftHand'] : game['rightHand']),
    [game],
  );

  const isPlayableInfo:
    | {
        isPlayable: true;
        selectedHand?: Hand;
      }
    | false = useMemo(
    // TODO: 効率化のために、手札ごとのinfoをここで作る
    () =>
      game.isPlaying
        ? {
            isPlayable: true,
            selectedHand: selectedHand,
          }
        : false,
    [game],
  );
  return (
    <Box>
      {/* TODO: 閲覧者の人数を表示する */}
      <Alert status='info'>
        <AlertIcon />
        {game.isPlaying ? '手を選んでください!' : 'ゲームを観戦中です'}
      </Alert>

      <GameTable
        leftUserId={game.leftUserId}
        rightUserId={game.rightUserId}
        isPlayableInfo={isPlayableInfo}
        selectHand={selectHand}
      />
    </Box>
  );
};
