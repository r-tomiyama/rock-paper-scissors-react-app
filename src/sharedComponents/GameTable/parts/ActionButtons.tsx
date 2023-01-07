import React from 'react';
import { Flex } from '@chakra-ui/react';
import { SelectHandButton } from './SelectHandButton';
import { Hand } from '@/services/firestore/types/RoomHistory';

type Prop = {
  isPlayableInfo:
    | {
        isPlayable: true;
        selectedHand?: Hand;
      }
    | false;
  selectHand?: (_hand: Hand) => Promise<void>;
};

export const ActionButtons: React.FC<Prop> = React.memo(function ActionButtons(prop) {
  return (
    <Flex justifyContent='center'>
      <SelectHandButton
        hand='ROCK'
        isPlayableInfo={prop.isPlayableInfo}
        selected={prop.isPlayableInfo && prop.isPlayableInfo.selectedHand === 'ROCK' ? true : false}
        selectHand={prop.selectHand}
      />
      <SelectHandButton
        hand='SCISSOR'
        isPlayableInfo={prop.isPlayableInfo}
        selected={
          prop.isPlayableInfo && prop.isPlayableInfo.selectedHand === 'SCISSOR' ? true : false
        }
        selectHand={prop.selectHand}
      />
      <SelectHandButton
        hand='PAPER'
        isPlayableInfo={prop.isPlayableInfo}
        selected={
          prop.isPlayableInfo && prop.isPlayableInfo.selectedHand === 'PAPER' ? true : false
        }
        selectHand={prop.selectHand}
      />
    </Flex>
  );
});
