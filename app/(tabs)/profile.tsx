import React, { useState } from "react";
import { Box, Text, Button, ButtonText, VStack, Center } from "@gluestack-ui/themed";
import AppHeader from "@/src/components/app-header";
import BackgroundBear from "@/src/components/background-bear";
import AvatarIcon from "@/src/assets/images/aavatar_icon.svg";

export default function ProfileScreen() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogin = () => {
        setIsLoading(true);
        // Имитация запроса к бэкенду
        setTimeout(() => {
            setIsLoading(false);
            // Здесь будет логика входа
        }, 1000);
    };

    const handleRegister = () => {
        setIsLoading(true);
        // Имитация запроса к бэкенду
        setTimeout(() => {
            setIsLoading(false);
            // Здесь будет логика регистрации
        }, 1000);
    };

    return (
        <Box 
            flex={1} 
            bg="$backgroundLight0" 
            px="$9"  
            position="relative"
            justifyContent="space-between"
        >
            <BackgroundBear />
            <AppHeader />

            <Box mt="$4" mb="$10">
                <Center>
                    <Box
                        w="100%"
                        maxWidth={340}
                        borderRadius="$2xl"
                        alignItems="center"
                    >
                        <VStack 
                            space="xl" 
                            alignItems="center"
                        >
                            <Box 
                                w={120} 
                                h={120} 
                                borderRadius={60}
                                overflow="hidden"
                                mb="$4"
                                justifyContent="center"
                                alignItems="center"
                            >
                              <AvatarIcon 
                              width={100} 
                              height={100} />
                            </Box>

                            <Text 
                                fontSize="$4xl" 
                                mb="$4" 
                                color="#000000" 
                                textAlign="center"
                            >
                                Здравствуйте!
                            </Text>

                            <Text
                                textAlign="center"
                                color="$textLight500"
                                fontSize="$xl"
                                mb="$8"
                            >
                                Войдите или зарегистрируйтесь, чтобы сохранять любимые места
                            </Text>

                                <VStack space="md" w="$full">
                                {/* Кнопка входа */}
                                <Button
                                variant="outline"
                                borderRadius="$lg"
                                size="lg"
                                borderColor="#CECECE"
                                onPress={handleLogin}
                                isDisabled={isLoading}
                                opacity={isLoading ? 0.5 : 1} // эффект "затемнения" при загрузке
                                >
                                <ButtonText color="#000000" size="xl">
                                {isLoading ? "Загрузка..." : "Войти"}
                                </ButtonText>
                                </Button>

                                {/* Кнопка регистрации */}
                                <Button
                                variant="outline"
                                borderRadius="$lg"
                                size="lg"
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
                        </VStack>
                    </Box>
                </Center>          
            </Box>

            <Box pb="$10" />
        </Box>     
    );
}