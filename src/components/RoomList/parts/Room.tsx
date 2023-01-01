import React from 'react'
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'

type Prop = {
  name: string;
}

export const Room: React.FC<Prop> = ({ name }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size='md'>{name}</Heading>
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
  )
}
