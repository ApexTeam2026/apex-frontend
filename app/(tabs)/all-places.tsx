import { 
  Box,
  Button,
  ButtonIcon,
  HStack,
  Input,
  InputField
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { FlatList } from "react-native";
import { useState } from "react";
import { places, Place } from "@/src/data/places";
import PlaceCard from "@/src/components/place-card";
import AppHeader from "@/src/components/app-header"
import FilterIcon from "@/src/assets/images/filter-icon.svg"

export default function AllPlacesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredPlaces = places.filter((place: Place) => {
    const matchesSearch = place.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every(tag => place.tags.includes(tag));

    return matchesSearch && matchesTags;
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
          onPress={() => router.push("/(tabs)/filters")} //TODO: при нажатии переход на страницу фильтров
          style={{ padding: 8, borderRadius: 8 }}
        >
          <FilterIcon width={35} height={35} />
        </Pressable>
          
        
      </HStack>

        {/*TODO: изменить скорость скролла*/}
        <FlatList<Place> 
  showsVerticalScrollIndicator={false}
  data={filteredPlaces}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <PlaceCard
      place={item}
      onPress={() =>
        router.push({
          pathname: "/detailed_place",
          params: { id: item.id.toString() },
        })
      }
    />
  )}
/>
    </Box>
  );
}