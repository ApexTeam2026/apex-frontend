import React, { useState, useEffect } from "react";
import {Box, Text, Button, ButtonText, VStack, Center} from "@gluestack-ui/themed"
import AppHeader from "@/src/components/app-header";

export default function SurveyScreen() {
    //TODO: Сделать загрузку имени пользователя и отображение для гостя
    const userName = "Иван";

    return (

        <Box 
            flex = {1} 
            bg = "$backgroundLight0" 
            px = "$6"  
            justifyContent="space-between"
        >
            <AppHeader />

            {/* Приветствие */}
            <Text 
                fontSize="$3xl" 
                mb="$10" 
                color = "#000000" 
                textAlign="center"
            >
                {userName ? `Здравствуйте, ${userName}!` : "Загрузка..."}
            </Text>

            {/* Карточка */}
            <Center>
                <Box
                    w="$80"
                    bg="$backgroundLight50"
                    p="$6"
                    borderRadius="$2xl"
                    alignItems="center"
                >
                    <VStack space="sm" alignItems="center">
                        <Text fontSize="$2xl" color = "#000000">
                        Пройдите опрос
                        </Text>

                        <Text
                            textAlign="center"
                            color = "#000000"
                            fontSize="$xl"
                        >
                        Мы поможем подобрать подходящее место для вас
                        </Text>
                    </VStack>
                </Box>
            </Center>

                {/* Кнопка */}
                <Box mt="$10" pb="$10">
                    <Button
                        variant="outline"
                        borderRadius="$lg"
                        size="sm"
                        borderColor="#CECECE"
                    >
                    <ButtonText color="#000000">
                        Пройти опрос
                    </ButtonText>
                    </Button>
                </Box>

        </Box>        
    )
}