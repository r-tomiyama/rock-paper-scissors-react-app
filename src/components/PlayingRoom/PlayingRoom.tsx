import React, { useCallback, useMemo } from 'react';
import { Alert, AlertIcon, Box, Button, Text } from '@chakra-ui/react';
import { Room } from '@/pages/Room/hooks';
import { Game } from '@/pages/Room/hooks/useRoom/types';
import { useSelectHand } from './hooks';
import { Hand } from '@/services/firestore/types/RoomHistory';

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

  return (
    <Box>
      {/* TODO: 閲覧者の人数を表示する */}
      {/* TODO: プレイヤーではない場合、閲覧モードにする */}
      {game.playerSeat && (
        <Box>
          <Alert status='info'>
            <AlertIcon />
            手を選んでください!
          </Alert>
          <Box>
            <Button
              bg={selectedHand === 'ROCK' ? 'red' : 'gray.100'}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => await selectHand('ROCK')}
            >
              グー
            </Button>
            <Button
              bg={selectedHand === 'SCISSOR' ? 'red' : 'gray.100'}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => selectHand('SCISSOR')}
            >
              チョキ
            </Button>
            <Button
              bg={selectedHand === 'PAPER' ? 'red' : 'gray.100'}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={() => selectHand('PAPER')}
            >
              パー
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
