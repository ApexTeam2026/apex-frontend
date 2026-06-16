import React from "react";
import { Box, Text, HStack } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  text?: string;
}

export default function NetworkBanner({
  text = "Нет подключения к интернету",
}: Props) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isTablet = width > 768;

  return (
    <Box
      //position="absolute"
      top={insets.top + 16}
      alignSelf="center"
      width={isTablet ? 560 : "92%"}
      maxWidth={650}
      zIndex={10000}
      bg="$white"
      borderWidth={1}
      borderColor="#CECECE"
      borderRadius="$xl"
      px="$5"
      py="$4"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.08}
      shadowRadius={8}
      elevation={3}
    >
      <HStack
        space="sm"
        alignItems="center"
      >
        <Ionicons
          name="cloud-offline-outline"
          size={24}
          color="#C25353"
        />

        <Text
          flex={1}
          color="#000"
          fontSize={isTablet ? "$md" : "$sm"}
        >
          {text}
        </Text>
      </HStack>
    </Box>
  );
}