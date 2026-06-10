import {
  Box,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import { FlatList, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { PlacesService } from "@/src/api/services/places-service";
import { Place } from "@/src/types/place";

export default function RecommendationsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  // ✔️ безопасный парсинг ids (ТОЛЬКО ОДИН РАЗ)
  let selectedIds: number[] = [];

  try {
    selectedIds = params.ids
      ? JSON.parse(params.ids as string)
      : [];
  } catch {
    selectedIds = [];
  }

  useEffect(() => {
    const loadPlaces = async () => {
      if (!selectedIds.length) {
        setLoading(false);
        return;
      }

      try {
        const result = await Promise.all(
          selectedIds.map((id) =>
            PlacesService.getById(id.toString())
          )
        );

        setPlaces(result);
      } catch (error) {
        console.log("LOAD PLACES ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, [params.ids]);

  // поиск
  const filteredPlaces = loading
    ? []
    : places.filter((place) =>
        place.name
          .toLowerCase()
          .includes("")
      );

  // loading
  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Загрузка...</Text>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="$white" px="$4" pt="$12">

      <Text fontSize="$2xl" fontWeight="$medium" mb="$4" textAlign="center">
        Подобрали специально для вас
      </Text>

      {filteredPlaces.length === 0 ? (
        <Box flex={1} justifyContent="center" alignItems="center" px="$6">
          <Text textAlign="center" fontSize="$2xl" fontWeight="$medium">
            К сожалению, мы ничего не смогли для вас найти
          </Text>
        </Box>
      ) : (
        <FlatList
          data={filteredPlaces}
          keyExtractor={(item) =>
            String(item.placeId ?? item.placeId)
          }
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

                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: "100%",
                    height: 180,
                    borderRadius: 20,
                  }}
                />

                <HStack
                  justifyContent="space-between"
                  alignItems="flex-start"
                  mt="$3"
                >
                  <VStack flex={1}>
                    <Text fontSize="$2xl" fontWeight="$medium">
                      {item.name}
                    </Text>

                    <HStack mt="$2" alignItems="center">
                      <Ionicons name="location-outline" size={15} color="#A0A0A0" />
                      <Text ml="$1" color="$coolGray500">
                        {item.address}
                      </Text>
                    </HStack>

                    <HStack mt="$1" alignItems="center">
                      <Ionicons name="time-outline" size={15} color="#A0A0A0" />
                      <Text ml="$1" color="$coolGray500">
                        {item.workingHours}
                      </Text>
                    </HStack>
                  </VStack>

                  <VStack alignItems="flex-end" ml="$3">
                    <HStack alignItems="center">
                      <Ionicons name="star-outline" size={18} color="#C8F751" />
                      <Text ml="$1">{item.rate}</Text>
                    </HStack>

                    <Text mt="$1" color="$coolGray500">
                      {item.category?.toLowerCase?.() ?? ""}
                    </Text>

                    <Ionicons
                      name="heart-outline"
                      size={22}
                      color="#C8F751"
                      style={{ marginTop: 10 }}
                    />
                  </VStack>
                </HStack>

                <Box h={1} bg="#EAEAEA" mt="$5" />
              </Box>
            </Pressable>
          )}
        />
      )}
    </Box>
  );
}