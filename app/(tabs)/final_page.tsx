import {
    Box,
    Text,
} from "@gluestack-ui/themed";

import { FlatList, useWindowDimensions } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";

import PlaceCard from "@/src/components/place-card";
import { PlacesService } from "@/src/api/services/places-service";
import { Place } from "@/src/types/place";

import { LoadingOverlay } from "@/src/components/ui/loading-overlay";

export default function RecommendationsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { width } = useWindowDimensions();

    const isTablet = width > 768;

    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);
    console.log("RAW PARAMS IDS:", params.ids);

    const selectedIds = useMemo(() => {
        if (!params.ids || typeof params.ids !== "string") return [];

        return params.ids
            .split(",")
            .map(Number)
            .filter(Boolean);
    }, [params.ids]);

    console.log("SELECTED IDS:", selectedIds);

    useEffect(() => {
        setLoading(true);
        setPlaces([]); 
        const loadPlaces = async () => {
            setLoading(true);
            setPlaces([]); 
            if (!selectedIds.length) {
                setPlaces([]);
                setLoading(false);
                return;
            }

            try {
                const result = await Promise.all(
                    selectedIds.map((id) =>
                        PlacesService.getById(String(id))
                    )
                );

                setPlaces(result.filter(Boolean));
            } catch (error) {
                console.log("LOAD PLACES ERROR:", error);
                setPlaces([]);
            } finally {
                setLoading(false);
            }
        };

        loadPlaces();
    }, [params.ids]);

   
    if (loading) {
        return <LoadingOverlay />;
    }

    return (
        <Box flex={1} bg="$white" px="$4" pt="$12">

            <Text fontSize="$2xl" fontWeight="$medium" mb="$4" textAlign="center">
                Подобрали специально для вас
            </Text>

            {places.length === 0 ? (
                <Box flex={1} justifyContent="center" alignItems="center" px="$6">
                    <Text textAlign="center" fontSize="$2xl" fontWeight="$medium">
                        К сожалению, мы ничего не смогли для вас найти
                    </Text>
                </Box>
            ) : (
                <FlatList
                    data={places}
                    keyExtractor={(item) => String(item.placeId)}
                    renderItem={({ item }) => (
                        <PlaceCard
                            place={item}
                            onPress={() =>
                                router.push({
                                    pathname: "/detailed_place",
                                    params: {
                                        id: String(item.placeId),
                                        from: "final_page",
                                        ids: String(params.ids),
                                    },
                                })
                            }
                        />
                    )}
                    ListEmptyComponent={() => (
                        <Box mt="$10" alignItems="center">
                            <Text 
                                fontSize={18} 
                                color="$coolGray500" 
                                flexWrap="wrap"
                            >
                                Мы не нашли подходящих мест, попробуйте пройти опрос заново 😢
                            </Text>
                        </Box>
                    )}
                    ItemSeparatorComponent={() =>
                        !isTablet ? <Box h={2} bg="$coolGray200" my="$3" mx="$5" /> : <Box h="$4" />
                    }
                />
            )}
        </Box>
    );
}