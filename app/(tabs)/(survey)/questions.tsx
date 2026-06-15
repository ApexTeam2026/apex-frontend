import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  ButtonText,
  VStack,
  HStack,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { questions } from "@/src/data/questions";
import { QuizService } from "@/src/api/services/quiz-service";
import { useSurveyStore } from "@/src/store/surveyStore";

export default function SurveyScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    current,
    answers,
    setCurrent,
    setAnswer,
    reset,
    setStarted,
    setCompleted,
  } = useSurveyStore();

const buildQuizPayload = (answers: Record<string, string>) => {
  return {
    tags: Object.values(answers).filter(v => v && v !== "any"),

    suitableFor: answers.suitableFor && answers.suitableFor !== "any"
      ? [answers.suitableFor]
      : [],

    timeOfDay: answers.timeOfDay && answers.timeOfDay !== "any"
      ? [answers.timeOfDay]
      : [],

    priceCategory: answers.priceCategory && answers.priceCategory !== "any"
      ? [answers.priceCategory]
      : [],
  };
};

  
  const question = questions[current];

  // текущее значение берём только из store
  const selected = answers[question.id] || null;

  const handleNext = async () => {
    const currentAnswer = answers[question.id];

    if (!currentAnswer) return;

    // если не последний вопрос → следующий
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      return;
    }

    // последний вопрос → отправка
  try {
  setLoading(true);

  const payload = buildQuizPayload(answers);

  console.log("ANSWERS RAW:", answers);
  console.log("PAYLOAD SENT:", payload);

  const res = await QuizService.submit(payload);

  console.log("QUIZ RESPONSE:", res);

  const ids = Array.isArray(res) ? res : [];

  if (ids.length === 0) {
    console.log("NO MATCHING PLACES FOUND");;
  }
    setCompleted(true);
    console.log("NAVIGATING NOW");
  router.push({
  pathname: "/final_page",
  params: {
    ids: ids.join(","),
  },
});

} catch (error) {
      console.log("QUIZ ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  useEffect(() => {
    reset();
    setStarted(true);
  }, []);

  return (
    <Box flex={1} bg="$backgroundLight0" px="$5" py="$6" justifyContent="space-between">

      {/* progress */}
      <Box pt="$8" mb="$6">
        <HStack space="xs">
          {questions.map((_, index) => {
            const isActive = index <= current;

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

        {/* header */}
        <HStack alignItems="flex-start">
          {current > 0 && (
            <Button size="sm" variant="link" onPress={handleBack}>
              <ButtonIcon>
                <Ionicons name="chevron-back" size={18} color="#000" />
              </ButtonIcon>
            </Button>
          )}

          <Text size="2xl" flex={1} ml="$3">
            {question.text}
          </Text>
        </HStack>

        {/* options */}
        <HStack flexWrap="wrap" gap="$3" mt="auto">
          {question.options.map((option) => {
            const isActive = selected === option.value;

            return (
              <Button
                key={option.value}
                onPress={() => setAnswer(question.id, option.value)}
                variant="outline"
                borderRadius="$xl"
                borderColor={isActive ? "#C8F751" : "#CECECE"}
                flexGrow={1}
                minWidth={120}
                height={46}
                mt="$3"
              >
                <ButtonText color="#000">
                  {option.label}
                </ButtonText>
              </Button>
            );
          })}
        </HStack>

        {/* next */}
        <HStack justifyContent="flex-end">
          <Box width="50%">
            <Button
              onPress={handleNext}
              isDisabled={!selected || loading}
              borderRadius="$xl"
              borderColor={!selected || loading ? "#CECECE" : "#C8F751"}
              variant="outline"
              width="100%"
              height={46}
            >
              <Ionicons name="chevron-forward-outline" size={24} color="#000" />
            </Button>
          </Box>
        </HStack>

      </VStack>
    </Box>
  );
}