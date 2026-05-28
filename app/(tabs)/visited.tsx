import React, { useEffect, useState } from "react";
import { Box, Text, Button, ButtonText, Center, VStack } from "@gluestack-ui/themed";
import {FlatList, useWindowDimensions} from "react-native";
import { router } from "expo-router";

import PlaceCard from "@/src/components/place-card";
import { Place } from "@/src/types/place";

import { PlacesService} from "@/src/api/services/places-service";
import { useFavorites } from "@/src/providers/FavoritesProvider";
import { useAuth } from "@/src/hooks/useAuth";

export default function VisitedScreen() {
    const { user } = useAuth();
    const { ratings, visitedIds } = useFavorites();
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);

    const { width } =
        useWindowDimensions();

    const isTablet =
        width > 768;

    useEffect(() => {

        const fetchVisitedPlaces =
            async () => {

                if (!user) {

                    setPlaces([]);
                    setLoading(false);

                    return;
                }

                try {

                    setLoading(true);

                    console.log(
                        "VISITED IDS:",
                        visitedIds
                    );

                    const placesData =
                        await Promise.all(

                            visitedIds.map(
                                async (
                                    placeId
                                ) => {

                                    return await PlacesService.getById(
                                        placeId.toString()
                                    );
                                }
                            )
                        );

                    setPlaces(
                        placesData
                    );

                } catch (error: any) {

                    console.log(
                        "VISITED SCREEN ERROR:"
                    );

                    console.log(
                        error?.response?.data ||
                        error.message
                    );

                } finally {

                    setLoading(false);
                }
            };

        fetchVisitedPlaces();

    }, [user, visitedIds]);

    console.log("VISITED IDS IN SCREEN:", visitedIds);
    if (loading) {

        return (

            <Center flex={1}>

                <Text>
                    Загрузка...
                </Text>

            </Center>
        );
    }
    return (

        <Box
            flex={1}
            bg="$backgroundLight0"
        >

            <VStack
                flex={1}
                px={isTablet ? "$20" : "$6"}
                py={isTablet ? "$10" : "$6"}
            >

                <Text
                    mt={isTablet ? "$20" : "$12"}
                    fontSize={
                        isTablet
                            ? "$4xl"
                            : "$2xl"
                    }
                >
                    Посещенные
                </Text>

                {places.length === 0 ? (

                    <>
                        <Center
                            flex={1}
                            py="$10"
                        >

                            <Text
                                textAlign="center"
                                color="#000"
                                fontSize={
                                    isTablet
                                        ? "$2xl"
                                        : "$lg"
                                }
                            >
                                Тут ничего нет...
                                {"\n"}
                                Воспользуйтесь поиском
                                или{"\n"}
                                пройдите опрос
                            </Text>

                        </Center>

                        <Box
                            mb="$6"
                            w="$full"
                            maxWidth={
                                isTablet
                                    ? 400
                                    : "100%"
                            }
                            alignSelf="center"
                        >

                            <Button
                                variant="outline"
                                borderRadius="$xl"
                                borderColor="#CECECE"
                                h={
                                    isTablet
                                        ? 70
                                        : 55
                                }
                                onPress={() =>
                                    router.push(
                                        "/questions"
                                    )
                                }
                            >

                                <ButtonText
                                    color="#000000"
                                    fontSize={
                                        isTablet
                                            ? "$xl"
                                            : "$lg"
                                    }
                                >
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
                                        pathname:
                                            "/detailed_place",

                                        params: {
                                            id:
                                                item.placeId.toString(),

                                            from:
                                                "visited",
                                        },
                                    })
                                }
                            />
                        )}
                    />
                )}

            </VStack>

        </Box>
    );
}