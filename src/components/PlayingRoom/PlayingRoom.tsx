import React, { useCallback } from 'react';
import { Alert, AlertIcon, Box } from '@chakra-ui/react';

import { Hand, PlayingGameTable } from '@/domain/game';
import { Room } from '@/domain/room';
import { useSelectHand } from './hooks';
import { GameTable } from '@/sharedComponents';

type Prop = {
  room: Room;
  game: PlayingGameTable;
};

export const PlayingRoom: React.FC<Prop> = ({ room, game }) => {
  const { trigger } = useSelectHand();

  const selectHand = useCallback(async (hand: Hand): Promise<void> => {
    await trigger({ roomId: room.id, game, hand });
  }, []);

  return (
    <Box>
      {/* TODO: 閲覧者の人数を表示する */}
      <Alert status='info'>
        <AlertIcon />
        {game.isJoined ? '手を選んでください!' : 'ゲームを観戦中です'}
      </Alert>

      <GameTable
        isJoined={game.isJoined}
        leftUserId={game.leftUserId}
        rightUserId={game.rightUserId}
        leftHand={game.leftHand}
        rightHand={!game.isJoined ? game.rightHand : undefined}
        selectHand={selectHand}
      />
    </Box>
  );
};
