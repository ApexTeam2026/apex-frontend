import React, { useEffect, useState } from "react";
import { ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { Box, Text, VStack, HStack } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";

export default function PlaceScreen() {
    const [place, setPlace] = useState<any>(null);
    const [rating, setRating] = useState<number>(0);
    const [liked, setLiked] = useState(false);

    // Заглушка бэка
    useEffect(() => {
        setTimeout(() => {
            setPlace({
                name: "KARIN",
                address: "ул. Примерная, 12",
                workTime: "Пн-Сб 10:00–23:00",
                site: "https://example.com",
                type: "Ресторан",
                category: "Семейный",
                price: 1500,
                rating: 4.5,
                description:
                    "Описание приходит с бэка.",
                images: [
                    "https://avatars.mds.yandex.net/get-altay/7690462/2a000001888ef96f495f3c849259e3511cc8/XXXL",
                    "https://picsum.photos/600/401",
                ],
                features: [
                    { icon: "car-outline", label: "Парковка" },
                    { icon: "wifi-outline", label: "Wi-Fi" },
                    { icon: "flash-outline", label: "Зарядка" },
                    { icon: "cafe-outline", label: "Еда навынос" },
                ],
            });
        }, 800);
    }, []);

    if (!place) return null;

    const handleImagePress = () => {
        Alert.alert("Картинка нажата!", "Здесь можно открыть галерею или полноэкранный просмотр.");
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
            <ScrollView>

                {/* Картинка */}
                <TouchableOpacity onPress={handleImagePress}>
                    <Box h={250}>
                        <Image
                            source={{ uri: place.images[0] }}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Box>
                </TouchableOpacity>

                <Box px="$5" py="$4">

                    {/* Название + сердечко */}
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text fontSize="$2xl" fontWeight="$bold">
                            {place.name}
                        </Text>
                        <TouchableOpacity onPress={toggleLike}>
                            <Ionicons
                                name={liked ? "heart" : "heart-outline"}
                                size={32} // размер как в примере
                                color={liked ? "#C8F751" : "#c8f751"} // закрашивается при клике
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
                            {place.workTime}
                        </Text>
                    </HStack>

                    {/* Сайт */}
                    <HStack alignItems="center" mt="$1">
                        <Ionicons name="link-outline" size={16} />
                        <Text ml="$2" color="$textLight500">
                            {place.site}
                        </Text>
                    </HStack>

                    {/* Инфо блок */}
                    <HStack justifyContent="space-between" mt="$4">
                        <VStack alignItems="center">
                            <Ionicons name="restaurant-outline" size={20} />
                            <Text>{place.type}</Text>
                        </VStack>
                        <VStack alignItems="center">
                            <Ionicons name="people-outline" size={20} />
                            <Text>{place.category}</Text>
                        </VStack>
                        <VStack alignItems="center">
                            <Ionicons name="pricetag-outline" size={20} />
                            <Text>{place.price}</Text>
                        </VStack>
                        <VStack alignItems="center">
                            <Ionicons name="star-outline" size={20} />
                            <Text>{place.rating}</Text>
                        </VStack>
                    </HStack>

                    {/* Фичи */}
                    <HStack justifyContent="space-between" mt="$5">
                        {place.features.map((item: any, index: number) => (
                            <VStack key={index} alignItems="center">
                                <Ionicons name={item.icon} size={20} />
                                <Text fontSize="$xs">{item.label}</Text>
                            </VStack>
                        ))}
                    </HStack>

                    {/* Описание */}
                    <Text mt="$5" color="$textLight700">
                        {place.description}
                    </Text>

                    {/* Рейтинг */}
                    <Box mt="$6">
                        <Text mb="$2">Оцените место</Text>
                        <HStack space="md">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => handleStarPress(star)}
                                    activeOpacity={1} // звезды не светлеют при нажатии
                                >
                                    <Ionicons
                                        name={star <= rating ? "star" : "star-outline"}
                                        size={28}
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