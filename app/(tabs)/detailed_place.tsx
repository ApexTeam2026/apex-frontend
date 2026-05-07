import React, { useEffect, useState } from "react";
import { ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { Box, Text, VStack, HStack } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { places, Place } from "@/src/data/places"; // поправь путь

export default function PlaceScreen() {
    const { id } = useLocalSearchParams();
    const [place, setPlace] = useState<Place | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [liked, setLiked] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
        if (!id) return;

        const foundPlace = places.find(p => p.placeId === Number(id));
        if (foundPlace) {
            setPlace(foundPlace);
        }
    }, [id]);

    if (!place) return null;

    const handleImagePress = () => {
        Alert.alert("Картинка нажата!");
    };

    const handleStarPress = (star: number) => {
        setRating(star);
        Alert.alert("Вы оценили место", `Ваша оценка: ${star} звезд`);
    };

    const toggleLike = () => {
        setLiked(!liked);
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
        onPress={() => router.back()}
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
                            source={{ uri: place.image }}
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
                        <TouchableOpacity onPress={toggleLike} activeOpacity={1}>
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
                            {place.rate}
                        </Text>
                    </HStack>

                    {/* Теги */}
                    <HStack mt="$3" flexWrap="wrap">
                        {place.tags.map((tag, index) => (
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
                                        name={star <= rating ? "star" : "star-outline"}
                                        size={32}
                                        color="#C8F751"
                                    />
                                </TouchableOpacity>
                            ))}
                        </HStack>
                    </Box>

                </Box>
            </ScrollView>
        </Box>
    );
}