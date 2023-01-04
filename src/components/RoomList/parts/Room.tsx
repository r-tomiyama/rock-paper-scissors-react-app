import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { Room as RoomData } from '@/components/RoomList/hooks/useRooms';

type Prop = {
  roomData: RoomData;
};

export const Room: React.FC<Prop> = ({ roomData }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/rooms/${roomData.id}`)}>
      <CardHeader>
        <Heading size='md'>
          {roomData.id}: {roomData.name}
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Summary
            </Heading>
            <Text pt='2' fontSize='sm'>
              View a summary of all your clients over the last month.
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
