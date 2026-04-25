import React, { useEffect } from "react";  
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

import { useSurveyStore } from "@/src/store/surveyStore";

export default function SurveyScreen() {
    const router = useRouter();

    const {
        current,
        answers,
        selected,
        setCurrent,
        setSelected,
        setAnswer,
        reset,
        setStarted,
        setCompleted,
    } = useSurveyStore();

    const question = questions[current];

    const handleNext = () => {
        if (!selected) return;

        setAnswer(question.id, selected);

        if (current < questions.length - 1) {
        const next = current + 1;

        setCurrent(next);

        const nextQuestion = questions[next];
        setSelected(answers[nextQuestion.id] || null);
        } else {
        const result = {
            ...answers,
            [question.id]: selected,
        };

        console.log("Опрос завершён", result);

        setCompleted(true);

        router.push("/(tabs)/home");
        }
    };

    const handleBack = () => {
        if (current > 0) {
        const prev = current - 1;
        setCurrent(prev);

        const prevQuestion = questions[prev];
        setSelected(answers[prevQuestion.id] || null);
        }
    };

    useEffect(() => {
        setStarted(true);
    }, []);

  const progress = ((current + 1) / questions.length) * 100;

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
