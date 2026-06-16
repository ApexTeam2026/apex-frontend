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
import { LoadingOverlay } from "@/src/components/ui/loading-overlay";
export default function AllPlacesScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isTablet = width > 768;
    const numColumns = isTablet ? 2 : 1;

    const [search, setSearch] = useState("");
    const [placesData, setPlacesData] = useState<Place[]>([]); // Переименовал, чтобы не было конфликта с импортом
    const [isLoading, setIsLoading] = useState(true);
    const [networkError, setNetworkError] = useState(false);

    const {
        categories,
        time,
        people,
        district,
        priceFrom,
        priceTo,
    } = useLocalSearchParams();

    const districtValue =
        typeof district === "string"
            ? district
            : undefined;

    const priceFromValue =
    typeof priceFrom === "string" && priceFrom.trim() !== ""
        ? Number(priceFrom)
        : undefined;

    const priceToValue =
    typeof priceTo === "string" && priceTo.trim() !== ""
        ? Number(priceTo)
        : undefined;

    console.log("PARAMS", {
        categories,
        time,
        people,
        district,
        priceFrom,
        priceTo,
    });
    const fetchPlaces = async () => {
        try {
            setIsLoading(true);
            setNetworkError(false);

            const parseSafe = (val: unknown): string[] => {
                if (!val || typeof val !== "string") {
                    return [];
                }

                try {
                    const parsed = JSON.parse(val);
                    return Array.isArray(parsed) ? parsed : [];
                } catch {
                    return [];
                }
            };

            const categoriesFilter = parseSafe(categories);
            const timeFilter = parseSafe(time);
            const peopleFilter = parseSafe(people);
            const districtsFilter = parseSafe(district);

            const filters = {
                categories:
                    categoriesFilter.length > 0
                        ? categoriesFilter
                        : undefined,

                districts:
                    districtsFilter.length > 0
                        ? districtsFilter
                        : undefined,

                avgCheckMin: priceFromValue,

                avgCheckMax: priceToValue,

                timeOfDay:
                    timeFilter.length > 0
                        ? timeFilter
                        : undefined,

                suitableFor:
                    peopleFilter.length > 0
                        ? peopleFilter
                        : undefined,

                sortBy: "name",
                sortDir: "asc" as const,
            };

            console.log("FILTERS:", filters);
            console.log("FILTERS", JSON.stringify(filters, null, 2));

            console.log(
                "CATEGORY TYPE:",
                typeof filters.categories,
                filters.categories
            );

            const data = await PlacesService.getAll(filters);

            setPlacesData(data || []);
        } catch (e: any) {
            console.log(
                "GET PLACES ERROR:",
                e?.response?.data || e?.message
            );

            if (e.isNetworkError) {
                setNetworkError(true);
            }

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPlaces();
    }, [
        categories,
        time,
        people,
        district,
        priceFrom,
        priceTo,
    ]);

    const filteredPlaces = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return placesData;

        return placesData.filter((place) =>
            place.name?.toLowerCase().includes(query) ||
            place.category?.toLowerCase().includes(query) ||
            place.district?.toLowerCase().includes(query) ||
            place.address?.toLowerCase().includes(query)
        );
    }, [placesData, search]);

    const normalize = (str?: string) => (str ?? "").trim().toLowerCase();

    if (networkError && placesData.length === 0) {
        return <NetworkError onRetry={fetchPlaces} />;
    }

    return (
        <Box flex={1} bg="$white">
            {/* 1. ПОКАЗЫВАЕМ ОВЕРЛЕЙ ПОВЕРХ КОНТЕНТА */}
            {isLoading && <LoadingOverlay message="Ищем лучшие места..." />}

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
                            maxLength={100}
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