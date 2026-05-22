import React, { useState } from "react";
import {
    Box,
    Text,
    VStack,
    Input,
    InputField,
    Button,
    FormControl,
    Pressable,
    Spinner,
    HStack,
    Center,
    ScrollView
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../src/hooks/useAuth";
import { useWindowDimensions } from "react-native";

import { AuthService } from "@/src/api/services/auth-services";
import { TokenStore } from "@/src/api/tokenStore";

export default function LoginScreen() {
    const { width } = useWindowDimensions();
    const isTablet = width > 768;

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

        if (email.trim() === "" || password.trim() === "" || !email || !password) {
            console.log("VALIDATION FAILED");
            setIsError(true);
            return;
        }

        try {
            setIsLoading(true);
            setIsError(false);

            const payload = {
                email,
                password,
            };

            console.log("LOGIN REQUEST PAYLOAD:");
            console.log(JSON.stringify(payload, null, 2));

            const auth = await AuthService.login(email, password);

            console.log("LOGIN RESPONSE:");
            console.log(JSON.stringify(auth, null, 2));

            TokenStore.set(auth.accessToken);

            console.log("TOKEN SAVED:");
            console.log(TokenStore.get());

            console.log("FETCH USER...");

            const user = await AuthService.getMe();

            console.log("GET ME RESPONSE:");
            console.log(JSON.stringify(user, null, 2));

            login({
                user: {
                    id: user.userID,
                    name: user.name,
                    email: user.email,
                    birthDate: user.birthdayDate,
                    avatarUrl: user.avatarUrl,
                },
                accessToken: auth.accessToken,
                authKey: auth.authKey,
            });

            console.log("REDIRECT TO PROFILE");

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
        <Box flex={1} bg="$backgroundLight0">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Center flex={1} px="$6" py="$10">

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

                            {/* BACK */}
                            <Box w="$full" alignItems="flex-start">
                                <Pressable onPress={() => { if (!isLoading) router.back() }}>
                                    <Ionicons
                                        name="chevron-back"
                                        size={isTablet ? 32 : 28}
                                        color={isLoading ? "#EEE" : "#D1D1D1"}
                                    />
                                </Pressable>
                            </Box>

                            {/* TITLE */}
                            <VStack space="xl" alignItems="center" w="$full">
                                <Text
                                    fontSize={isTablet ? 40 : 30}
                                    fontWeight="$light"
                                    color="#000"
                                >
                                    Вход
                                </Text>

                                {/* EMAIL */}
                                <FormControl w="$full">
                                    <Box
                                        borderWidth={2}
                                        borderColor={isError ? "#ff0000" : "#CECECE"}
                                        borderRadius="$xl"
                                        px="$4"
                                        py="$1"
                                    >
                                        <Text fontSize={isTablet ? 14 : 12} color="#ADADAD">
                                            почта
                                        </Text>

                                        <Input variant="underlined" borderWidth={0} isDisabled={isLoading}>
                                            <InputField
                                                value={email}
                                                onChangeText={(v) => {
                                                    setEmail(v);
                                                    setIsError(false);
                                                }}
                                                placeholder="yep@gmail.com"
                                                color="#000"
                                                fontSize={isTablet ? 18 : 16}
                                            />
                                        </Input>
                                    </Box>
                                </FormControl>

                                {/* PASSWORD */}
                                <FormControl w="$full">
                                    <Box
                                        borderWidth={2}
                                        borderColor={isError ? "#ff0000" : "#CECECE"}
                                        borderRadius="$xl"
                                        px="$4"
                                        py="$1"
                                    >
                                        <Text fontSize={isTablet ? 14 : 12} color="#ADADAD">
                                            пароль
                                        </Text>

                                        <Input variant="underlined" borderWidth={0} isDisabled={isLoading}>
                                            <InputField
                                                type="password"
                                                value={password}
                                                onChangeText={(v) => {
                                                    setPassword(v);
                                                    setIsError(false);
                                                }}
                                                placeholder="......"
                                                color="#000"
                                                fontSize={isTablet ? 18 : 16}
                                            />
                                        </Input>
                                    </Box>
                                </FormControl>

                                {/* ERROR */}
                                {isError && (
                                    <HStack space="xs" alignItems="center">
                                        <Ionicons name="close" size={20} color="#C25353" />
                                        <Text>Неверный логин или пароль</Text>
                                    </HStack>
                                )}

                                {/* BUTTON */}
                                <Box w="$full" alignItems="flex-end" mt={isTablet ? 30 : 20}>
                                    <Button
                                        w={isTablet ? 180 : 140}
                                        h={isTablet ? 70 : 60}
                                        borderRadius="$xl"
                                        borderColor="#CECECE"
                                        variant="outline"
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