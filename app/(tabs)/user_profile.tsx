import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Center, HStack, Button, ButtonText} from "@gluestack-ui/themed";
import AvatarIcon from "@/src/assets/images/aavatar_icon.svg";
import { Ionicons } from "@expo/vector-icons";

// import HeartIcon from "@/src/assets/icons/heart.svg";
// import StarIcon from "@/src/assets/icons/star.svg"; TODO: добавить иконки


export default function ProfileScreen() {

    // Заглушка под бэкенд
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // имитация запроса
        setTimeout(() => {
            setUser({
                name: "Иван",
                birthDate: "11.11.2011",
                email: "yep@gmail.com",
            });
        }, 800);
    }, []);

    return (
        <Box 
            flex={1} 
            bg="$backgroundLight0" 
            px="$6"
        >

            {/* Сдвиг вниз */}
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

                        {/* Данные с бэка */}
                        <Text fontSize="$2xl">
                            {user ? user.name : "Загрузка..."}
                        </Text>

                        <Text color="$textLight500">
                            {user ? user.birthDate : ""}
                        </Text>

                        <Text color="$textLight500">
                            {user ? user.email : ""}
                        </Text>

                        {/* Кнопки */}
                        <VStack space="md" w="$full" mt="$8">

                        {/* Избранные */}
                            <Button
                                w="$full"
                                h={60}
                                variant="outline"
                                borderRadius="$xl"
                                borderColor="#CECECE"
                                px="$5"
                                onPress={() => console.log("Избранные")}
                            >
                                <HStack justifyContent="space-between" alignItems="center" w="$full">
        
                                <ButtonText color="#000000" size="xl">
                                Избранные
                                </ButtonText>

                                <Ionicons 
                                name="heart-outline" 
                                size={24} 
                                color="#C8F751" 
                                />
        
                                </HStack>
                            </Button>

                        {/* Посещенные */}
                            <Button
                                w="$full"
                                h={60}
                                variant="outline"
                                borderRadius="$xl"
                                borderColor="#CECECE"
                                px="$5"
                                onPress={() => console.log("Посещенные")}
                            >
                                <HStack justifyContent="space-between" alignItems="center" w="$full">
                                <ButtonText color="#000000" size="xl">
                                    Посещенные
                                </ButtonText>
                                <Ionicons 
                                name="star-outline" 
                                size={24} 
                                color="#C8F751" 
                                />
                                </HStack>
                            </Button>
                        </VStack>
                    </VStack>
                </Center>
            </Box>
        </Box>
    );
}