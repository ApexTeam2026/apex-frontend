import React, { useEffect, useState } from "react";
import { ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { Box, Text, VStack, HStack } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Place } from "@/src/types/place";
import { PlacesService } from "@/src/api/services/places-service";

import { useFavorites } from "@/src/providers/FavoritesProvider";
import { useAuth } from "@/src/hooks/useAuth";
import { AuthRequiredModal } from "@/src/components/ui/auth-required-modal";

export default function PlaceScreen() {
    const { id, from } = useLocalSearchParams();
    const [place, setPlace] = useState<Place | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    //const [rating, setRating] = useState<number>(0);
    const router = useRouter();

    const [showAuthModal, setShowAuthModal] =
    useState(false);

    const [showRatingAuthModal, setShowRatingAuthModal] =
    useState(false);

    const { 
        isFavorite, 
        toggleFavorite, 
        setPlaceRating,
        ratings
    } = useFavorites();

    const { user } = useAuth();

    useEffect(() => {

        if (!id) return;

        const fetchPlace = async () => {

            try {

                setIsLoading(true);

                const data =
                    await PlacesService.getById(
                        id as string
                    );

                setPlace(data);

            } catch (error: any) {

                console.log(
                    "GET PLACE ERROR:"
                );

                console.log(
                    error?.response?.data ||
                    error.message
                );

            } finally {

                setIsLoading(false);
            }
        };

        fetchPlace();

    }, [id]);

    if (!place) return null;

    const liked =
        isFavorite(place.placeId);

    const currentRating =
        ratings[place.placeId] || 0;

    const handleImagePress = () => { Alert.alert("Картинка нажата!"); };

    const handleFavoritePress =
        async () => {

            if (!user) {

                setShowAuthModal(true);

                return;
            }

            await toggleFavorite(
                place.placeId
            );
        };

    const handleStarPress =
        async (star: number) => {

            if (!user) {

                setShowRatingAuthModal(true);

                return;
            }

            try {

                await setPlaceRating(
                    place.placeId,
                    star
                );

                Alert.alert(
                    "Спасибо!",
                    `Вы оценили место на ${star}`
                );

            } catch (error) {

                console.log(
                    "SET RATING ERROR:"
                );

                console.log(error);
            }
        };

    const handleBack = () => {

        if (from === "favorites") {

            router.push("/favorites");

            return;
        }

        if (from === "visited") {

            router.push("/visited");

            return;
        }

        router.push("/all-places");
    };


    return (
        <Box flex={1} bg="$backgroundLight0">
            <Box
                position="absolute"
                top={50}
                left={20}
                zIndex={10}
            >
                <TouchableOpacity
                    onPress={handleBack}
                    style={{
                        backgroundColor: "white",
                        borderRadius: 50,
                        padding: 8,
                    }}
                    activeOpacity={0.8}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            </Box>
            <ScrollView>

                {/* Картинка */}
                <TouchableOpacity onPress={handleImagePress} activeOpacity={1}>
                    <Box h={250}>
                        <Image
                            source={{
                                uri:
                                    place.photos?.[0] ||
                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCEogQyFFHE-Y8b38Lb5ggS985jv4pgT_70Q&s"
                            }}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Box>
                </TouchableOpacity>

                <Box px="$5" py="$4">

                    {/* Название + лайк */}
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text fontSize="$2xl" fontWeight="$bold">
                            {place.name}
                        </Text>
                        <TouchableOpacity onPress={handleFavoritePress} activeOpacity={1}>
                            <Ionicons
                                name={liked ? "heart" : "heart-outline"}
                                size={32}
                                color="#C8F751"
                            />
                        </TouchableOpacity>
                    </HStack>

                    {/* Адрес */}
                    <HStack alignItems="center" mt="$2">
                        <Ionicons name="location-outline" size={16} />
                        <Text ml="$2" color="$textLight500">
                            {place.address}
                        </Text>
                    </HStack>

                    {/* Время */}
                    <HStack alignItems="center" mt="$1">
                        <Ionicons name="time-outline" size={16} />
                        <Text ml="$2" color="$textLight500">
                            {place.workingHours}
                        </Text>
                    </HStack>

                    {/* Тип */}
                    <HStack alignItems="center" mt="$1">
                        <Ionicons name="grid-outline" size={16} />
                        <Text ml="$2" color="$textLight500">
                            {place.category}
                        </Text>
                    </HStack>

                    {/* Рейтинг */}
                    <HStack alignItems="center" mt="$1">
                        <Ionicons name="star-outline" size={16} />
                        <Text ml="$2" color="$textLight500">
                            {place.rate ?? "Нет оценок"}
                        </Text>
                    </HStack>

                    {/* Теги */}
                    <HStack mt="$3" flexWrap="wrap">
                        {place.tags?.map((tag, index) => (
                            <Box
                                key={index}
                                bg="$backgroundLight200"
                                px="$2"
                                py="$1"
                                mr="$2"
                                mb="$2"
                                borderRadius="$sm"
                            >
                                <Text fontSize="$xs">{tag}</Text>
                            </Box>
                        ))}
                    </HStack>

                    {/* Описание */}
                    {place.description && (
                        <Box mt="$5">
                            <Text
                                fontSize="$lg"
                                fontWeight="$bold"
                                mb="$2"
                            >
                                Описание
                            </Text>

                            <Text
                                fontSize="$md"
                                lineHeight="$lg"
                                color="$textLight700"
                            >
                                {place.description}
                            </Text>
                        </Box>
                    )}

                    {/* Рейтинг пользователя */}
                    <Box mt="$6">
                        <Text mb="$2">Оцените место</Text>
                        <HStack space="md" justifyContent="center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => handleStarPress(star)}
                                    activeOpacity={1}
                                >
                                    <Ionicons
                                        name={star <= currentRating ? "star" : "star-outline"}
                                        size={32}
                                        color="#C8F751"
                                    />
                                </TouchableOpacity>
                            ))}
                        </HStack>
                    </Box>

                </Box>
            </ScrollView>
            <AuthRequiredModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onLoginPress={() => {
                    setShowAuthModal(false);

                    router.push("/profile");
                }}
            />

            <AuthRequiredModal
                isOpen={showRatingAuthModal}
                onClose={() =>
                    setShowRatingAuthModal(false)
                }
                onLoginPress={() => {
                    setShowRatingAuthModal(false);

                    router.push("/profile");
                }}
            />
        </Box>
    );
}