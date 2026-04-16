import React from "react";
import { Box, Text, Button, ButtonText, Center, VStack } from "@gluestack-ui/themed";
import { router } from "expo-router";

export default function VisitedScreen() {
    return (
        <Box flex={1} bg="$backgroundLight0" px="$6" justifyContent="space-between">
            
            {/* Заголовок */}
            <Text mt="$20" fontSize="$2xl">
                Посещенные
            </Text>

            {/* Пустое состояние */}
            <Center flex={1}>
                <Text textAlign="center" color="#000" fontSize="$lg">
                    Тут ничего нет...{"\n"}
                    Воспользуйтесь поиском или{"\n"}
                    пройдите опрос
                </Text>
            </Center>

            {/* Кнопка */}
            <VStack mb="$10">
                <Button
                    variant="outline"
                    borderRadius="$xl"
                    borderColor="#CECECE"
                    h={55}
                    onPress={() => router.push("/(tabs)/(survey)/questions")}
                >
                    <ButtonText color="#000000" fontSize="$lg">
                        Пройти опрос
                    </ButtonText>
                </Button>
            </VStack>
        </Box>
    );
}