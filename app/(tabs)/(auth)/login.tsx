import React, { useState } from "react";
import {
    Box, Text, VStack, Input, InputField, Button, FormControl, Pressable, Spinner, HStack
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../src/hooks/useAuth";
import { AuthService } from "@/src/api/services/auth-services";

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {

    console.log("LOGIN CLICKED");

    console.log("FORM VALUES:", {
        email,
        password,
    });

    if (email.trim() === "" || password.trim() === "") {
        console.log("VALIDATION FAILED");
        setIsError(true);
        return;
    }

    try {
        setIsLoading(true);

        const payload = {
            email,
            password,
        };

        console.log("LOGIN REQUEST PAYLOAD:");
        console.log(JSON.stringify(payload, null, 2));

        const data = await AuthService.login(email, password);

        console.log("LOGIN RESPONSE:");
        console.log(JSON.stringify(data, null, 2));

        console.log("ACCESS TOKEN:", data.accessToken);
        console.log("AUTH KEY:", data.authKey);

        // TODO: доделать логин, после входа нет данных о пользователе
        login({
            user: {
                name: data.name,
                email: data.email,
                birthDate: data.birthdayDate,
            },
            accessToken: data.accessToken,
            authKey: data.authKey,
        });

        console.log("TOKEN SAVED, GO TO PROFILE");

        router.replace("/profile");

    } catch (error: any) {

        console.log("LOGIN ERROR:");
        console.log(error?.response?.data || error.message);

        setIsError(true);

    } finally {
        setIsLoading(false);
    }
};

    return (
        <Box flex={1} bg="$backgroundLight0" px="$10" pt="$20">
            {/* Кнопка Назад */}
            <Pressable onPress={() => { if (!isLoading) router.back() }} mb="$10">
                <Ionicons name="chevron-back" size={28} color={isLoading ? "#EEE" : "#D1D1D1"} />
            </Pressable>

            <VStack space="xl" alignItems="center">
                <Text fontSize="$3xl" fontWeight="$light" mb="$8" color="#000">Вход</Text>

                {/* Поле Почта */}
                <FormControl w="$full">
                    <Box
                        borderWidth={2}
                        borderColor={isError ? "#ff0000" : "#CECECE"}
                        borderRadius="$xl"
                        px="$4" py="$1"
                    >
                        <Text fontSize="$xs" color="#ADADAD">почта</Text>
                        <Input variant="underlined" borderWidth={0} h={35} isDisabled={isLoading}>
                            <InputField
                                value={email}
                                onChangeText={(v) => { setEmail(v); setIsError(false); }}
                                placeholder="yep@gmail.com"
                                color="#000"
                            />
                        </Input>
                    </Box>
                </FormControl>

                {/* Поле Пароль */}
                <FormControl w="$full">
                    <Box
                        borderWidth={2}
                        borderColor={isError ? "#ff0000" : "#CECECE"}
                        borderRadius="$xl"
                        px="$4" py="$1"
                    >
                        <Text fontSize="$xs" color="#ADADAD">пароль</Text>
                        <Input variant="underlined" borderWidth={0} h={35} isDisabled={isLoading}>
                            <InputField
                                type="password"
                                value={password}
                                onChangeText={(v) => { setPassword(v); setIsError(false); }}
                                placeholder="......"
                                color="#000"
                            />
                        </Input>
                    </Box>
                </FormControl>

                {/* --- СООБЩЕНИЕ ОБ ОШИБКЕ --- */}
                
                {isError && (
                    <HStack space="xs" alignItems="center" mt="$2">
                        <Ionicons name="close" size={20} color="#C25353" />
                        <Text color="#000" size="sm">Неверный логин или пароль</Text>
                    </HStack>
                )}
               
                {/* Кнопка Далее */}
                <Box w="$full" alignItems="flex-end" mt="$10">
                    <Button
                        w={140} h={60}
                        variant="outline"
                        borderColor="#CECECE"
                        borderRadius="$xl"
                        onPress={handleLogin}
                        isDisabled={isLoading}
                    >
                        {isLoading ? (
                            <Spinner color="#C8F751" />
                        ) : (
                            <Ionicons name="chevron-forward" size={30} color="#D1D1D1" />
                        )}
                    </Button>
                </Box>
            </VStack>
        </Box>
    );
}