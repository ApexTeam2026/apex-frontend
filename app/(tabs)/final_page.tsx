import {
  Box,
  HStack,
  Input,
  InputField,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import { FlatList, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";

import { places } from "@/src/data/places";

export default function RecommendationsScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  /* ID мест из params */
  const { ids } = useLocalSearchParams();

  /*
    Пример передачи:
    ids: JSON.stringify([1, 2, 3])
  */

  const selectedIds: number[] = useMemo(() => {
    if (!ids) return [];

    try {
      return JSON.parse(ids as string);
    } catch {
      return [];
    }
  }, [ids]);

  /* Места только по ID */
  const recommendedPlaces = places.filter((place) =>
    selectedIds.includes(place.placeId)
  );

  /* Поиск */
  const filteredPlaces = recommendedPlaces.filter((place) =>
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box flex={1} bg="$white" px="$4" pt="$12">

      {/* Заголовок */}
      <Text
        fontSize="$2xl"
        fontWeight="$medium"
        mb="$2"
        textAlign="center"
      >
        Подобрали специально для вас
      </Text>

      {/* Если ничего не найдено */}
      {filteredPlaces.length === 0 ? (
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          px="$6"
        >
          <Text
            textAlign="center"
            fontSize="$2xl"
            fontWeight="$medium"
            color="$coolGray600"
          >
            К сожалению, мы ничего не смогли для вас найти
          </Text>
        </Box>
      ) : (
        <FlatList
          data={filteredPlaces}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.placeId.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/detailed_place",
                  params: { id: item.placeId.toString() },
                })
              }
            >
              <Box mb="$5">

                {/* Картинка */}
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "100%",
                    height: 180,
                    borderRadius: 20,
                  }}
                />

                {/* Контент */}
                <HStack
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mt="$3"
                >

                  {/* Левая часть */}
                  <VStack flex={1}>

                    <Text
                      fontSize="$2xl"
                      fontWeight="$medium"
                    >
                      {item.name}
                    </Text>

                    {/* Адрес */}
                    <HStack mt="$2" alignItems="center">
                      <Ionicons
                        name="location-outline"
                        size={15}
                        color="#A0A0A0"
                      />

                      <Text
                        ml="$1"
                        color="$coolGray500"
                        fontSize="$md"
                      >
                        {item.address}
                      </Text>
                    </HStack>

                    {/* Время */}
                    <HStack mt="$1" alignItems="center">
                      <Ionicons
                        name="time-outline"
                        size={15}
                        color="#A0A0A0"
                      />

                      <Text
                        ml="$1"
                        color="$coolGray500"
                        fontSize="$md"
                      >
                        {item.workingHours}
                      </Text>
                    </HStack>

                  </VStack>

                  {/* Правая часть */}
                  <VStack
                    alignItems="flex-end"
                    ml="$3"
                  >

                    {/* Рейтинг */}
                    <HStack alignItems="center">
                      <Ionicons
                        name="star-outline"
                        size={18}
                        color="#C8F751"
                      />

                      <Text
                        ml="$1"
                        fontSize="$lg"
                        color="$coolGray700"
                      >
                        {item.rate}
                      </Text>
                    </HStack>

                    {/* Категория */}
                    <Text
                      mt="$1"
                      fontSize="$md"
                      color="$coolGray500"
                    >
                      {item.category.toLowerCase()}
                    </Text>

                    {/* Лайк */}
                    <Ionicons
                      name="heart-outline"
                      size={22}
                      color="#C8F751"
                      style={{ marginTop: 10 }}
                    />

                  </VStack>
                </HStack>

                {/* Разделитель */}
                <Box
                  h={1}
                  bg="#EAEAEA"
                  mt="$5"
                />

              </Box>
            </Pressable>
          )}
        />
      )}
    </Box>
  );
}