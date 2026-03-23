import React, { useState } from "react";
import {
    Box, Text, VStack, Input, InputField, Button, HStack, Pressable,
    Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon, Spinner
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../src/hooks/useAuth";

export default function RegisterScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const [name, setName] = useState("Иван");
    const [birthDate, setBirthDate] = useState("11.11.2011");
    const [email, setEmail] = useState("yep@gmail.com");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = () => {
        if (!isChecked || name === "" || email === "" || password === "") return;

        setIsLoading(true);

        // Имитация создания пользователя (Заглушка)
        setTimeout(() => {
            login({
                name: name,
                email: email,
                birthDate: birthDate
            });
            router.replace("/profile");
        }, 1500);
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
                    { label: "дата рождения", val: birthDate, set: setBirthDate },
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
                        Мною прочитаны и приняты <Text size="xs" color="#E2F9A3">Пользовательское соглашение</Text> и <Text size="xs" color="#E2F9A3">Политику конфиденциальности</Text>
                    </Text>
                </HStack>

                {/* Кнопка Далее */}
                <Box w="$full" alignItems="flex-end" mt="$8">
                    <Button
                        w={140} h={60}
                        variant="outline"
                        borderColor="#CECECE"
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
        </Box>
    );
}