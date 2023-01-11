import { Player, usePlayer } from '@/providers/PlayerProvider';
import { GameTable, getPlayerSeat, getSeatIds, Seat } from '@/domain/game';
import { RoomHistory } from '@/pages/Room/hooks';

export const useGenerateGameTable = () => {
  const { player } = usePlayer();
  const generateGameTable = (gameHistory: RoomHistory): GameTable => {
    const playerSeat = getPlayerSeat(player, { ...gameHistory });
    const seatIds = getSeatIds(player, gameHistory, !!playerSeat);
    const { leftUserId, rightUserId, rightHand, leftHand } = gameHistory;

    if (rightUserId && leftUserId && rightHand && leftHand) {
      return generateFinishedGameTable({
        playerSeat,
        gameHistory: {
          ...gameHistory,
          rightUserId,
          leftUserId,
          rightHand,
          leftHand,
        },
      });
    } else if (rightUserId && leftUserId) {
      return generatePlayingGameTable({
        playerSeat,
        gameHistory: {
          ...gameHistory,
          rightUserId,
          leftUserId,
        },
      });
    } else {
      return generateWaitingGameTable({ player, playerSeat, gameHistory });
    }
  };
  return { generateGameTable };
};

const generateFinishedGameTable = (arg: {
  playerSeat?: Seat;
  // eslint-disable-next-line no-undef
  gameHistory: AugmentedRequired<
    RoomHistory,
    'leftUserId' | 'rightUserId' | 'leftHand' | 'rightHand'
  >;
}): GameTable => {
  const { playerSeat, gameHistory } = arg;
  const { leftHand, rightHand } = gameHistory;

  if (playerSeat) {
    const playerHand = playerSeat === 'LEFT' ? leftHand : rightHand;
    const opponentHand = playerSeat === 'LEFT' ? rightHand : leftHand;

    return {
      ...gameHistory,
      status: 'FINISHED',
      isJoined: !!playerSeat,
      leftHand: playerHand,
      rightHand: opponentHand,
      playerHand,
      opponentHand,
    };
  } else {
    return {
      ...gameHistory,
      status: 'FINISHED',
      isJoined: !!playerSeat,
    };
  }
};

const generatePlayingGameTable = (arg: {
  playerSeat?: Seat;
  gameHistory: AugmentedRequired<RoomHistory, 'leftUserId' | 'rightUserId'>;
}): GameTable => {
  const { playerSeat, gameHistory } = arg;
  const { leftHand, rightHand } = gameHistory;

  if (playerSeat) {
    const playerHand = playerSeat === 'LEFT' ? leftHand : rightHand;

    return {
      ...gameHistory,
      status: 'PLAYING',
      isJoined: !!playerSeat,
      leftHand: playerHand,
    };
  } else {
    return {
      ...gameHistory,
      status: 'PLAYING',
      isJoined: !!playerSeat,
    };
  }
};

const generateWaitingGameTable = (arg: {
  player: Player;
  playerSeat?: Seat;
  gameHistory: RoomHistory;
}): GameTable => {
  const { player, playerSeat, gameHistory } = arg;
  const { leftUserId, rightUserId } = gameHistory;

  const opponentUserId = leftUserId === player.id ? rightUserId : leftUserId;

  return {
    ...gameHistory,
    status: 'WAITING',
    isJoined: !!playerSeat,
    leftUserId: playerSeat ? player.id : undefined,
    rightUserId: opponentUserId,
  };
};
