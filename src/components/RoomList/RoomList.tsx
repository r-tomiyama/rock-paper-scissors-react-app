import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { Room } from './parts';
import { useRooms } from '../../hooks/firestore/useRooms';
import { Room as RoomType } from "../../services/firestore/types/Room" 

export const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<RoomType[]>();
  useEffect(() => {
    const fetchRooms = async () => {
      const { rooms } = await useRooms();
      setRooms(rooms);
    }
    fetchRooms();
  })

  return (
    <Box>
      {rooms && rooms.map((r, i) => <Room key={i} name={r.name} />)}
    </Box>
  )
}
