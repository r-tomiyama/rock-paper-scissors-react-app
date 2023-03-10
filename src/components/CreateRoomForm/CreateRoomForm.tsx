import React, { useCallback, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { usePlayer } from '@/providers/PlayerProvider';
import { useCreateRoom } from './hooks';

type FormInputs = {
  userName: string;
  roomName: string;
};

export const CreateRoomForm: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { player, setName } = usePlayer();
  const { register, handleSubmit, formState, reset, setValue } = useForm<FormInputs>({
    mode: 'onChange',
  });
  const { trigger, isMutating } = useCreateRoom();

  useEffect(() => {
    if (player.name) {
      setValue('userName', player.name);
    }
  }, [player]);

  const cancel = useCallback(() => {
    reset();
    onClose();
  }, []);

  const submit = async (data: FormInputs) => {
    setName(data.userName);
    await trigger({ room: { name: data.roomName }, playerId: player.id }).then((roomId) => {
      if (roomId) navigate(`/rooms/${roomId}`);
    });
  };

  return (
    <>
      <Button onClick={onOpen} size='lg' colorScheme='blue' py='6vh' borderRadius={'6vh'}>
        ルームを作ってじゃんけんする！
      </Button>

      <Modal isOpen={isOpen} onClose={cancel} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(submit)}
          >
            <ModalHeader>じゃんけんルームを作る!</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <FormControl pb='5vh'>
                <FormLabel>ルーム名</FormLabel>
                <Input
                  placeholder='ルーム名'
                  {...register('roomName', {
                    required: '入力が必須の項目です。',
                    maxLength: { value: 50, message: `${50}文字以内にしてください。` },
                  })}
                />
                <Text color='red'>{formState.errors.roomName?.message}</Text>
              </FormControl>
              <FormControl pb='5vh'>
                <FormLabel>ユーザーネーム</FormLabel>
                <Input
                  placeholder='ユーザーネーム'
                  {...register('userName', {
                    required: '入力が必須の項目です。',
                    maxLength: { value: 15, message: `${15}文字以内にしてください。` },
                  })}
                />
                <Text color='red'>{formState.errors.userName?.message}</Text>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme='blue'
                mr={3}
                type='submit'
                disabled={!formState.isValid}
                isLoading={formState.isSubmitting || isMutating}
              >
                作成
              </Button>
              <Button mr={3} onClick={cancel}>
                戻る
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
