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
  return (
    <Box>
      <Alert status='info'>
        <AlertIcon />
        メンバーが揃うのを待っています!
      </Alert>
      <GameTable
        leftUserId={game.leftUserId}
        rightUserId={game.rightUserId}
        isPlayableInfo={false}
      />
      {!game.isPlaying && (
        <Center>
          <JoinGameForm roomId={room.id} playingGame={game} />
        </Center>
      )}
    </Box>
  );
};
