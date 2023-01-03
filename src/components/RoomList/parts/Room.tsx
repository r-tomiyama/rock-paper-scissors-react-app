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

import { Room as RoomData } from '@/hooks/database/useRooms';

type Prop = {
  roomData: RoomData;
};

export const Room: React.FC<Prop> = ({ roomData }) => {
  return (
    <Card>
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
