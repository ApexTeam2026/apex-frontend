import React, { useState } from "react";  
import {
  Box,
  Text,
  Button,
  ButtonText,
  Progress,
  VStack,
  HStack,
  ButtonIcon,
  Icon
} from "@gluestack-ui/themed";
import {ArrowLeftIcon} from "@gluestack-ui/themed"
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { questions } from "@/src/data/questions"

export default function SurveyScreen() {
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [selected, setSelected] = useState<string | null>(null);

    const question = questions[current];
    const progress = ((current + 1) / questions.length) * 100;

    const router = useRouter();

    function handleNext() {
        if (!selected) return;

        const newAnswers = {
            ...answers,
            [question.id]: selected,
        };

        setAnswers(newAnswers);

        if (current < questions.length - 1) {
            const nextIndex = current + 1;

            setCurrent(nextIndex);
            setSelected(newAnswers[questions[nextIndex].id] || null);
        } else {
            console.log("Опрос завершён", newAnswers);
            resetSurvey();
            router.push("/(tabs)/home"); //TODO: изменить переход после завершения опроса
        }
    }

    function handleBack() {
        if (current > 0) {
            const prevIndex = current - 1;

            setCurrent(prevIndex);
            setSelected(answers[questions[prevIndex].id] || null);
        }
    }

    function resetSurvey() {
        setCurrent(0);
        setAnswers({});
        setSelected(null);
    }

    return (
    <Box 
        flex={1} 
        bg="$backgroundLight0" 
        px="$5" 
        py="$6"
        position="relative"
        justifyContent="space-between"
    >
      
        <Box pt="$8" mb="$6">
        <HStack space="xs">
            {questions.map((q, index) => {
                const isActive =
                    index < current + 1;

            return (
                <Box
                key={index}
                flex={1}
                height={6}
                borderRadius={10}
                bg={isActive ? "#C8F751" : "#E5E5E5"}
                />
            );
            })}
        </HStack>
        </Box>

        <VStack flex={1} justifyContent="space-between" gap="$20">

            {/* TODO: кнопка назад */}
            <HStack alignItems="flex-start" justifyContent="flex-start"> 
                <Box alignItems="flex-start">
                    {current > 0 && (
                        <Button
                            size="sm"
                            borderRadius="$full"
                            onPress={handleBack}
                            variant="link"
                            bg = "none"
                        >
                            <ButtonIcon >
                                <Ionicons name="chevron-back" size={18} color="#000" />
                            
                            </ButtonIcon>
                        </Button>
                    )}
                </Box>

                <Text size="2xl" flex={1} ml = "$3">
                    {question.text}
                </Text>

                {/* <Box width={10} /> */}
            </HStack>

            {/* Выборы */}
            <HStack flexWrap="wrap" justifyContent="flex-start" mt="auto" gap="$3">
                {question.options.map((option) => {
                    const isActive = selected === option.value;

                    return (
                    <Button
                        key={option.value}
                        onPress={() => setSelected(option.value)}
                        variant="outline"
                        borderRadius="$xl"
                        borderColor={isActive ? "#C8F751" : "#CECECE"}

                        flexGrow={1}
                        minWidth={120}
                        height={46}
                        mt="$3"
                    >
                        <ButtonText color="#000000" size="xl">
                            {option.label}
                        </ButtonText>
                    </Button>
                    );
                })}
            </HStack>
      
            <HStack justifyContent="flex-end" mt="$6">
                <Box width="50%">
                    <Button
                        onPress={handleNext}
                        isDisabled={!selected}
                        variant="outline"
                        borderRadius="$xl"
                        borderColor = "#CECECE"
                        bg="transparent"
                        width="100%"
                        height={46}
                        
                    >
                        <Ionicons name="chevron-forward-outline" size={24} color="#000"/>
                    </Button>
                </Box>
            </HStack>
      
      </VStack>
    </Box>
    );
}
