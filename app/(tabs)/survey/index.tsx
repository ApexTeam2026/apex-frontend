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

const questions = [ //TODO: Перенести отдельно список вопросов
    {
        id: 1,
        text: "Вы будете одни?",
        options: ["Да", "Нет", "Не знаю"]

    },
    {
        id: 2,
        text: "Какой тип отдыха?",
        options: ["Активный", "Спокойный", "Не знаю"]

    },
    {
        id: 3,
        text: "Какой у вас бюджет?",
        options: ["Нет","Низкий", "Средний", "Высокий"]

    }
];

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
        setSelected(null);

        if (current < questions.length - 1) {
        setCurrent(current + 1);
        } else {
            console.log("Опрос завершён", newAnswers);
            router.push("/(tabs)/home"); //TODO: изменить переход после завершения опроса
        }
    }

    function handleBack() {
        if (current > 0) {
            setCurrent(current - 1);
            setSelected(answers[questions[current - 1].id] || null);
        }
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
      
        <Box pt="$4" pb="$4">
            {/* Прогресс-бар */}
            <Progress value={progress} size="sm" mb="$8">
                <Progress.FilledTrack bg="#C8F751"/>
            </Progress>
        </Box>
        <VStack flex={1} justifyContent="space-between" gap="$20">

            {/* TODO: кнопка назад */}
            <HStack alignItems="center" gap="$3"> 
                {/* {current > 0 && (
                    <Button size="lg" borderRadius="$full" onPress={handleBack}>
                        <ButtonIcon>
                            <Icon as={ArrowLeftIcon} size="xs" color="#000" />
                        </ButtonIcon>
                    </Button>
                )} */}
                <Text size="xl">{question.text}</Text>
            </HStack>

            {/* Выборы */}
            <HStack flexWrap="wrap" justifyContent="flex-start" mt="auto" gap="$3">
                {question.options.map((option) => {
                    const isActive = selected === option;

                    return (
                    <Button
                        key={option}
                        onPress={() => setSelected(option)}
                        variant="outline"
                        borderRadius="$xl"
                        borderColor={isActive ? "#C8F751" : "#CECECE"}

                        flexGrow={1}
                        minWidth={120}
                        height={46}
                        mt="$3"
                    >
                        <ButtonText color="#000000" size="xl">
                            {option}
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
