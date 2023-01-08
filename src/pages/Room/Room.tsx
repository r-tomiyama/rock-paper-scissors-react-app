import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, Flex, Text } from '@chakra-ui/react';

import { useRoom } from '@/pages/Room/hooks';
import { Spinner } from '@/sharedComponents';
import { PlayingRoom } from '@/components/PlayingRoom';
import { WaitingRoom } from '@/components/WaitingRoom';
import { FinishedRoom } from '@/components/FinishedRoom';
import { ChevronRightIcon } from '@chakra-ui/icons';

export const Room: React.FC = () => {
  const { id } = useParams();
  const { room, gameTable, isValidating } = useRoom(id);

  const renderBreadcrumb = useMemo(
    () => (
      <Breadcrumb spacing='8px' mb='3vh' separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>
            <Text color='gray.500' fontWeight={'semibold'}>
              トップ
            </Text>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>
            <Flex align={'end'}>
              <Text color='gray.500' fontWeight='semibold'>
                {room?.name}
              </Text>
              <Text color='gray.500' fontSize={'xs'}>
                （{room?.id}）
              </Text>
            </Flex>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    ),
    [room],
  );

  const renderContent = useMemo(() => {
    if (typeof room === 'undefined' || typeof gameTable === 'undefined') {
      return <></>;
    }
    switch (gameTable.status) {
      case 'WAITING':
        return <WaitingRoom room={room} game={gameTable} />;
      case 'PLAYING':
        return <PlayingRoom room={room} game={gameTable} />;
      case 'FINISHED':
        return <FinishedRoom room={room} game={gameTable} />;
    }
  }, [gameTable]);

  return (
    <>
      {room ? (
        <>
          {renderBreadcrumb}
          {renderContent}
        </>
      ) : isValidating ? (
        <Spinner />
      ) : (
        <Center height={300}>
          <Text fontSize='5xl'>ROOM NOT FOUND</Text>
        </Center>
      )}
    </>
  );
};
