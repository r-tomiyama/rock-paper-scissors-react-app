import { Game } from '@/pages/Room/hooks/useRoom/types';
import { Alert, AlertIcon } from '@chakra-ui/react';
import React from 'react';

import { useGameResult } from '../hooks';

type Prop = {
  game: Game;
};

export const ResultMessage: React.FC<Prop> = ({ game }) => {
  const { result } = useGameResult(game);

  const status = result === 'WIN' ? 'success' : result === 'LOSE' ? 'error' : 'warning';

  const message =
    result === 'WIN' ? '勝ちました!' : result === 'LOSE' ? '負けました...' : '引き分けでした';

  return (
    <Alert status={status}>
      <AlertIcon />
      {message}
    </Alert>
  );
};
