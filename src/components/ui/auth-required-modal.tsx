import React from "react";

import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  ButtonText,
  Text,
  VStack,
  HStack,
} from "@gluestack-ui/themed";

import { Ionicons } from "@expo/vector-icons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onLoginPress: () => void;
};

export function AuthRequiredModal({
  isOpen,
  onClose,
  onLoginPress,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />

      <ModalContent
        borderRadius="$3xl"
        px="$2"
        py="$4"
        bg="$white"
      >
        <ModalBody>

          <VStack space="lg" alignItems="center">

            <Ionicons
              name="lock-closed-outline"
              size={42}
              color="#C8F751"
            />

            <Text
              fontSize="$xl"
              fontWeight="$bold"
              textAlign="center"
              color="$black"
            >
              Требуется авторизация
            </Text>

            <Text
              textAlign="center"
              color="$coolGray600"
              lineHeight="$md"
            >
              Войдите в аккаунт, чтобы
              добавлять места в избранное
            </Text>

          </VStack>

        </ModalBody>

        <ModalFooter mt="$4">

          <HStack w="$full" space="md">

            <Button
              flex={1}
              variant="outline"
              borderColor="$coolGray300"
              borderRadius="$xl"
              onPress={onClose}
            >
              <ButtonText color="$black">
                Позже
              </ButtonText>
            </Button>

            <Button
              flex={1}
              bg="#C8F751"
              borderRadius="$xl"
              onPress={onLoginPress}
            >
              <ButtonText color="$black">
                Войти
              </ButtonText>
            </Button>

          </HStack>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}