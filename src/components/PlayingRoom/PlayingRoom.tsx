import React, { useCallback, useMemo } from 'react';
import { Alert, AlertIcon, Box, Center, Flex, Image, Text } from '@chakra-ui/react';
import { Room } from '@/pages/Room/hooks';
import { Game } from '@/pages/Room/hooks/useRoom/types';
import { useSelectHand } from './hooks';
import { Hand } from '@/services/firestore/types/RoomHistory';
import { usePlayer } from '@/providers/PlayerProvider';
import { SelectHandButton } from './parts';

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
    | false = game.playerSeat
    ? {
        isPlayable: true,
        selectHand: selectHand,
        selectedHand: selectedHand,
      }
    : false;

  return (
    <Box>
      {/* TODO: 閲覧者の人数を表示する */}

      {game.playerSeat && (
        <Alert status='info'>
          <AlertIcon />
          手を選んでください!
        </Alert>
      )}

      <Flex py='5vh'>
        <Box width='50%'>
          <Flex justifyContent='center'>
            <Flex height='35vw' width='35vw' alignContent='center'>
              <Image src='/images/player.png' margin='auto 0' />
            </Flex>
          </Flex>

          <Center mb='5vh'>
            <Text>{userId.leftUserId}</Text>
          </Center>

          <Flex justifyContent='center'>
            <SelectHandButton hand='ROCK' isPlayableInfo={isPlayableInfo} />
            <SelectHandButton hand='SCISSOR' isPlayableInfo={isPlayableInfo} />
            <SelectHandButton hand='PAPER' isPlayableInfo={isPlayableInfo} />
          </Flex>
        </Box>

        <Box width='50%'>
          <Flex justifyContent='center'>
            <Flex height='35vw' width='35vw' alignContent='center'>
              <Image src='/images/opponent.png' margin='auto 0' />
            </Flex>
          </Flex>

          <Center mb='5vh'>
            <Text>{userId.rightUserId}</Text>
          </Center>

          <Flex justifyContent='center'>
            <SelectHandButton hand='ROCK' isPlayableInfo={false} />
            <SelectHandButton hand='SCISSOR' isPlayableInfo={false} />
            <SelectHandButton hand='PAPER' isPlayableInfo={false} />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
