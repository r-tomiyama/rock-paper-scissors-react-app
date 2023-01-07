import { Game } from '@/pages/Room/hooks/useRoom/types';
import { Alert, AlertIcon, Link, Text } from '@chakra-ui/react';
import React from 'react';

import { useGameResult } from '../hooks';

type Prop = {
  game: Game;
  nextAction: () => Promise<void>;
};

export const ResultMessage: React.FC<Prop> = ({ game, nextAction }) => {
  const { result } = useGameResult(game);

  const status = result === 'WIN' ? 'success' : result === 'LOSE' ? 'error' : 'warning';

  const message =
    result === 'WIN' ? '勝ちました!' : result === 'LOSE' ? '負けました...' : '引き分けでした';

  return (
    <Alert status={status}>
      <AlertIcon />
      <Text mr='5vw'>{message}</Text>
      <Link
        color='gray.600'
        fontWeight='semibold'
        textDecoration='underline'
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => nextAction()}
      >
        続けますか?
      </Link>
    </Alert>
  );
};
