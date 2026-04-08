import React, { useState, useEffect } from "react";
import { Box, Text, Button, ButtonText, VStack, HStack, Center } from "@gluestack-ui/themed";
import AppHeader from "@/src/components/app-header";
import BackgroundBear from "@/src/components/background-bear";
import AvatarIcon from "@/src/assets/images/aavatar_icon.svg";

import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUser] = useState<any>(null); // имитация данных с бэка

    const handleLogin = () => {
        router.push("/(tabs)/(auth)/login");
    };

    const handleRegister = () => {
        router.push("/(tabs)/(auth)/register");
    };

    if (user === undefined) return null;

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                setUser({
                    name: "Иван",
                    birthDate: "11.11.2011",
                    email: "yep@gmail.com",
                });
            }, 800);
        }
    }, [user]);

    // ЕСЛИ ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН
    if (user) {

        return (
            <Box 
            flex={1} 
            bg="$backgroundLight0" 
            px="$6"
        >
            {/* Сдвиг вниз */}
            <Box mt="$20">
                <Center>
                    <VStack space="lg" alignItems="center" w="$full">

                        {/* Аватар */}
                        <Box 
                            w={120} 
                            h={120} 
                            borderRadius={60}
                            borderWidth={2}
                            borderColor="#C8F751"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <AvatarIcon width={80} height={80} />
                        </Box>

                        {/* Данные с бэка */}
                        <Text fontSize="$2xl">
                            {userData ? userData.name : "Загрузка..."}
                        </Text>

                        <Text color="$textLight500">
                            {userData ? userData.birthDate : ""}
                        </Text>

                        <Text color="$textLight500">
                            {userData ? userData.email : ""}
                        </Text>

                        {/* Кнопки */}
                        <VStack space="md" w="$full" mt="$8">

                        {/* Избранные */}
                            <Button
                                w="$full"
                                h={60}
                                variant="outline"
                                borderRadius="$xl"
                                borderColor="#CECECE"
                                px="$5"
                                onPress={() => console.log("Избранные")}
                            >
                                <HStack justifyContent="space-between" alignItems="center" w="$full">
        
                                <ButtonText color="#000000" size="xl">
                                Избранные
                                </ButtonText>

                                <Ionicons 
                                name="heart-outline" 
                                size={24} 
                                color="#C8F751" 
                                />
        
                                </HStack>
                            </Button>

                        {/* Посещенные */}
                                <Button
                                    w="$full"
                                    h={60}
                                    variant="outline"
                                    borderRadius="$xl"
                                    borderColor="#CECECE"
                                    px="$5"
                                    onPress={() => console.log("Посещенные")}
                                >
                                    <HStack justifyContent="space-between" alignItems="center" w="$full">
                                        <ButtonText color="#000000" size="xl">
                                            Посещенные
                                        </ButtonText>
                                        <Ionicons 
                                        name="star-outline" 
                                        size={24} 
                                        color="#C8F751" 
                                        />
                                    </HStack>
                                </Button>
                            </VStack>
                        </VStack>
                    </Center>
                </Box>
            </Box>
        );
    }

    // ГОСТЬ 
    return (
        <Box 
            flex={1} 
            bg="$backgroundLight0" 
            px="$9"  
            position="relative"
            justifyContent="space-between"
        >
            <AppHeader />

            <Box mt="$4" mb="$10">
                <Center>
                    <Box
                        w="100%"
                        maxWidth={340}
                        borderRadius="$2xl"
                        alignItems="center"
                    >
                        <VStack space="xl" alignItems="center">
                            <Box 
                                w={120} 
                                h={120} 
                                borderRadius={60}
                                overflow="hidden"
                                mb="$4"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <AvatarIcon width={100} height={100} />
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
                                {/* Вход */}
                                <Button
                                    variant="outline"
                                    borderRadius="$lg"
                                    size="lg"
                                    borderColor="#CECECE"
                                    onPress={handleLogin}
                                >
                                    <ButtonText color="#000000" size="xl">
                                        Войти
                                    </ButtonText>
                                </Button>

                                {/* Регистрация */}
                                <Button
                                    variant="outline"
                                    borderRadius="$lg"
                                    size="lg"
                                    borderColor="#CECECE"
                                    onPress={handleRegister}
                                >
                                    <ButtonText color="#000000" size="xl">
                                        Зарегистрироваться
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