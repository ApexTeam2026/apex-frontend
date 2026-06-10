import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
    Box,
    HStack,
    Input,
    InputField,
    Text,
    Spinner
} from "@gluestack-ui/themed";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Pressable, FlatList, useWindowDimensions } from "react-native";
import { useFavorites } from "@/src/providers/FavoritesProvider";

import { Place } from "@/src/types/place";
import { PlacesService } from "@/src/api/services/places-service";

import PlaceCard from "@/src/components/place-card";
import AppHeader from "@/src/components/app-header";
import FilterIcon from "@/src/assets/images/filter-icon.svg";
import NetworkError from "@/src/components/network-error";

export default function AllPlacesScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isTablet = width > 768;
    const numColumns = isTablet ? 2 : 1;

    const [search, setSearch] = useState("");
    const [placesData, setPlacesData] = useState<Place[]>([]); // Переименовал, чтобы не было конфликта с импортом
    const [isLoading, setIsLoading] = useState(true);
    const [networkError, setNetworkError] = useState(false);

    const { categories, time, people, tags, district, priceFrom, priceTo } = useLocalSearchParams();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string[]>([]);
    const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // ---------------- API ----------------
    const fetchPlaces = async () => {
        try {
            setIsLoading(true);
            setNetworkError(false);

            const data = await PlacesService.getAll();
            setPlacesData(data || []);

        } catch (e: any) {
            console.log("GET PLACES ERROR:", e?.message);
            setNetworkError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPlaces();
    }, []);

    // ---------------- filters from params ----------------
    useEffect(() => {
        const parseSafe = (val: any) => {
            if (!val) return [];
            try { return JSON.parse(val as string); }
            catch (e) { return []; }
        };
        setSelectedCategories(parseSafe(categories));
        setSelectedTime(parseSafe(time));
        setSelectedPeople(parseSafe(people));
        setSelectedTags(parseSafe(tags));
    }, [categories, time, people, tags]);

    const normalize = (str?: string) => (str ?? "").trim().toLowerCase();

    const isNoFilters =
        selectedCategories.length === 0 &&
        selectedTime.length === 0 &&
        selectedPeople.length === 0 &&
        selectedTags.length === 0 &&
        !district && !priceFrom && !priceTo;

    // ---------------- filtering ----------------
    const filteredPlaces = useMemo(() => {
        const norm = (str?: string) => (str ?? "").trim().toLowerCase();

        return placesData.filter((place) => {
            // 1. Поиск по имени
            const matchesSearch = norm(place.name).includes(norm(search));
            if (isNoFilters && !search) return matchesSearch;

            // 2. Район
            const matchesDistrict = !district ||
                norm(place.district).includes(norm(district as string));

            // 3. Цена
            const placePrice = place.averageCheck || 0;
            const matchesPrice =
                (!priceFrom || placePrice >= Number(priceFrom)) &&
                (!priceTo || placePrice <= Number(priceTo));

            // 4. Категории
            const matchesCategory = selectedCategories.length === 0 ||
                selectedCategories.some(cat => norm(cat) === norm(place.category));

            // 5. Теги
            const matchesTags = selectedTags.length === 0 ||
                selectedTags.every((tag) =>
                    (place.tags || []).map(norm).includes(norm(tag))
                );

            // --- ИСПРАВЛЕННАЯ ЛОГИКА ДЛЯ ВРЕМЕНИ ---
            const matchesTime = selectedTime.length === 0 ||
                selectedTime.some((st) => {
                    // Делаем проверку: есть ли выбранное пользователем время в данных объекта
                    const placeTimes = Array.isArray(place.timeOfDay)
                        ? place.timeOfDay
                        : [place.timeOfDay]; // на случай если пришла строка
                    return placeTimes.map(norm).includes(norm(st));
                });

            // --- ИСПРАВЛЕННАЯ ЛОГИКА ДЛЯ ЛЮДЕЙ ---
            const matchesPeople = selectedPeople.length === 0 ||
                selectedPeople.some((sp) => {
                    // Проверяем: подходит ли место для выбранного количества людей
                    const placeSuitable = Array.isArray(place.suitableFor)
                        ? place.suitableFor
                        : [place.suitableFor];
                    return placeSuitable.map(norm).includes(norm(sp));
                });

            // Место отобразится, только если прошли ВСЕ фильтры
            return matchesSearch && matchesDistrict && matchesPrice &&
                matchesTags && matchesCategory && matchesTime && matchesPeople;
        });
    }, [placesData, search, selectedCategories, selectedTime, selectedPeople, selectedTags, district, priceFrom, priceTo]);

    // ---------------- RENDER ----------------
    // const renderItem = React.useCallback(
    //     ({ item }: { item: Place }) => (
    //         <Box flex={1} mb="$2">
    //         <PlaceCard
    //             place={item}
    //             onPress={() =>
    //             router.push({
    //                 pathname: "/detailed_place",
    //                 params: {
    //                 id: item.placeId.toString(),
    //                 from: "all-places",
    //                 },
    //             })
    //             }
    //         />
    //         </Box>
    //     ),
    //     [router]
    // );

    if (isLoading) {
        return (
            <Box flex={1} justifyContent="center" alignItems="center" bg="$white">
                <Spinner size="large" color="#C8F751" />
                <Text mt="$4">Загрузка мест...</Text>
            </Box>
        );
    }

    if (networkError && placesData.length === 0) {
        return <NetworkError onRetry={fetchPlaces} />;
    }

    return (
        <Box flex={1} bg="$white">
            <Box maxWidth={1200} w="$full" alignSelf="center" flex={1} px={isTablet ? "$10" : "$3"}>
                <AppHeader />

                {/* SEARCH + FILTER */}
                <HStack mb="$3" alignItems="center" space="xs">
                    <Input flex={1} borderRadius="$lg" borderColor="#CECECE" h={isTablet ? 55 : 45}>
                        <InputField
                            placeholder="Поиск мест..."
                            value={search}
                            onChangeText={setSearch}
                            fontSize={isTablet ? 18 : 16}
                        />
                    </Input>

                    <Pressable onPress={() => router.push("/filters")} style={{ padding: 8 }}>
                        <FilterIcon width={isTablet ? 45 : 35} height={isTablet ? 45 : 35} />
                    </Pressable>
                </HStack>

                {/* LIST */}
                <FlatList<Place>
                    key={numColumns}
                    data={filteredPlaces}

                    removeClippedSubviews
                    initialNumToRender={8}
                    maxToRenderPerBatch={8}
                    updateCellsBatchingPeriod={50}
                    windowSize={5}
                    
                    numColumns={numColumns}
                    keyExtractor={(item) => item.placeId.toString()}
                    showsVerticalScrollIndicator={false}
                    decelerationRate="fast" 
                    columnWrapperStyle={isTablet ? { gap: 20 } : undefined}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
  <Box flex={1} mb="$2">
    <PlaceCard
      place={item}
      onPress={() =>
        router.push({
          pathname: "/detailed_place",
          params: {
            id: item.placeId.toString(),
            from: "all-places",
          },
        })
      }
    />
  </Box>
)}
                    ListEmptyComponent={() => (
                        <Box mt="$10" alignItems="center">
                            <Text fontSize={18} color="$coolGray500">Ничего не найдено 😢</Text>
                        </Box>
                    )}
                    ItemSeparatorComponent={() =>
                        !isTablet ? <Box h={2} bg="$coolGray200" my="$3" mx="$5" /> : <Box h="$4" />
                    }
                />
            </Box>
        </Box>
    );
}