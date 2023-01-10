import React from 'react';
import { Flex } from '@chakra-ui/react';

import { Hand } from '@/domain/game';
import { SelectHandButton } from './SelectHandButton';

type Prop = {
  selectedHand?: Hand;
  isPlaying: boolean;
  selectHand?: (_hand: Hand) => Promise<void>;
};

export const ActionButtons: React.FC<Prop> = React.memo(function ActionButtons(prop) {
  const hand: Hand[] = ['ROCK', 'SCISSOR', 'PAPER'];

  return (
    <Flex justifyContent='center'>
      {hand.map((h) => (
        <SelectHandButton
          key={h}
          hand={h}
          isPlaying={prop.isPlaying}
          selectHand={prop.selectHand}
          isSelected={prop.selectedHand === h ? true : false}
        />
      ))}
    </Flex>
  );
});
