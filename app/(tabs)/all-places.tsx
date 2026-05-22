import { 
  Box,
  Button,
  ButtonIcon,
  HStack,
  Input,
  InputField,
  Text
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Place } from "@/src/types/place";
import { PlacesService } from "@/src/api/services/places-service";
import PlaceCard from "@/src/components/place-card";
import AppHeader from "@/src/components/app-header"
import FilterIcon from "@/src/assets/images/filter-icon.svg"
import { useLocalSearchParams } from "expo-router";

export default function AllPlacesScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categories, time, people, tags } = useLocalSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    if (categories) {
      setSelectedCategories(JSON.parse(categories as string));
    }
    if (time){
      setSelectedTime(JSON.parse(time as string));
    } 
    if (people){
      setSelectedPeople(JSON.parse(people as string));
    } 
    if (tags) {
      setSelectedTags(JSON.parse(tags as string));
    }
  }, [tags,categories, time, people]);

  useEffect(() => {
  const fetchPlaces = async () => {
    try {
      setIsLoading(true);

      const data = await PlacesService.getAll();

      console.log("PLACES RESPONSE:");
      console.log(JSON.stringify(data, null, 2));

      setPlaces(data);
    } catch (error: any) {
      console.log("GET PLACES ERROR:");
      console.log(error?.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  fetchPlaces();
}, []);

  console.log({
    selectedCategories,
    selectedTime,
    selectedPeople,
  });

  const normalize = (str: string) => str.trim().toLowerCase();

  const isNoFilters =
    selectedCategories.length === 0 &&
    selectedTime.length === 0 &&
    selectedPeople.length === 0;

  const filteredPlaces = places.filter((place: Place) => {
    const matchesSearch = place.name
      .toLowerCase()
      .includes(search.toLowerCase());

    if (isNoFilters) return matchesSearch;

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every(tag => place.tags.includes(tag));

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories
        .map(normalize)
        .includes(normalize(place.category));

    // TODO: оптимизировать эти проверки
    const matchesTime =
      selectedTime.length === 0 ||
      (place.timeOfDay &&
        selectedTime.some(t => place.timeOfDay?.includes(t)));

    // TODO: оптимизировать эти проверки
    const matchesPeople =
      selectedPeople.length === 0 ||
      (place.suitableFor &&
        selectedPeople.some(p => place.suitableFor?.includes(p)));

    return matchesSearch && matchesTags && matchesCategory && matchesTime && matchesPeople;
  });

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Загрузка мест...</Text>
      </Box>
    );
  }
  return (
    <Box flex={1} px="$3" bgColor="$white">
      <AppHeader />
      <HStack mb="$3" alignItems="center" space="xs">
        <Input 
          flex={1} 
          borderRadius="$lg"
          borderColor="#CECECE"
        >
          <InputField
            placeholder="Поиск мест..."
            value={search}
            onChangeText={setSearch}
          />
        </Input>
        
        <Pressable
          onPress={() => router.push("/(tabs)/filters")}
          style={{ padding: 8, borderRadius: 8 }}
        >
          <FilterIcon width={35} height={35} />
        </Pressable>
          
        
      </HStack>

        {/*TODO: изменить скорость скролла*/}
        <FlatList<Place> 
          showsVerticalScrollIndicator={false}
          data={filteredPlaces}
          keyExtractor={(item) => item.placeId.toString()}
          renderItem={({ item }) => (

            <PlaceCard
              place={item}
              onPress={() =>
                router.push({
                  pathname: "/detailed_place",
                  params: { id: item.placeId.toString() },
                })
              }/>

            
              )}

            ListEmptyComponent={() => (
              <Box mt="$10" alignItems="center">
                <Text fontSize={18} color="$coolGray500">
                  Ничего не найдено 😢
                </Text>
              </Box>
            )}

            ItemSeparatorComponent={() => (
                <Box>
                  <Box h="$1" />
                  <Box h={2} bg="$coolGray200" mx="$5" />
                  <Box h="$1" />
                </Box>
              )}
              
            />
    </Box>
  );
}