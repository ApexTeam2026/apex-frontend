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
import { MaterialIcons } from "@expo/vector-icons";

const normalizeTag = (tag: string) => {
  return tag
    .trim()
    .toLowerCase()
    // фиксим кириллицу, которая выглядит как латиница
    .replace(/а/g, "a")
    .replace(/с/g, "c")
    .replace(/е/g, "e")
    .replace(/о/g, "o")
    .replace(/р/g, "p")
    .replace(/х/g, "x");
};

const tagLabels: Record<string, string> = {
    // Количество людей
    solo: "Для одного",
    friends: "Для компании",
    family: "Для семьи",
    kids: "Для детей",

    // Были ли в Перми
    newcomer: "Для новичков",
    local: "Для местных",

    // Бюджет
    free: "Бесплатно",
    low_budget: "Низкий чек",
    medium_budget: "Средний чек",
    high_budget: "Высокий чек",

    // Еда
    food: "Есть еда",
    no_food: "Без еды",

    // Активность
    active: "Активный отдых",
    relax: "Спокойный отдых",

    // Время суток
    morning: "Утром",
    daytime: "Днем",
    evening: "Вечером",
    night: "Ночью",

    // Настроение
    relaxed: "Расслабленно",
    fun: "Весело",
    romantic: "Романтично",
    curios: "Познавательно",
    energetic: "Энергично",

    // Культурность
    culture: "Культурное место",
    non_culture: "Некультурный отдых",

    // Дополнительные
    indoor: "В помещении",
    outdoor: "На улице",
    historic: "Историческое место",
    modern: "Современное место",
    nature: "Природа",
    cafe: "Кафе или ресторан",

    short_visit: "До 1 часа",
    medium_visit: "1–2 часа",
    long_visit: "Более 3 часов",

    kids_play: "Игровая площадка",
    kids_culture: "Развивающее место",
    kids_calm: "Спокойный отдых для детей",

    unique: "Необычное место",
    classic: "Классическое место",
};
const tagIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
    // Количество людей
    solo: "person-outline",
    friends: "people-outline",
    family: "home-outline",
    kids: "happy-outline",

    // Были ли в Перми
    newcomer: "compass-outline",
    local: "location-outline",

    // Бюджет
    free: "cash-outline",
    low_budget: "cash-outline",
    medium_budget: "card-outline",
    high_budget: "wallet-outline",

    // Еда
    food: "restaurant-outline",
    no_food: "close-circle-outline",

    // Активность
    active: "bicycle-outline",
    relax: "bed-outline",

    // Время суток
    morning: "sunny-outline",
    daytime: "partly-sunny-outline",
    evening: "moon-outline",
    night: "moon-outline",

    // Настроение
    relaxed: "flower-outline",
    fun: "happy-outline",
    romantic: "heart-outline",
    curios: "book-outline",
    energetic: "flash-outline",

    // Культурность
    culture: "library-outline",
    non_culture: "walk-outline",

    // Дополнительные
    indoor: "business-outline",
    outdoor: "leaf-outline",
    historic: "hourglass-outline",
    modern: "rocket-outline",
    nature: "flower-outline",
    cafe: "cafe-outline",

    short_visit: "time-outline",
    medium_visit: "timer-outline",
    long_visit: "hourglass-outline",

    kids_play: "football-outline",
    kids_culture: "school-outline",
    kids_calm: "body-outline",

    unique: "diamond-outline",
    classic: "star-outline",
};
export default function PlaceScreen() {
    const { id, from, ids } = useLocalSearchParams();
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
  if (from === "final_page") {
    router.push({
      pathname: "/final_page",
      params: {
        ids: String(ids),
      },
    });

    return;
  }
  if(from === "visited") {
    router.push("/visited")
    return;

  }
  if(from === "favorites") {
    router.push("/favorites")
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
                    <HStack justifyContent="space-between" alignItems="flex-start" space="sm">
                        <Text 
                            flex = {1}
                            flexWrap="wrap"
                            fontSize="$2xl" 
                            color = "#000" 
                            mr="$2"
                            style={{
                                fontFamily:
                                    "Montserrat_600SemiBold",
                            }}
                        >
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
                        <Text ml="$2" color = "#000">
                            {place.address}
                        </Text>
                    </HStack>

                    {/* Время */}
                    <HStack alignItems="center" mt="$1">
                        <Ionicons name="time-outline" size={16} />
                        <Text ml="$2" color = "#000">
                            {place.workingHours}
                        </Text>
                    </HStack>

                    {/* Тип */}
                    <HStack alignItems="center" mt="$1">
                        <Ionicons name="grid-outline" size={16} />
                        <Text ml="$2" color = "#000">
                            {place.category}
                        </Text>
                    </HStack>

                    {/* Рейтинг */}
                    <HStack alignItems="center" mt="$1">
                        <Ionicons name="star-outline" size={16} />
                        <Text ml="$2" color = "#000">
                            {place.rate ?? "Нет оценок"}
                        </Text>
                    </HStack>

                    {/* Теги */}
                    <HStack mt="$3" flexWrap="wrap">
    {place.tags?.map((tag, index) => (
        <HStack
            key={index}
            alignItems="center"
            bg="#F2F2F2"
            px="$3"
            py="$2"
            mr="$2"
            mb="$2"
            borderRadius={10}
        >
            <Ionicons
                name={tagIcons[tag] || "pricetag-outline"}
                size={14}
                color="#666"
                style={{ marginRight: 6 }}
            />

            <Text
                fontSize="$xs"
            >
                {tagLabels[tag] || tag}
            </Text>
        </HStack>
    ))}
</HStack>

                    {/* Описание */}
                    {place.description && (
                        <Box mt="$5">
                            <Text
                                fontSize="$lg"
                                mb="$2"
                                color = "#000"
                                style={{
                                fontFamily:
                                    "Montserrat_600SemiBold",
                                }}
                            >
                                Описание
                            </Text>

                            <Text
                                fontSize="$md"
                                lineHeight="$lg"
                                color = "#000"
                            >
                                {place.description}
                            </Text>
                        </Box>
                    )}

                    {/* Рейтинг пользователя */}
                    <Box mt="$6">
                        <Text mb="$2" color = "#000">Оцените место</Text>
                        <HStack space="md" justifyContent="center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => handleStarPress(star)}
                                    activeOpacity={0.7}
                                >
                                    <MaterialIcons
                                        name={star <= currentRating ? "star" : "star-outline"}
                                        size={32}
                                        color={currentRating > 0 ? "#C8F751" : "#000"}
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