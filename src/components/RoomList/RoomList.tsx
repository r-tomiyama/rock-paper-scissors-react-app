import React from 'react'
import { Box } from '@chakra-ui/react'
import { Room } from './parts';

export const RoomList: React.FC = () => {
  const rooms = [
    {id: "id1", name: "部屋1"},
    {id: "id2", name: "部屋2"},
    {id: "id3", name: "部屋3"}
  ];

  return (
    <Box>
      {rooms.map(r => <Room key={r.id} name={r.name} />)}
    </Box>
  )
}
