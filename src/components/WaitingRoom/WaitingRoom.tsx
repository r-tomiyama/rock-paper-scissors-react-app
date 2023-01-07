import React, { useMemo } from 'react';
import { Alert, AlertIcon, Box, Center } from '@chakra-ui/react';
import { Room } from '@/pages/Room/hooks';
import { JoinGameForm } from '@/components/JoinGameForm';
import { Game } from '@/pages/Room/hooks/useRoom/types';
import { GameTable } from '@/sharedComponents';
import { usePlayer } from '@/providers/PlayerProvider';

type Prop = {
  room: Room;
  game: Game;
};

export const WaitingRoom: React.FC<Prop> = ({ room, game }) => {
  const { player } = usePlayer();

  // TODO: この辺は常に必要になるので、gameに含める
  const userId: { leftUserId?: string; rightUserId?: string } = useMemo(() => {
    // TODO: 型付けを改善する
    if (game.playerSeat) {
      return {
        leftUserId: player.id,
        rightUserId: game.leftUserId === player.id ? game.rightUserId : game.leftUserId,
      };
    } else {
      return { leftUserId: undefined, rightUserId: game.rightUserId || game.leftUserId };
    }
  }, [game.playerSeat]);

  return (
    <Box>
      <Alert status='info'>
        <AlertIcon />
        メンバーが揃うのを待っています!
      </Alert>
      <GameTable
        leftUserId={userId.leftUserId}
        rightUserId={userId.rightUserId}
        isPlayableInfo={false}
      />
      {!game.playerSeat && (
        <Center>
          <JoinGameForm roomId={room.id} playingGame={game} />
        </Center>
      )}
    </Box>
  );
};
