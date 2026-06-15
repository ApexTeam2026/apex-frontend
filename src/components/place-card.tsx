import React from "react";
import { useState } from "react";

import {
  Box,
  Text,
  Image,
  HStack,
  VStack,
  Pressable
} from "@gluestack-ui/themed";

import { Ionicons } from "@expo/vector-icons";

import { Place } from "@/src/types/place";

import { useAuth } from "@/src/hooks/useAuth";
import { useFavorites } from "@/src/providers/FavoritesProvider";

import { AuthRequiredModal } from "@/src/components/ui/auth-required-modal";
import { useRouter } from "expo-router";

type PlaceCardProps = {
  place: Place;
  onPress: () => void;
};

const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  onPress,
}) => {

  //console.log("PLACE CARD RENDER", place.placeId);
  const [showAuthModal, setShowAuthModal] =
    useState(false);

  const { user } = useAuth();

  const router = useRouter();

  const {
    isFavorite,
    toggleFavorite,
    ratings,
  } = useFavorites();

  const liked = isFavorite(place.placeId);

  const userRating = ratings[place.placeId] || 0;

  const handleFavoritePress =
    async () => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }

        await toggleFavorite(place.placeId);
    };

  const formatAddress = (address?: string) => {
  if (!address) return "Адрес не указан";

  return address
    .replace(/^г\.?\s*Пермь,?\s*/i, "")
    .replace(/^Пермь,\s*/i, "")
    .trim();
  };

  const placeName = place.name || "Без названия";
  const placeAddress = formatAddress(place.address);
  const placeHours = place.workingHours || "Время работы неизвестно";
  const placeCategory = place.category || "Без категории";

  const placeRating =
  place.rate && Number(place.rate) > 0
    ? place.rate
    : "Нет оценки";


  return (

    <Pressable onPress={onPress}>

      <Box
        bg="$white"
        mt="$4"
        borderRadius="$2xl"
      >

        {/* image */}
        <Box
          borderTopLeftRadius="$xl"
          borderTopRightRadius="$xl"
          borderBottomLeftRadius="$xl"
          borderBottomRightRadius="$xl"
          overflow="hidden"
        >

          <Image
            source={{
              uri:
                place.photos?.[0] ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCEogQyFFHE-Y8b38Lb5ggS985jv4pgT_70Q&s",
            }}
            alt="place"
            w="100%"
            h={180}
          />

        </Box>

        <VStack p="$2" space="xs">

          {/* title */}
          <HStack
            justifyContent="space-between"
            alignItems="flex-start"
            space="sm"
          >
            <Text
              flexWrap="wrap"
              fontSize="$lg"
              color="$black"
              style={{
                fontFamily: "Montserrat_600SemiBold",
              }}
            >
              {placeName}
            </Text>

            <HStack
              space="xs"
              alignItems="center"
              flexShrink={0}
            >
              <Ionicons
                name="star"
                size={16}
                color="#C8F751"
              />

              <Text
                fontSize="$sm"
                color="$gray700"
              >
                {placeRating}
              </Text>
            </HStack>
          </HStack>

          {/* content */}
          <HStack
            justifyContent="space-between"
            alignItems="flex-start"          
          >

            {/* left */}
            <VStack space="xs" flex={1} maxWidth="75%">

              {/* address */}
              <HStack gap={5}>
                <Ionicons
                  name="location-outline"
                  size={16}
                  color="grey"
                />

                <Text
                  fontSize="$sm"
                  color="$gray500"
                  flexWrap="wrap"
                >
                  {placeAddress}
                </Text>
              </HStack>

              {/* hours */}
              <HStack gap={5}>
                <Ionicons
                  name="time-outline"
                  size={16}
                  color="grey"
                />

                <Text
                  flex={1}
                  fontSize="$sm"
                  color="$gray500"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {placeHours}
                </Text>
              </HStack>

            </VStack>

            {/* right */}
            <VStack
              alignItems="flex-end"
              space="xs"
              width={120}
            >

              <Text
                fontSize="$sm"
                color="$gray400"
                textAlign="right"
                numberOfLines={2}
              >
                {placeCategory}
              </Text>

              {/* favorite */}
              <Pressable
                onPress={handleFavoritePress}
              >

                <Ionicons
                  name={
                    liked
                      ? "heart"
                      : "heart-outline"
                  }
                  size={18}
                  color={
                    liked
                      ? "#C8F751"
                      : "gray"
                  }
                />

              </Pressable>

              {/* USER RATING */}
              {userRating > 0 ? (
                <HStack space="xs">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={
                        star <= userRating
                          ? "star"
                          : "star-outline"
                      }
                      size={18}
                      color="#C8F751"
                    />
                  ))}
                </HStack>
              ) : (
                <Text
                  fontSize="$xs"
                  color="$gray400"
                >
                  Не оценено
                </Text>
              )}

            </VStack>

          </HStack>

        </VStack>

      </Box>

      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() =>
          setShowAuthModal(false)
        }
        onLoginPress={() => {

          setShowAuthModal(false);

          router.push("/profile");
        }}
      />

    </Pressable>
  );
};

export default React.memo(PlaceCard);