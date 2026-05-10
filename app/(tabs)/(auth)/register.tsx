import React, { useState } from "react";
import {
    Box, Text, VStack, Input, InputField, Button, HStack, Pressable,
    Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon, Spinner
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../src/hooks/useAuth";
import { LegalModal } from "@/src/components/ui/legal-modal";
import { PRIVACY_POLICY, TERMS_OF_USE } from "@/src/constants/legal";
import { AuthService } from "@/src/api/services/auth-services";
import { TokenStore } from "@/src/api/tokenStore";

export default function RegisterScreen() {
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

    const formatDateInput = (value: string) => {
        const numbers = value.replace(/\D/g, "");

        if (numbers.length <= 2) return numbers;
        if (numbers.length <= 4)
            return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;

        return `${numbers.slice(0, 2)}.${numbers.slice(2, 4)}.${numbers.slice(4, 8)}`;
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

        if (!isChecked || name.trim() === "" || email.trim() === "" || password.trim() === "") {
            console.log("VALIDATION FAILED", {
                isChecked,
                name,
                email,
                password,
            });
            setErrorText("Заполните все поля");
            return;
        }

        console.log("CALLING API...");

        try {
            setIsLoading(true);

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

            console.log("LOGIN AFTER REGISTER...");

            const auth = await AuthService.login(email, password);
            console.log("LOGIN RESPONSE:");
            console.log(JSON.stringify(auth, null, 2));

            TokenStore.set(auth.accessToken);

            console.log("TOKEN SAVED:");

            console.log("FETCH USER...");

            const user = await AuthService.getMe();

            console.log("GET ME RESPONSE:");
            console.log(JSON.stringify(user, null, 2));

            login({
                user: {
                    name: user.name,
                    email: user.email,
                    birthDate: user.birthdayDate,
                    avatarUrl: user.avatarUrl,
                },
                accessToken: registerData.accessToken,
                authKey: registerData.authKey,
            });

            console.log("REDIRECT TO PROFILE");

            router.replace("/profile");

        } catch (error: any) {
            console.log("REGISTER ERROR");

            console.log("MESSAGE:");
            console.log(error?.message);

            console.log("STATUS:");
            console.log(error?.response?.status);

            console.log("RESPONSE DATA:");
            console.log(
                JSON.stringify(error?.response?.data, null, 2)
            );

            console.log("FULL ERROR:");
            console.log(error);

            const backendMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Ошибка регистрации";

            setErrorText(String(backendMessage));
        } finally {
            console.log("========== REGISTER END ==========");
            setIsLoading(false);
        }
    };

    return (
        <Box flex={1} bg="$backgroundLight0" px="$10" pt="$20">
            {/* Кнопка Назад */}
            <Pressable onPress={() => { if (!isLoading) router.back() }} mb="$5">
                <Ionicons name="chevron-back" size={28} color={isLoading ? "#EEE" : "#D1D1D1"} />
            </Pressable>

            <VStack space="md" alignItems="center">
                <Text fontSize="$3xl" fontWeight="$light" mb="$5" color="#000">Регистрация</Text>

                {/* Поля регистрации */}
                {[
                    { label: "имя", val: name, set: setName },
                    {
                        label: "дата рождения",
                        val: birthDate,
                        set: (text: string) =>
                            setBirthDate(formatDateInput(text)),
                        keyboardType: "numeric",
                        maxLength: 10,
                        placeholder: "ДД.ММ.ГГГГ",
                    },
                    { label: "почта", val: email, set: setEmail },
                    { label: "пароль", val: password, set: setPassword, pass: true },
                ].map((f) => (
                    <Box key={f.label} w="$full" borderWidth={1} borderColor="#CECECE" borderRadius="$xl" px="$4" py="$1">
                        <Text fontSize="$xs" color="#ADADAD">{f.label}</Text>
                        <Input variant="underlined" borderWidth={0} h={35} isDisabled={isLoading}>
                            <InputField
                                type={f.pass ? "password" : "text"}
                                value={f.val}
                                onChangeText={f.set}
                                color="#000"
                            />
                        </Input>
                    </Box>
                ))}

                {!!errorText && (
                    <HStack w="$full" space="xs" alignItems="flex-start" mt="$2">
                        <Ionicons name="close" size={20} color="#C25353" style={{ marginTop: 2 }} />
                        <Text color="#000" size="sm" flexShrink={1}>
                            {errorText}
                        </Text>
                    </HStack>
                )}

                {/* Чекбокс согласия */}
                <HStack mt="$4" px="$1" alignItems="flex-start" space="sm" opacity={isLoading ? 0.5 : 1}>
                    <Checkbox
                        value="accept"
                        size="md"
                        isChecked={isChecked}
                        onChange={setIsChecked}
                        isDisabled={isLoading}
                    >
                        <CheckboxIndicator mr="$2" borderColor="#CECECE" borderRadius="$full">
                            <CheckboxIcon as={CheckIcon} color="#C8F751" />
                        </CheckboxIndicator>
                    </Checkbox>

                    <Text size="xs" color="#ADADAD" lineHeight="$xs" flexShrink={1}>
                        Мною прочитаны и приняты{" "}

                        <Text
                            size="xs"
                            color="#ADADAD"
                            textDecorationLine="underline"
                            onPress={() => !isLoading && setModalType("terms")}
                        >
                            Пользовательское соглашение
                        </Text>

                        {" "}и{" "}

                        <Text
                            size="xs"
                            color="#ADADAD"
                            textDecorationLine="underline"
                            onPress={() => !isLoading && setModalType("privacy")}
                        >
                            Политику конфиденциальности
                        </Text>
                    </Text>
                </HStack>

                {/* Кнопка Далее */}
                <Box w="$full" alignItems="flex-end" mt="$8">
                    <Button
                        w={140} h={60}
                        variant="outline"
                        borderColor={isChecked ? "#C8F751" : "#CECECE"}
                        borderRadius="$xl"
                        onPress={handleRegister}
                        isDisabled={isLoading || !isChecked}
                    >
                        {isLoading ? (
                            <Spinner color="#C8F751" />
                        ) : (
                            <Ionicons name="chevron-forward" size={30} color="#D1D1D1" />
                        )}
                    </Button>
                </Box>

            </VStack>

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