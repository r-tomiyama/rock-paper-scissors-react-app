import React, { useCallback, useMemo } from 'react';
import { Alert, AlertIcon, Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import { Room } from '@/pages/Room/hooks';
import { Game } from '@/pages/Room/hooks/useRoom/types';
import { useSelectHand } from './hooks';
import { Hand } from '@/services/firestore/types/RoomHistory';
import { usePlayer } from '@/providers/PlayerProvider';
import { GameTable } from '@/sharedComponents';

type Prop = {
  room: Room;
  game: Game;
};

export const PlayingRoom: React.FC<Prop> = ({ room, game }) => {
  const { trigger } = useSelectHand();
  const { player } = usePlayer();

  const selectHand = useCallback(async (hand: Hand): Promise<void> => {
    await trigger({ roomId: room.id, game, hand });
  }, []);

  const selectedHand = useMemo(
    () => (game.playerSeat === 'LEFT' ? game['leftHand'] : game['rightHand']),
    [game],
  );

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

  const isPlayableInfo:
    | {
        isPlayable: true;
        selectedHand?: Hand;
        selectHand: (_hand: Hand) => Promise<void>;
      }
    | false = useMemo(
    // TODO: 効率化のために、手札ごとのinfoをここで作る
    () =>
      game.playerSeat
        ? {
            isPlayable: true,
            selectHand: selectHand,
            selectedHand: selectedHand,
          }
        : false,
    [game],
  );

  return (
    <Box>
      {/* TODO: 閲覧者の人数を表示する */}

      {game.playerSeat && (
        <Alert status='info'>
          <AlertIcon />
          手を選んでください!
        </Alert>
      )}

      <GameTable
        leftUserId={userId.leftUserId}
        rightUserId={userId.rightUserId}
        isPlayableInfo={isPlayableInfo}
      />
    </Box>
  );
};
