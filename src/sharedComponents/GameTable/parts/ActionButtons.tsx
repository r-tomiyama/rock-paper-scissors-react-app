import React from 'react';
import { Flex } from '@chakra-ui/react';
import { SelectHandButton } from './SelectHandButton';
import { Hand } from '@/services/firestore/types/RoomHistory';

type Prop = {
  isPlayableInfo:
    | {
        isPlayable: true;
        selectedHand?: Hand;
        selectHand: (_hand: Hand) => Promise<void>;
      }
    | false;
};

export const ActionButtons: React.FC<Prop> = React.memo(function ActionButtons(prop) {
  return (
    <Flex justifyContent='center'>
      <SelectHandButton
        hand='ROCK'
        isPlayableInfo={prop.isPlayableInfo}
        selected={prop.isPlayableInfo && prop.isPlayableInfo.selectedHand === 'ROCK' ? true : false}
      />
      <SelectHandButton
        hand='SCISSOR'
        isPlayableInfo={prop.isPlayableInfo}
        selected={
          prop.isPlayableInfo && prop.isPlayableInfo.selectedHand === 'SCISSOR' ? true : false
        }
      />
      <SelectHandButton
        hand='PAPER'
        isPlayableInfo={prop.isPlayableInfo}
        selected={
          prop.isPlayableInfo && prop.isPlayableInfo.selectedHand === 'PAPER' ? true : false
        }
      />
    </Flex>
  );
});
