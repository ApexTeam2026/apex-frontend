import React, { useEffect } from "react";
import { Center, Text, VStack, Box } from "@gluestack-ui/themed";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    Easing,
    FadeIn,
    FadeOut
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const LoadingOverlay = ({ message = "Загрузка..." }: { message?: string }) => {
    const scale = useSharedValue(1);
    const rotation = useSharedValue(0);

    useEffect(() => {
        
        scale.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: 800, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
                withTiming(1, { duration: 800 })
            ),
            -1,
            true
        );
        
        rotation.value = withRepeat(
            withTiming(360, { duration: 2000, easing: Easing.linear }),
            -1
        );
    }, []);

    const animatedIconStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { rotate: `${rotation.value}deg` }
        ],
    }));

    return (
        <Animated.View
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(400)}
            style={styles.overlay}
        >
            <Center flex={1}>
                <VStack space="lg" alignItems="center">
                   
                    <Animated.View style={animatedIconStyle}>
                        <Box
                            w={70}
                            h={70}
                            borderRadius={35}
                            bg="rgba(200, 247, 81, 0.15)" 
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Ionicons name="sync-outline" size={40} color="#C8F751" />
                        </Box>
                    </Animated.View>

                    <Animated.View entering={FadeIn.delay(200)}>
                        <Text
                            color="#555"
                            fontSize="$md"
                            fontWeight="$medium"
                            style={{ letterSpacing: 0.5 }}
                        >
                            {message.toUpperCase()}
                        </Text>
                    </Animated.View>
                </VStack>
            </Center>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.92)', 
        zIndex: 9999,
    }
});