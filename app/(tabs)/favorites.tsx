import React, { useEffect, useMemo, useState } from "react";
import { Box, Text, Button, ButtonText, Center, VStack, ScrollView } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { useWindowDimensions, FlatList } from "react-native";
import PlaceCard from "@/src/components/place-card";

import { Place } from "@/src/types/place";

import { PlacesService } from "@/src/api/services/places-service";

import { useFavorites } from "@/src/providers/FavoritesProvider";
import { UserPlaceService } from "@/src/api/services/user-place-service";
import { useAuth } from "@/src/hooks/useAuth";
import NetworkError from "@/src/components/network-error";
import { LoadingOverlay } from "@/src/components/ui/loading-overlay";

export default function VisitedScreen() {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const isTablet = width > 768;
    const { user } = useAuth();

    const [places, setPlaces] = useState<Place[]>([]);

    const [loading, setLoading] = useState(true);
    const [networkError, setNetworkError] = useState(false);

    const { favoriteIds } = useFavorites();


    const fetchFavoritePlaces = async () => {

        if (!user) {
            setPlaces([]);
            setLoading(false);
            return;
        }

        try {

            setLoading(true);
            setNetworkError(false);
            const favorites =
                await UserPlaceService.getFavorites(
                    user.id
                );

            // console.log(
            //     "FAVORITES RESPONSE:"
            // );

            console.log(
                JSON.stringify(favorites, null, 2)
            );

            //console.log("CONTEXT IDS", favoriteIds);
            const placesData = await Promise.all(
            favoriteIds.map(id =>
                PlacesService.getById(id.toString())
            )
            );
            console.log(
            "PLACES TO DISPLAY",
            placesData.map(p => p.placeId)
            );

            setPlaces(placesData);

        } catch (error: any) {

            console.log(
                error?.response?.data ||
                error.message
            );

            if (error.isNetworkError) {
                setNetworkError(true);
            }

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        // console.log("VISITED EFFECT FIRED", favoriteIds);
        fetchFavoritePlaces();
    }, [user, favoriteIds]);

    // console.log("FAVORITE IDS IN SCREEN:", favoriteIds);


    if (networkError) {
        return (
            <NetworkError
                onRetry={fetchFavoritePlaces}
            />
        );
    }
    return (
        <Box flex={1} bg="$backgroundLight0">
            {loading && <LoadingOverlay />}

            <VStack
                flex={1}
                px={isTablet ? "$20" : "$6"}
                py={isTablet ? "$10" : "$6"}
                justifyContent="space-between"
                minHeight={isTablet ? 400 : 350}
            >

                {/* 1. Заголовок */}
                <Text
                    mt={isTablet ? "$20" : "$12"}
                    fontSize={
                        isTablet
                            ? "$4xl"
                            : "$2xl"
                    }
                    //fontWeight="$bold"
                    color="#000"
                >
                    Избранные
                </Text>

                {/* 2. Пустое состояние */}
                {places.length === 0 && !loading ? (
                    <>
                        <Center flex={1} py="$10">
                            <Text
                                textAlign="center"
                                color="#000"
                                fontSize={isTablet ? "$2xl" : "$lg"}
                                lineHeight={isTablet ? "$3xl" : "$md"}
                            >
                                Тут ничего нет...{"\n"}
                                Воспользуйтесь поиском или{"\n"}
                                пройдите опрос
                            </Text>
                        </Center>

                        {/* 3. Кнопка */}
                        <Box
                            mb="$6"
                            w="$full"
                            maxWidth={isTablet ? 400 : "100%"}
                            alignSelf="center"
                        >
                            <Button
                                variant="outline"
                                borderRadius="$xl"
                                borderColor="#CECECE"
                                h={isTablet ? 70 : 55}
                                onPress={() => router.push("/questions")}
                            >
                                <ButtonText color="#000000" fontSize={isTablet ? "$xl" : "$lg"}>
                                    Пройти опрос
                                </ButtonText>
                            </Button>
                        </Box>
                    </>
                ) : (

                    <FlatList
                        data={places}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) =>
                            item.placeId.toString()
                        }
                        renderItem={({ item }) => (

                            <PlaceCard
                                place={item}
                                onPress={() =>
                                    router.push({
                                        pathname: "/detailed_place",
                                        params: {
                                            id: item.placeId.toString(),
                                            from: "favorites",
                                            ids: JSON.stringify(favoriteIds)
                                        },
                                    })
                                }
                            />

                        )}
                        ItemSeparatorComponent={() =>
                            !isTablet ? (
                                <Box h={2} bg="$coolGray200" my="$3" mx="$5" />
                            ) : (
                                <Box h="$4" />
                            )
                        }
                    />

                )}

            </VStack>
        </Box>
    );
}