import React, { useState, useEffect } from "react";
import {Box, Text, Button, ButtonText, VStack, Center} from "@gluestack-ui/themed"
import AppHeader from "@/src/components/app-header";

import BackgroundBear from "@/src/components/background-bear";

export default function SurveyScreen() {
    //TODO: Сделать загрузку имени пользователя и отображение для гостя
    const userName = "Иван";

    return (

        <Box 
            flex = {1} 
            bg = "$backgroundLight0" 
            px = "$9"  
            position="relative"
            justifyContent="space-between"
        >
            
            <BackgroundBear />

            <AppHeader />

            <Box mt="$4" mb="$10">
                {/* Карточка */}
                <Center>
                    <Box
                        w="100%"
                        maxWidth={340}
                        borderRadius="$2xl"
                        alignItems="center"
                        //bg="$green100"
                    >
                        <VStack 
                            space="xl" 
                            alignItems="center"
                        >
                            {/* Приветствие */}
                            <Text 
                                fontSize="$4xl" 
                                mb="$10" 
                                color = "#000000" 
                                textAlign="center"
                            >
                                {userName ? `Здравствуйте, ${userName}!` : "Загрузка..."}
                            </Text>

                            <Text fontSize="$4xl" color = "#000000">
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
            </Box>

            {/* Кнопка */}
            <Box mt="$10" pb="$10">
                <Button
                    variant="outline"
                    borderRadius="$lg"
                    size="lg"
                    borderColor="#CECECE"
                >
                <ButtonText color="#000000" size="xl">
                    Пройти опрос
                </ButtonText>
                </Button>
            </Box>
        </Box>     
    )
}