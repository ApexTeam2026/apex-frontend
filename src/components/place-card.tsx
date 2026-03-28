import React from "react";
import { useState } from "react";
import {
  Box,
  Text,
  Image,
  HStack,
  VStack,
  Icon,
  Pressable,
  Button,
  ButtonIcon
} from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Place } from "@/src/data/places";

type PlaceCardProps = {
  place: Place;
  onPress: () => void;
};

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false); // состояние загрузки

    const toggleLike = async () => {
        if (isLiking) return; // предотвращаем повторные нажатия во время запроса

        setIsLiking(true);
        
        // Заглушка: имитация запроса к серверу
        try {
        // В будущем здесь будет реальный вызов API:
        // const response = await api.likePlace(place.id, !isLiked);
        
        // Имитация задержки сети (можно убрать или оставить для теста)
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Если запрос успешен, меняем состояние
        setIsLiked(!isLiked);
        } catch (error) {
        // Обработка ошибки (показать уведомление и т.п.)
        console.error("Failed to like place:", error);
        } finally {
        setIsLiking(false);
        }
    };
    return (
    <Pressable onPress={onPress}>
      <Box
        bg="$white"
        mb="$4"
        borderRadius = "$xl"
        elevation={5}
      >
        <Box
        borderTopLeftRadius="$xl"
        borderTopRightRadius="$xl"
        borderBottomLeftRadius="$xl"
        borderBottomRightRadius="$xl"
        overflow="hidden"
        >
            <Image
                source={{ uri: place.image }}
                alt="place"
                w="100%"
                h={180}
            />
        </Box>
        

        <VStack p="$2" space="xs">
            <HStack justifyContent="space-between" alignContent="center">
                <Text 
                    fontSize="$lg" 
                    fontWeight="$bold" 
                    color = "$black"
                >
                {place.title}
                </Text>

                <HStack space="xs">
                    <Ionicons name="star" size={16} color="#C8F751" />              
                    <Text>{place.rating}</Text>
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
                            {place.schedule}
                        </Text>
                    </HStack>
                </VStack>

                <VStack alignItems="flex-end" space="xs">
                    <Text fontSize="$sm" color="$gray400">{place.type}</Text>
                    <Pressable onPress={toggleLike}>
                        <Ionicons
                            name={isLiked ? "heart" : "heart-outline"}
                            size={16}
                            color={isLiked ? "#C8F751" : "gray"}
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