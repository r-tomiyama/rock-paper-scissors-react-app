import React from 'react';
import { Hand } from '@/services/firestore/types/RoomHistory';
import { Button, Image } from '@chakra-ui/react';

type Prop = {
  hand: Hand;
  selected: boolean;
  isPlayableInfo:
    | {
        isPlayable: true;
        selectHand: (_hand: Hand) => Promise<void>;
      }
    | false;
};

export const SelectHandButton: React.FC<Prop> = React.memo(function SelectHandButton(prop) {
  const filePath = `/images/${prop.hand.toLowerCase()}.png`;

  const isPlayableInfo = prop.isPlayableInfo;

  return isPlayableInfo ? (
    <Button
      mx='1vw'
      py='5vw'
      borderRadius='full'
      bg={prop.selected ? 'cyan.200' : 'gray.100'}
      _hover={{ bg: prop.selected ? 'cyan.300' : 'gray.200' }}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={async () => await isPlayableInfo.selectHand(prop.hand)}
    >
      <Image src={filePath} boxSize='5vw' />
    </Button>
  ) : (
    <Button mx='1vw' py='5vw' borderRadius='full' bg='gray.200' disabled={true}>
      <Image src={filePath} boxSize='5vw' />
    </Button>
  );
});
