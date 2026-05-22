import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Stack } from "expo-router";
import Bear from "@/src/assets/images/bear-splash.svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { AuthProvider } from "@/src/providers/AuthProvider";
import { FavoritesProvider } from "@/src/providers/FavoritesProvider";

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import { config as defaultConfig } from "@gluestack-ui/config";

export const config = {
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    fonts: {
      heading: "Montserrat_700Bold",
      body: "Montserrat_400Regular",
      mono: "Montserrat_400Regular",
    },
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const [hidden, setHidden] = useState(false);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });

    const timer = setTimeout(() => {
      opacity.value = withTiming(
        0,
        { duration: 800 },
        (isFinished) => {
          if (isFinished) runOnJS(setHidden)(true);
        }
      );
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <FavoritesProvider>
        <GluestackUIProvider config={config}>
          
          {/* Навигация */}
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>

          {/* Splash */}
          {!hidden && (
            <Animated.View style={[styles.splash, animatedStyle]}>
              <Bear />
            </Animated.View>
          )}

        </GluestackUIProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 9999,
  },
});

