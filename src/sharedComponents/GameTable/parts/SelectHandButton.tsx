import React from 'react';
import { Hand } from '@/services/firestore/types/RoomHistory';
import { Button, Image } from '@chakra-ui/react';

type Prop = {
  hand: Hand;
  isSelected: boolean;
  isPlaying: boolean;
  selectHand?: (_hand: Hand) => Promise<void>;
};

export const SelectHandButton: React.FC<Prop> = React.memo(function SelectHandButton(prop) {
  const filePath = `/images/${prop.hand.toLowerCase()}.png`;

  return prop.isPlaying ? (
    <Button
      mx='1vw'
      py='5vw'
      borderRadius='full'
      bg={prop.isSelected ? 'cyan.200' : 'gray.100'}
      _hover={{ bg: prop.isSelected ? 'cyan.300' : 'gray.200' }}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={async () => prop.selectHand && (await prop.selectHand(prop.hand))}
    >
      <Image src={filePath} boxSize='5vw' />
    </Button>
  ) : (
    <Button mx='1vw' py='5vw' borderRadius='full' bg='gray.200' disabled={true}>
      <Image src={filePath} boxSize='5vw' />
    </Button>
  );
});
