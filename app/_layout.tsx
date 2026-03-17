import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import Bear from "@/src/assets/images/bear-splash.svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { GluestackUIProvider } from "@gluestack-ui/themed";

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
    // Появление splash
    opacity.value = withTiming(1, { duration: 500 });

    const timer = setTimeout(() => {
      // Уход splash
      opacity.value = withTiming(
        0,
        { duration: 800 },
        (isFinished) => {
          if (isFinished) runOnJS(setHidden)(true); // скрываем после анимации
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
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="survey/index" />
      </Stack>

      {/* Splash */}
      {!hidden && (
        <Animated.View style={[styles.splash, animatedStyle]}>
          <Bear />
        </Animated.View>
      )}
    </GluestackUIProvider>
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