import React, { useState } from "react";
import {
    Box,
    Text,
    VStack,
    Input,
    InputField,
    Button,
    HStack,
    Pressable,
    Checkbox,
    CheckboxIndicator,
    CheckboxIcon,
    CheckIcon,
    Spinner,
    Center,
    ScrollView,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";

import { useAuth } from "../../../src/hooks/useAuth";
import { useNetworkBanner } from "@/src/providers/NetworkBannerProvider";
import { LegalModal } from "@/src/components/ui/legal-modal";
import { PRIVACY_POLICY, TERMS_OF_USE } from "@/src/constants/legal";

import { AuthService } from "@/src/api/services/auth-services";
import { TokenStore } from "@/src/api/tokenStore";

export default function RegisterScreen() {
    const { width } = useWindowDimensions();
    const isTablet = width > 768;

    const router = useRouter();
    const { login } = useAuth();

    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

    const [errorText, setErrorText] = useState("");
    const { showNetworkBanner } = useNetworkBanner();

    const formatDateInput = (value: string) => {
        const numbers = value.replace(/\D/g, "");

        if (numbers.length <= 2) return numbers;

        if (numbers.length <= 4) {
            return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
        }

        return `${numbers.slice(0, 2)}.${numbers.slice(2, 4)}.${numbers.slice(
            4,
            8
        )}`;
    };

    const convertToApiDate = (date: string) => {
        const [day, month, year] = date.split(".");

        if (!day || !month || !year) return "";

        return `${year}-${month}-${day}`;
    };

    const handleRegister = async () => {
        console.log("REGISTER CLICKED");

        console.log("FORM VALUES:", {
            name,
            email,
            password,
            birthDate,
            isChecked,
        });

        const apiDate = convertToApiDate(birthDate);

        console.log("FORMATTED API DATE:", apiDate);

        if (
            !isChecked ||
            name.trim() === "" ||
            email.trim() === "" ||
            password.trim() === ""
        ) {
            console.log("VALIDATION FAILED", {
                isChecked,
                name,
                email,
                password,
            });
            setErrorText("Заполните все поля");
            return;
        }

        try {
            setIsLoading(true);
            setErrorText("");

            const payload = {
                name,
                email,
                password,
                birthdayDate: apiDate,
                privacyPolicyAccepted: true,
            };

            console.log("REGISTER REQUEST PAYLOAD:");
            console.log(JSON.stringify(payload, null, 2));

            const registerData = await AuthService.register(payload);

            console.log("REGISTER RESPONSE:");
            console.log(JSON.stringify(registerData, null, 2));

            const auth = await AuthService.login(email, password);

            console.log("LOGIN RESPONSE:");
            console.log(JSON.stringify(auth, null, 2));

            TokenStore.set(auth.accessToken);

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
            console.log("REGISTER ERROR");

            console.log(error?.response?.data || error?.message);

            const backendMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Ошибка регистрации";

            setErrorText(String(backendMessage));

            if (error.isNetworkError) {
                showNetworkBanner("Нет подключения к интернету");
                return;
            }

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
                        maxWidth={isTablet ? 500 : "100%"}
                        p={isTablet ? "$10" : "$2"}
                        bg={isTablet ? "$white" : "transparent"}
                        borderRadius={isTablet ? "$3xl" : "$0"}
                        borderWidth={isTablet ? 1 : 0}
                        borderColor="#E5E5E5"
                        shadowColor={isTablet ? "#000" : "transparent"}
                        shadowOffset={{ width: 0, height: 4 }}
                        shadowOpacity={0.05}
                        shadowRadius={10}
                        elevation={isTablet ? 2 : 0}
                    >
                        <VStack space="md">
                            {/* Кнопка назад */}
                            <Box w="$full" alignItems="flex-start">
                                <Pressable
                                    onPress={() => {
                                        if (!isLoading) router.replace("/profile");
                                    }}
                                    p="$1"
                                >
                                    <Ionicons
                                        name="chevron-back"
                                        size={isTablet ? 32 : 28}
                                        color={isLoading ? "#EEE" : "#D1D1D1"}
                                    />
                                </Pressable>
                            </Box>

                            <Text
                                fontSize={isTablet ? 40 : 30}
                                textAlign="center"
                                fontWeight="$light"
                                mb={isTablet ? 20 : 10}
                                color="#000"
                            >
                                Регистрация
                            </Text>

                            {/* Поля */}
                            {[
                                {
                                    label: "имя",
                                    val: name,
                                    set: setName,
                                },
                                {
                                    label: "дата рождения",
                                    val: birthDate,
                                    set: (text: string) =>
                                        setBirthDate(formatDateInput(text)),
                                    keyboardType: "numeric" as const,
                                    maxLength: 10,
                                    placeholder: "ДД.ММ.ГГГГ",
                                },
                                {
                                    label: "почта",
                                    val: email,
                                    set: setEmail,
                                },
                                {
                                    label: "пароль",
                                    val: password,
                                    set: setPassword,
                                    pass: true,
                                },
                            ].map((f) => (
                                <Box
                                    key={f.label}
                                    w="$full"
                                    borderWidth={2}
                                    borderColor="#CECECE"
                                    borderRadius="$xl"
                                    px="$4"
                                    py={isTablet ? "$2" : "$1"}
                                >
                                    <Text
                                        fontSize={isTablet ? 14 : 12}
                                        color="#ADADAD"
                                    >
                                        {f.label}
                                    </Text>

                                    <Input
                                        variant="underlined"
                                        borderWidth={0}
                                        h={isTablet ? 45 : 35}
                                        isDisabled={isLoading}
                                    >
                                        <InputField
                                            type={f.pass ? "password" : "text"}
                                            value={f.val}
                                            onChangeText={f.set}
                                            color="#000"
                                            fontSize={isTablet ? 18 : 16}
                                            keyboardType={f.keyboardType}
                                            maxLength={f.maxLength}
                                            placeholder={f.placeholder}
                                        />
                                    </Input>
                                </Box>
                            ))}

                            {!!errorText && (
                                <HStack
                                    w="$full"
                                    space="xs"
                                    alignItems="flex-start"
                                    mt="$2"
                                >
                                    <Ionicons
                                        name="close"
                                        size={20}
                                        color="#C25353"
                                        style={{ marginTop: 2 }}
                                    />

                                    <Text
                                        color="#000"
                                        size="sm"
                                        flexShrink={1}
                                    >
                                        {errorText}
                                    </Text>
                                </HStack>
                            )}

                            {/* Чекбокс */}
                            <HStack
                                mt="$4"
                                px="$1"
                                alignItems="flex-start"
                                space="sm"
                                opacity={isLoading ? 0.5 : 1}
                            >
                                <Checkbox
                                    value="accept"
                                    isChecked={isChecked}
                                    onChange={setIsChecked}
                                    isDisabled={isLoading}
                                    size={isTablet ? "lg" : "md"}
                                >
                                    <CheckboxIndicator
                                        mr="$2"
                                        borderColor="#CECECE"
                                        borderRadius="$full"
                                    >
                                        <CheckboxIcon
                                            as={CheckIcon}
                                            color="#C8F751"
                                        />
                                    </CheckboxIndicator>
                                </Checkbox>

                                <Text
                                    size={isTablet ? "md" : "xs"}
                                    color="#ADADAD"
                                    lineHeight={isTablet ? "$md" : "$xs"}
                                    flexShrink={1}
                                >
                                    Мною прочитаны и приняты{" "}

                                    <Text
                                        size={isTablet ? "md" : "xs"}
                                        color="#ADADAD"
                                        textDecorationLine="underline"
                                        onPress={() =>
                                            !isLoading &&
                                            setModalType("terms")
                                        }
                                    >
                                        Пользовательское соглашение
                                    </Text>

                                    {" "}и{" "}

                                    <Text
                                        size={isTablet ? "md" : "xs"}
                                        color="#ADADAD"
                                        textDecorationLine="underline"
                                        onPress={() =>
                                            !isLoading &&
                                            setModalType("privacy")
                                        }
                                    >
                                        Политику конфиденциальности
                                    </Text>
                                </Text>
                            </HStack>

                            {/* Кнопка */}
                            <Box
                                w="$full"
                                alignItems="flex-end"
                                mt={isTablet ? 30 : 20}
                            >
                                <Button
                                    w={isTablet ? 180 : 140}
                                    h={isTablet ? 70 : 60}
                                    variant="outline"
                                    borderColor={
                                        isChecked ? "#C8F751" : "#CECECE"
                                    }
                                    borderRadius="$xl"
                                    onPress={handleRegister}
                                    isDisabled={isLoading || !isChecked}
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
                    </Box>
                </Center>
            </ScrollView>

            <LegalModal
                isOpen={modalType !== null}
                onClose={() => setModalType(null)}
                title={
                    modalType === "privacy"
                        ? "Политика конфиденциальности"
                        : "Пользовательское соглашение"
                }
                content={
                    modalType === "privacy"
                        ? PRIVACY_POLICY
                        : TERMS_OF_USE
                }
            />
        </Box>
    );
}