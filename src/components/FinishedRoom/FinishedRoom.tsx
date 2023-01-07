import React, { useCallback } from 'react';
import { Box, Button, Center, Text } from '@chakra-ui/react';
import { Room } from '@/pages/Room/hooks';
import { Game } from '@/pages/Room/hooks/useRoom/types';
import { useCreateNextGame } from './hooks';
import { usePlayer } from '@/providers/PlayerProvider';
import { ResultMessage } from './parts/ResultMessage';

type Prop = {
  room: Room;
  game: Game;
};

export const FinishedRoom: React.FC<Prop> = ({ room, game }) => {
  const { trigger, isMutating } = useCreateNextGame();
  const { player } = usePlayer();

  const nextGame = useCallback(async (): Promise<void> => {
    await trigger({ room, playerId: player.id });
  }, [room, player]);

  return <>{game.playerSeat && <ResultMessage game={game} nextAction={nextGame} />}</>;
};
