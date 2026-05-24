import {
  Box,
  HStack,
  Input,
  InputField,
  Text,
} from "@gluestack-ui/themed";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Pressable, FlatList, useWindowDimensions } from "react-native";
import { useState, useEffect, useMemo } from "react";

import { Place } from "@/src/types/place";
import { PlacesService } from "@/src/api/services/places-service";

import PlaceCard from "@/src/components/place-card";
import AppHeader from "@/src/components/app-header";
import FilterIcon from "@/src/assets/images/filter-icon.svg";

export default function AllPlacesScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const isTablet = width > 768;
  const numColumns = isTablet ? 2 : 1;

  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categories, time, people, tags } = useLocalSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // ---------------- API ----------------
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setIsLoading(true);
        const data = await PlacesService.getAll();
        setPlaces(data);
      } catch (e: any) {
        console.log("GET PLACES ERROR:", e?.response?.data || e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  // ---------------- filters from params ----------------
  useEffect(() => {
    if (categories) setSelectedCategories(JSON.parse(categories as string));
    if (time) setSelectedTime(JSON.parse(time as string));
    if (people) setSelectedPeople(JSON.parse(people as string));
    if (tags) setSelectedTags(JSON.parse(tags as string));
  }, [categories, time, people, tags]);

  // ---------------- utils ----------------
  const normalize = (str?: string) =>
    (str ?? "").trim().toLowerCase();

  const isNoFilters =
    selectedCategories.length === 0 &&
    selectedTime.length === 0 &&
    selectedPeople.length === 0 &&
    selectedTags.length === 0;

  // ---------------- filtering ----------------
  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesSearch = normalize(place.name).includes(normalize(search));

      if (isNoFilters) return matchesSearch;

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) =>
          place.tags?.map(normalize).includes(normalize(tag))
        );

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories
          .map(normalize)
          .includes(normalize(place.category));

      const matchesTime =
        selectedTime.length === 0 ||
        (place.timeOfDay &&
          selectedTime.some((t) =>
            place.timeOfDay?.map(normalize).includes(normalize(t))
          ));

      const matchesPeople =
        selectedPeople.length === 0 ||
        (place.suitableFor &&
          selectedPeople.some((p) =>
            place.suitableFor?.map(normalize).includes(normalize(p))
          ));

      return (
        matchesSearch &&
        matchesTags &&
        matchesCategory &&
        matchesTime &&
        matchesPeople
      );
    });
  }, [
    places,
    search,
    selectedCategories,
    selectedTime,
    selectedPeople,
    selectedTags,
  ]);

  // ---------------- loading ----------------
  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Загрузка мест...</Text>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="$white">
      <Box
        maxWidth={1200}
        w="$full"
        alignSelf="center"
        flex={1}
        px={isTablet ? "$10" : "$3"}
      >
        <AppHeader />

        {/* SEARCH + FILTER */}
        <HStack mb="$3" alignItems="center" space="xs">
          <Input
            flex={1}
            borderRadius="$lg"
            borderColor="#CECECE"
            h={isTablet ? 55 : 45}
          >
            <InputField
              placeholder="Поиск мест..."
              value={search}
              onChangeText={setSearch}
              fontSize={isTablet ? "$lg" : "$md"}
            />
          </Input>

          <Pressable
            onPress={() => router.push("/(tabs)/filters")}
            style={{ padding: 8 }}
          >
            <FilterIcon
              width={isTablet ? 45 : 35}
              height={isTablet ? 45 : 35}
            />
          </Pressable>
        </HStack>

        {/* LIST */}
        <FlatList<Place>
          key={numColumns}
          data={filteredPlaces}
          numColumns={numColumns}
          keyExtractor={(item) => item.placeId.toString()}
          showsVerticalScrollIndicator={false}
          decelerationRate="fast"
          columnWrapperStyle={
            isTablet ? { gap: 20 } : undefined
          }
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Box flex={1} mb="$2">
              <PlaceCard
                place={item}
                onPress={() =>
                  router.push({
                    pathname: "/detailed_place",
                    params: { id: item.placeId.toString(), from: "all-places"},
                  })
                }
              />
            </Box>
          )}
          ListEmptyComponent={() => (
            <Box mt="$10" alignItems="center">
              <Text fontSize={18} color="$coolGray500">
                Ничего не найдено 😢
              </Text>
            </Box>
          )}
          ItemSeparatorComponent={() =>
            !isTablet ? (
              <Box h={2} bg="$coolGray200" my="$3" mx="$5" />
            ) : (
              <Box h="$4" />
            )
          }
        />
      </Box>
    </Box>
  );
}