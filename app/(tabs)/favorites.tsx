import React from "react";
import { Box, Text, Button, ButtonText, Center, VStack, ScrollView } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";
export default function VisitedScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isTablet = width > 768;
    return (
        <Box flex={1} bg="$backgroundLight0">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <VStack
                    flex={1}
                    px={isTablet ? "$20" : "$6"}
                    py={isTablet ? "$10" : "$6"}
                    justifyContent="space-between"
                    minHeight={isTablet ? 400 : 350} 
                >

                    {/* 1. Заголовок */}
                    <Text
                        mt={isTablet ? "$20" : "$12"}
                        fontSize={isTablet ? "$4xl" : "$2xl"}
                        fontWeight="$bold"
                    >
                        Избранные
                    </Text>

                    {/* 2. Пустое состояние */}
                    <Center flex={1} py="$10">
                        <Text
                            textAlign="center"
                            color="#000"
                            fontSize={isTablet ? "$2xl" : "$lg"}
                            lineHeight={isTablet ? "$3xl" : "$md"}
                        >
                            Тут ничего нет...{"\n"}
                            Воспользуйтесь поиском или{"\n"}
                            пройдите опрос
                        </Text>
                    </Center>

                    {/* 3. Кнопка */}
                    <Box
                        mb="$6"
                        w="$full"
                        maxWidth={isTablet ? 400 : "100%"}
                        alignSelf="center"
                    >
                        <Button
                            variant="outline"
                            borderRadius="$xl"
                            borderColor="#CECECE"
                            h={isTablet ? 70 : 55}
                            onPress={() => router.push("/questions")}
                        >
                            <ButtonText color="#000000" fontSize={isTablet ? "$xl" : "$lg"}>
                                Пройти опрос
                            </ButtonText>
                        </Button>
                    </Box>
                </VStack>
            </ScrollView>
        </Box>
    );
}