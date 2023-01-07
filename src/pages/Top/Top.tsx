import React from 'react';
import './style.css';

import { RoomList } from '@/components/RoomList';
import { CreateRoomForm } from '@/components/CreateRoomForm';
import { Center } from '@chakra-ui/react';

export const Top: React.FC = () => {
  return (
    <>
      <Center pt='15vh' mb='10vh'>
        <CreateRoomForm />
      </Center>
      <RoomList />
    </>
  );
};

// TODO: 部屋をアーカイブできるようにする
// TODO: セキュリティルールを作る
// TODO: deploy
// TODO: TOP表示時にしばらく動いていない部屋を消す (本当はfunctionsでやりたい..)

// TODO: データの変更
// histories → gameHistories に変更したい
// left, rightをただの順番にする
