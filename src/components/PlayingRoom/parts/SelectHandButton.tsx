import React from 'react';
import { Hand } from '@/services/firestore/types/RoomHistory';
import { Button, Image } from '@chakra-ui/react';

type Prop = {
  hand: Hand;
  isPlayableInfo:
    | {
        isPlayable: true;
        selectedHand?: Hand;
        selectHand: (_hand: Hand) => Promise<void>;
      }
    | false;
};

export const SelectHandButton: React.FC<Prop> = ({ hand, isPlayableInfo }) => {
  const filePath = `/images/${hand.toLowerCase()}.png`;

  return isPlayableInfo ? (
    <Button
      mx='1vw'
      py='5vw'
      borderRadius='full'
      bg={isPlayableInfo.selectedHand === hand ? 'cyan.200' : 'gray.100'}
      _hover={{ bg: 'cyan.300' }}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={async () => await isPlayableInfo.selectHand(hand)}
    >
      <Image src={filePath} boxSize='5vw' />
    </Button>
  ) : (
    <Button mx='1vw' py='5vw' borderRadius='full' bg='gray.200' disabled={true}>
      <Image src={filePath} boxSize='5vw' />
    </Button>
  );
};
