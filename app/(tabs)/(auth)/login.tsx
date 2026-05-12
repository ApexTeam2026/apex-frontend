import React, { useState } from "react";
import {
    Box, Text, VStack, Input, InputField, Button, FormControl, Pressable, Spinner, HStack, Center, ScrollView
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../src/hooks/useAuth";
import { useWindowDimensions } from "react-native";
export default function LoginScreen() {
    const { width } = useWindowDimensions();
    const isTablet = width > 768;
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        if (email.trim() === "" || password.trim() === "") {
            setIsError(true);
            return;
        }

        setIsLoading(true);
        setIsError(false);

        // Имитация ответа сервера (Заглушка)
        setTimeout(() => {
            login({
                name: "Иван",
                email: email,
                birthDate: "11.11.2011"
            });
            router.replace("/profile");
        }, 1200);
    };

    return (
        <Box flex={1} bg="$backgroundLight0">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Center flex={1} px="$6" py="$10">
                    {/* Используем Box для ограничения ширины и стилизации карточки */}
                    <Box
                        w="$full"
                        maxWidth={isTablet ? 480 : "100%"}
                        p={isTablet ? "$10" : "$2"}
                        bg={isTablet ? "$white" : "transparent"}
                        borderRadius={isTablet ? "$3xl" : "$0"}
                        borderWidth={isTablet ? 1 : 0}
                        borderColor="#E5E5E5"
                    >
                        <VStack space="xl">
                            <Box w="$full" alignItems="flex-start">
                                <Pressable onPress={() => { if (!isLoading) router.back() }}>
                                    <Ionicons
                                        name="chevron-back"
                                        size={isTablet ? 32 : 28}
                                        color={isLoading ? "#EEE" : "#D1D1D1"}
                                    />
                                </Pressable>
                            </Box>

                            <VStack space="xl" alignItems="center" w="$full">
                                <Text
                                    fontSize={isTablet ? 40 : 30}
                                    fontWeight="$light"
                                    mb={isTablet ? 20 : 10}
                                    color="#000"
                                >
                                    Вход
                                </Text>

                                <FormControl w="$full">
                                    <Box
                                        borderWidth={2}
                                        borderColor={isError ? "#ff0000" : "#CECECE"}
                                        borderRadius="$xl"
                                        px="$4"
                                        py={isTablet ? "$2" : "$1"}
                                    >
                                        <Text fontSize={isTablet ? 14 : 12} color="#ADADAD">почта</Text>
                                        <Input variant="underlined" borderWidth={0} h={isTablet ? 45 : 35} isDisabled={isLoading}>
                                            <InputField
                                                value={email}
                                                onChangeText={(v) => { setEmail(v); setIsError(false); }}
                                                placeholder="yep@gmail.com"
                                                color="#000"
                                                fontSize={isTablet ? 18 : 16}
                                            />
                                        </Input>
                                    </Box>
                                </FormControl>

                                <FormControl w="$full">
                                    <Box
                                        borderWidth={2}
                                        borderColor={isError ? "#ff0000" : "#CECECE"}
                                        borderRadius="$xl"
                                        px="$4"
                                        py={isTablet ? "$2" : "$1"}
                                    >
                                        <Text fontSize={isTablet ? 14 : 12} color="#ADADAD">пароль</Text>
                                        <Input variant="underlined" borderWidth={0} h={isTablet ? 45 : 35} isDisabled={isLoading}>
                                            <InputField
                                                type="password"
                                                value={password}
                                                onChangeText={(v) => { setPassword(v); setIsError(false); }}
                                                placeholder="......"
                                                color="#000"
                                                fontSize={isTablet ? 18 : 16}
                                            />
                                        </Input>
                                    </Box>
                                </FormControl>

                                <Box w="$full" alignItems="flex-end" mt={isTablet ? 30 : 20}>
                                    <Button
                                        w={isTablet ? 180 : 140}
                                        h={isTablet ? 70 : 60}
                                        variant="outline"
                                        borderColor="#CECECE"
                                        borderRadius="$xl"
                                        onPress={handleLogin}
                                        isDisabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <Spinner color="#C8F751" />
                                        ) : (
                                            <Ionicons
                                                name="chevron-forward"
                                                size={isTablet ? 36 : 30}
                                                color="#D1D1D1"
                                            />
                                        )}
                                    </Button>
                                </Box>
                            </VStack>
                        </VStack>
                    </Box>
                </Center>
            </ScrollView>
        </Box>
    );
}