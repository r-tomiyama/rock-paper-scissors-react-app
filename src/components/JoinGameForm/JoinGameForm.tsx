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
import { useForm } from 'react-hook-form';

import { usePlayer } from '@/providers/PlayerProvider';
import { useJoinGame } from './hooks';
import { Game } from '@/pages/Room/hooks/useRoom/types';

type Prop = {
  roomId: string;
  playingGame: Game;
};

type FormInputs = {
  userName: string;
};

export const JoinGameForm: React.FC<Prop> = ({ roomId, playingGame }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { player, setName } = usePlayer();
  const { register, handleSubmit, formState, reset, setValue } = useForm<FormInputs>({
    mode: 'onChange',
  });
  const { trigger, isMutating } = useJoinGame();

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
    await trigger({ roomId: roomId, playerId: player.id, historyId: playingGame.id });
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} size='lg' colorScheme='blue' py='6vh' borderRadius={'6vh'}>
        じゃんけんに参加する！
      </Button>

      <Modal isOpen={isOpen} onClose={cancel} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(submit)}
          >
            <ModalHeader>じゃんけんをする!</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
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
                参加
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
