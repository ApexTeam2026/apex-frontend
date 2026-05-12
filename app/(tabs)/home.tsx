import React from "react";
import { ScrollView, Box, Text, Button, ButtonText, VStack, Center } from "@gluestack-ui/themed";
import AppHeader from "@/src/components/app-header";
import { useRouter } from "expo-router";

import BackgroundBear from "@/src/components/background-bear";
import { useSurveyStore } from "@/src/store/surveyStore";

export default function HomeScreen() {
  const userName = "Иван";
  const router = useRouter();

  const { completed, started, reset } = useSurveyStore();

  const handlePress = () => {
    if (completed) {
      reset();
      router.push("/(tabs)/home");
      return;
    }

    router.replace("/(tabs)/(survey)/questions");
  };

  const getButtonText = () => {
    if (completed) return "Пройти заново";
    if (started) return "Продолжить";
    return "Пройти опрос";
  };

  return (
      <Box flex={1} bg="$backgroundLight0">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Box
                  flex={1}
                  px="$9"
                  position="relative"
                  justifyContent="space-between"
                  py="$6" 
              >
                  <BackgroundBear />
                  <AppHeader />

                  <Box mt="$4" mb="$10">
                      <Center>
                          <Box w="100%" maxWidth={340} borderRadius="$2xl" alignItems="center">
                              <VStack space="xl" alignItems="center">
                                  <Text fontSize="$4xl" mb="$10" color="#000" textAlign="center">
                                      {userName ? `Здравствуйте, ${userName}!` : "Загрузка..."}
                                  </Text>

                                  <Text textAlign="center" fontSize="$4xl" color="#000">
                                      {completed ? "Опрос завершён" : "Пройдите опрос"}
                                  </Text>

                                  <Text textAlign="center" color="#000" fontSize="$xl">
                                      {completed
                                          ? "Спасибо! Мы уже подобрали рекомендации"
                                          : "Мы поможем подобрать подходящее место для вас"}
                                  </Text>
                              </VStack>
                          </Box>
                      </Center>
                  </Box>

                  <Box mt="$10" pb="$10">
                      <Button
                          variant="outline"
                          borderRadius="$lg"
                          size="lg"
                          borderColor="#CECECE"
                          onPress={handlePress}
                      >
                          <ButtonText color="#000" size="xl">
                              {getButtonText()}
                          </ButtonText>
                      </Button>
                  </Box>
              </Box>
          </ScrollView>
      </Box>
  );
}