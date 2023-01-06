import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Room } from '@/pages/Room/hooks';
import { Game } from '@/pages/Room/hooks/useRoom/types';

type Prop = {
  room: Room;
  game: Game;
};

export const PlayingRoom: React.FC<Prop> = ({ room, game }) => {
  return (
    <Box>
      {/* TODO: 閲覧者の人数を表示する */}
      {/* TODO: プレイヤーではない場合、閲覧モードにする */}
      <Text>
        {room.id}: {room.name}
      </Text>
      {game.playerSeat && (
        <Box>
          <Text>手を選んでください</Text>
          <Box>
            {/* TODO: 選択可能にする */}
            <Button>グー</Button>
            <Button>チョキ</Button>
            <Button>パー</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
