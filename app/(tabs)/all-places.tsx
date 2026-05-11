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
import { places, Place } from "@/src/data/places";
import PlaceCard from "@/src/components/place-card";
import AppHeader from "@/src/components/app-header"
import FilterIcon from "@/src/assets/images/filter-icon.svg"
import { useLocalSearchParams } from "expo-router";

export default function AllPlacesScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");

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

  console.log({
    selectedCategories,
    selectedTime,
    selectedPeople,
  });

  const normalize = (str: string | undefined) => (str ? str.trim().toLowerCase() : "");

  const isNoFilters =
    selectedCategories.length === 0 &&
    selectedTime.length === 0 &&
    selectedTags.length === 0 &&
    selectedPeople.length === 0;

  const filteredPlaces = places.filter((place: Place) => {
      const matchesSearch = normalize(place.name).includes(normalize(search));

    if (isNoFilters) return matchesSearch;

    const matchesTags =
      selectedTags.length === 0 ||
        selectedTags.every(tag => place.tags.map(normalize).includes(normalize(tag))
        );

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories
        .map(normalize)
        .includes(normalize(place.category));

    const matchesTime =
      selectedTime.length === 0 ||
      (place.timeOfDay &&
        selectedTime.some(t => 
          place.timeOfDay?.map(normalize).includes(normalize(t))
        ));


     const matchesPeople =
      selectedPeople.length === 0 ||
      (place.suitableFor &&
        selectedPeople.some(p => 
          place.suitableFor?.map(normalize).includes(normalize(p))
        ));
    return matchesSearch && matchesTags && matchesCategory && matchesTime && matchesPeople;
  });

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