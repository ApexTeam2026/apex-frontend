import React, { useState, useEffect } from "react";
import { ScrollView, Box, Text, Button, ButtonText, VStack, HStack, Center } from "@gluestack-ui/themed";
import AppHeader from "@/src/components/app-header";
import AvatarIcon from "@/src/assets/images/aavatar_icon.svg";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { AuthService } from "@/api/services/auth-services";
import { LoadingOverlay } from "@/src/components/ui/loading-overlay";

export default function ProfileScreen() {
    const { width } = useWindowDimensions();
    const isTablet = width > 768;
    const { user, logout } = useAuth();
    const router = useRouter();

    const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);
    const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

    const handleLogin = () => {
        router.push("/(auth)/login");
    };

    const handleRegister = () => {
        router.push("/(auth)/register");
    };

    const handleLogout = async () => {
        setIsActionLoading(true);

        setTimeout(async () => {
            await logout();
            setIsActionLoading(false);
            setShowLogoutConfirm(false);
            router.replace("/(tabs)/profile");
        }, 800);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "Дата не указана";

        const date = new Date(dateString);

        return date.toLocaleDateString("ru-RU");
    };

    if (user === undefined) {
        return (
            <Box flex={1} bg="$backgroundLight0">
                <LoadingOverlay />
            </Box>
        );
    }

    if (user) {
        return (
            <Box flex={1} bg="$backgroundLight0">
                {isActionLoading && <LoadingOverlay message="Выходим из аккаунта..." />}

                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
                    <Box flex={1} px="$6" position="relative">
                        {/* Кнопка выхода в правом верхнем углу */}
                        <Box position="absolute" top={40} right={20} zIndex={10}>
                            <Button
                                borderRadius="$full"
                                size="lg"
                                variant="outline"
                                borderColor="#C8F751"
                                bg="white"
                                onPress={() => setShowLogoutConfirm(true)}
                            >
                                <Ionicons name="log-out-outline" size={24} color="#C8F751" />
                            </Button>
                        </Box>

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

                                    {/* Данные пользователя */}
                                    <Text fontSize="$2xl" fontWeight="$bold">
                                        {user?.name || "Загрузка..."}
                                    </Text>

                                    <Text color="$textLight500">
                                        {formatDate(user?.birthDate)}
                                    </Text>

                                    <Text color="$textLight500">
                                        {user?.email || ""}
                                    </Text>

                                    {/* Кнопки действий */}
                                    <VStack space="md" w="$full" mt="$8" alignItems="center">
                                        <Box
                                            flexDirection={isTablet ? "row" : "column"}
                                            w="$full"
                                            maxWidth={isTablet ? 800 : "100%"}
                                            style={{ gap: 15 }}
                                            alignSelf="center"
                                        >
                                            {/* Кнопка: Избранные */}
                                            <Button
                                                flex={1}
                                                h={isTablet ? 80 : 60}
                                                variant="outline"
                                                borderRadius="$xl"
                                                borderColor="#CECECE"
                                                px="$5"
                                                onPress={() => router.push("/favorites")}
                                            >
                                                <HStack justifyContent="space-between" alignItems="center" w="$full">
                                                    <ButtonText color="#000000" size={isTablet ? "xl" : "lg"}>
                                                        Избранные
                                                    </ButtonText>
                                                    <Ionicons
                                                        name="heart-outline"
                                                        size={isTablet ? 30 : 24}
                                                        color="#C8F751"
                                                    />
                                                </HStack>
                                            </Button>

                                            {/* Кнопка: Посещенные */}
                                            <Button
                                                flex={1}
                                                h={isTablet ? 80 : 60}
                                                variant="outline"
                                                borderRadius="$xl"
                                                borderColor="#CECECE"
                                                px="$5"
                                                onPress={() => router.push("/visited")}
                                            >
                                                <HStack justifyContent="space-between" alignItems="center" w="$full">
                                                    <ButtonText color="#000000" size={isTablet ? "xl" : "lg"}>
                                                        Посещенные
                                                    </ButtonText>
                                                    <Ionicons
                                                        name="star-outline"
                                                        size={isTablet ? 30 : 24}
                                                        color="#C8F751"
                                                    />
                                                </HStack>
                                            </Button>
                                        </Box>
                                    </VStack>
                                </VStack>
                            </Center>
                        </Box>
                    </Box>
                </ScrollView>

                {/* Современное всплывающее окно подтверждения выхода */}
                {showLogoutConfirm && (
                    <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        bg="white"
                        borderTopLeftRadius={30}
                        borderTopRightRadius={30}
                        p="$6"
                        shadowColor="#000"
                        shadowOffset={{ width: 0, height: -2 }}
                        shadowOpacity={0.1}
                        shadowRadius={10}
                        elevation={5}
                    >
                        {/* Стрелка < в левом верхнем углу */}
                        {/* Стрелка назад в левом верхнем углу */}
                        <Button
                            position="absolute"
                            top={12}
                            left={12}
                            p="$1"
                            onPress={() => setShowLogoutConfirm(false)}
                            bg="transparent"
                        >
                            <Text
                                fontSize="$6xl"
                                color="#BDBDBD"
                                fontWeight="$300"
                                lineHeight="$2xl"
                            >
                                ‹
                            </Text>
                        </Button>

                        {/* Иконка выхода */}
                        <Box
                            alignSelf="center"
                            bg="#FFF5F5"
                            w={70}
                            h={70}
                            borderRadius="$full"
                            justifyContent="center"
                            alignItems="center"
                            mb="$4"
                        >
                            <Ionicons name="log-out-outline" size={32} color="#ff0000" />
                        </Box>

                        {/* Заголовок */}
                        <Text
                            fontSize="$2xl"
                            fontWeight="$bold"
                            textAlign="center"
                            mb="$2"
                            color="#000000"
                        >
                            Выход из аккаунта
                        </Text>

                        {/* Текст подтверждения */}
                        <Text
                            fontSize="$md"
                            textAlign="center"
                            color="#666666"
                            mb="$6"
                            px="$4"
                        >
                            Вы действительно хотите выйти?
                        </Text>

                        {/* Кнопки действий */}
                        <VStack space="md" w="$full">
                            {/* Кнопка "Выйти" с красным контуром */}
                            <Button
                                variant="outline"
                                borderColor="#ff0000"
                                borderRadius="$xl"
                                h={50}
                                bg="white"
                                onPress={handleLogout}
                            >
                                <ButtonText color="#ff0000" fontSize="$lg" fontWeight="$semibold">
                                    Выйти
                                </ButtonText>
                            </Button>
                        </VStack>
                    </Box>
                )}
            </Box>
        );
    }

    // ГОСТЬ 
    return (
        <Box flex={1} bg="$backgroundLight0">
            {isActionLoading && <LoadingOverlay />}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Box
                    px="$9"
                    position="relative"
                    justifyContent="space-between"
                    flex={1}
                    py="$10"
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
                                    //fontWeight="$bold"
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
            </ScrollView>
        </Box>
    );
}