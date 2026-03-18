import React, { useState } from "react";
import { Box, Text, Button, ButtonText, VStack, Center } from "@gluestack-ui/themed";
import AvatarIcon from "@/src/assets/images/aavatar_icon.svg";

export default function ProfileScreen() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogin = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    const handleRegister = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    return (
        <Box 
            flex={1} 
            bg="$backgroundLight0" 
            px="$9"
            justifyContent="space-between"
        >

            {/* ВЕРХ */}
            <Box mt="$20">
                <Center>
                    <VStack space="xl" alignItems="center">

                        <Box 
                            w={140} 
                            h={140} 
                            borderRadius={70}
                            borderWidth={2}
                            borderColor="#C8F751"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <AvatarIcon width={100} height={100} />
                        </Box>

                        <Text fontSize="$4xl" color="#000000" textAlign="center">
                            Здравствуйте!
                        </Text>

                        <Text
                            textAlign="center"
                            color="$textLight500"
                            fontSize="$xl"
                        >
                            Войдите или зарегистрируйтесь, чтобы сохранять любимые места
                        </Text>

                    </VStack>
                </Center>          
            </Box>

            {/* НИЗ — КНОПКИ */}
            <Box pb="$10">
                <VStack space="md" w="$full">

                    <Button
                        w="$full"
                        h={60}
                        variant="outline"
                        borderRadius="$xl"
                        borderColor="#CECECE"
                        onPress={handleLogin}
                        isDisabled={isLoading}
                        opacity={isLoading ? 0.5 : 1}
                    >
                        <ButtonText color="#000000" size="xl">
                            {isLoading ? "Загрузка..." : "Войти"}
                        </ButtonText>
                    </Button>

                    <Button
                        w="$full"
                        h={60}
                        variant="outline"
                        borderRadius="$xl"
                        borderColor="#CECECE"
                        onPress={handleRegister}
                        isDisabled={isLoading}
                        opacity={isLoading ? 0.5 : 1}
                    >
                        <ButtonText color="#000000" size="xl">
                            {isLoading ? "Загрузка..." : "Зарегистрироваться"}
                        </ButtonText>
                    </Button>

                </VStack>
            </Box>

        </Box>
    );
}