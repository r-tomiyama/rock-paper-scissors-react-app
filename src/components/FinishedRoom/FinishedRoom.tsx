import React, { useCallback } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Room } from '@/pages/Room/hooks';
import { Game } from '@/pages/Room/hooks/useRoom/types';
import { useCreateNextGame, useGameResult } from './hooks';
import { usePlayer } from '@/providers/PlayerProvider';

type Prop = {
  room: Room;
  game: Game;
};

export const FinishedRoom: React.FC<Prop> = ({ room, game }) => {
  const { result } = useGameResult(game);
  const { trigger, isMutating } = useCreateNextGame();
  const { player } = usePlayer();

  const nextGame = useCallback(async (): Promise<void> => {
    await trigger({ room, playerId: player.id });
  }, [room, player]);

  return (
    <Box>
      <Text>
        {room.id}: {room.name}
      </Text>
      <Box>
        <Text>結果</Text>
        <Text>{result}</Text>
      </Box>
      <Box>
        <Button
          isLoading={isMutating}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => nextGame()}
        >
          続ける
        </Button>
      </Box>
    </Box>
  );
};
