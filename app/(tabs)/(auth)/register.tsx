import React, { useState } from "react";
import {
    Box, Text, VStack, Input, InputField, Button, HStack, Pressable,
    Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon, Spinner, Center, ScrollView
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../../src/hooks/useAuth";
import { LegalModal } from "@/src/components/ui/legal-modal";
import { PRIVACY_POLICY, TERMS_OF_USE } from "@/src/constants/legal";
import { useWindowDimensions } from "react-native";
export default function RegisterScreen() {
    const { width } = useWindowDimensions();
    const isTablet = width > 768;
    const router = useRouter();
    const { login } = useAuth();

    const [name, setName] = useState("Иван");
    const [birthDate, setBirthDate] = useState("11.11.2011");
    const [email, setEmail] = useState("yep@gmail.com");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

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
        <Box flex={1} bg="$backgroundLight0">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Center flex={1} px="$6" py="$10">
                    {/* Основной контейнер формы */}
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
                            {/* Кнопка Назад */}
                            <Box w="$full" alignItems="flex-start">
                                <Pressable
                                    onPress={() => { if (!isLoading) router.back() }}
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

                            {/* Поля регистрации */}
                            {[
                                { label: "имя", val: name, set: setName },
                                { label: "дата рождения", val: birthDate, set: setBirthDate },
                                { label: "почта", val: email, set: setEmail },
                                { label: "пароль", val: password, set: setPassword, pass: true },
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
                                    <Text fontSize={isTablet ? 14 : 12} color="#ADADAD">{f.label}</Text>
                                    <Input variant="underlined" borderWidth={0} h={isTablet ? 45 : 35} isDisabled={isLoading}>
                                        <InputField
                                            type={f.pass ? "password" : "text"}
                                            value={f.val}
                                            onChangeText={f.set}
                                            color="#000"
                                            fontSize={isTablet ? 18 : 16}
                                        />
                                    </Input>
                                </Box>
                            ))}

                            {/* Чекбокс согласия */}
                            <HStack mt="$4" px="$1" alignItems="flex-start" space="sm" opacity={isLoading ? 0.5 : 1}>
                                <Checkbox
                                    value="accept"
                                    isChecked={isChecked}
                                    onChange={setIsChecked}
                                    isDisabled={isLoading}
                                    size={isTablet ? "lg" : "md"}
                                >
                                    <CheckboxIndicator mr="$2" borderColor="#CECECE" borderRadius="$full">
                                        <CheckboxIcon as={CheckIcon} color="#C8F751" />
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
                                        onPress={() => !isLoading && setModalType("terms")}
                                    >
                                        Пользовательское соглашение
                                    </Text>
                                    {" "}и{" "}
                                    <Text
                                        size={isTablet ? "md" : "xs"}
                                        color="#ADADAD"
                                        textDecorationLine="underline"
                                        onPress={() => !isLoading && setModalType("privacy")}
                                    >
                                        Политику конфиденциальности
                                    </Text>
                                </Text>
                            </HStack>

                            {/* Кнопка Далее */}
                            <Box w="$full" alignItems="flex-end" mt={isTablet ? 30 : 20}>
                                <Button
                                    w={isTablet ? 180 : 140}
                                    h={isTablet ? 70 : 60}
                                    variant="outline"
                                    borderColor="#CECECE"
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