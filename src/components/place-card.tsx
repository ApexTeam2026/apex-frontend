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

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress }) => {

    const [showAuthModal, setShowAuthModal] =
    useState(false);

    const { user } = useAuth();

    const router = useRouter();
    
    const { isFavorite, toggleFavorite } =
    useFavorites();

    const liked = isFavorite(place.placeId);
    const handleFavoritePress = async () => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }

        await toggleFavorite(place.placeId);
    };

    return (
    <Pressable onPress={onPress}>
      <Box
        bg="$white"
        mt="$4"
        borderRadius="$2xl"
        >
        <Box
        borderTopLeftRadius="$xl"
        borderTopRightRadius="$xl"
        borderBottomLeftRadius="$xl"
        borderBottomRightRadius="$xl"
        overflow="hidden"
        >
        <Image
            source={{ uri:
            place.photos?.[0] ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCEogQyFFHE-Y8b38Lb5ggS985jv4pgT_70Q&s", }}
            alt="place"
            w="100%"
            h={180}
        />
        </Box>
        

        <VStack p="$2" space="xs">
            <HStack justifyContent="space-between" alignContent="center">
                <Text 
                    fontSize="$lg"  
                    color = "$black"
                    style={{
                        fontFamily: "Montserrat_600SemiBold",
                    }}
                >
                {place.name}
                </Text>

                <HStack space="xs">
                    <Ionicons name="star" size={16} color="#C8F751" />              
                    <Text>{place.rate}</Text>
                </HStack>
            </HStack>

            <HStack justifyContent="space-between" alignContent="center">
                <VStack space="xs">
                    <HStack gap={5}>
                        <Ionicons name="location-outline" size={16} color="grey" /> 
                        <Text 
                            fontSize="$sm" 
                            fontWeight="$semi-bold" 
                            color="$gray500"
                            numberOfLines={2} 
                            ellipsizeMode="tail"
                            style={{ maxWidth: 180 }}
                        > 
                            {place.address}
                        </Text>
                    </HStack>
                    <HStack gap={5}>
                        <Ionicons name="time-outline" size={16} color="grey" /> 
                        <Text 
                            fontSize="$sm" 
                            fontWeight="$semi-bold" 
                            color="$gray500"
                            numberOfLines={2} 
                            ellipsizeMode="tail"
                            style={{ maxWidth: 180 }}
                        >
                            {place.workingHours}
                        </Text>
                    </HStack>
                </VStack>

                <VStack alignItems="flex-end" space="xs">
                    <Text fontSize="$sm" color="$gray400">{place.category}</Text>
                    <Pressable onPress={handleFavoritePress}>
                        <Ionicons
                            name={liked  ? "heart" : "heart-outline"}
                            size={16}
                            color={liked  ? "#C8F751" : "gray"}
                        />
                        <AuthRequiredModal
                            isOpen={showAuthModal}
                            onClose={() => setShowAuthModal(false)}
                            onLoginPress={() => {
                                setShowAuthModal(false);

                                router.push("/profile");
                            }}
                        />
                    </Pressable>
                </VStack>
                
            </HStack>

        </VStack>

      </Box>
    </Pressable>
  );
};

export default PlaceCard;