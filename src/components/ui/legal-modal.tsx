import { Modal } from "@gluestack-ui/themed";
import { Text, ScrollView, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
};

export const LegalModal = ({
  isOpen,
  onClose,
  title,
  content,
}: Props) => {
  const [visible, setVisible] = useState(isOpen);

  const translateY = useSharedValue(40);
  const backdropOpacity = useSharedValue(0);
  const modalOpacity = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);

      translateY.value = 40;
      modalOpacity.value = 0;
      backdropOpacity.value = 0;

      backdropOpacity.value = withTiming(0.4, {
        duration: 350,
      });

      modalOpacity.value = withTiming(1, {
        duration: 250,
      });

      translateY.value = withSpring(0, {
        damping: 22,
        stiffness: 180,
        mass: 0.9,
      });
    } else {
      backdropOpacity.value = withTiming(0, {
        duration: 220,
      });

      modalOpacity.value = withTiming(0, {
        duration: 180,
      });

      translateY.value = withTiming(
        40,
        {
          duration: 220,
        },
        () => {
          runOnJS(setVisible)(false);
        }
      );
    }
  }, [isOpen]);

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: modalOpacity.value,
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!visible) return null;

  return (
    <Modal isOpen={visible} onClose={onClose}>
      <Pressable
        onPress={onClose}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Animated.View
          style={[
            {
              flex: 1,
              backgroundColor: "#000",
            },
            backdropStyle,
          ]}
        />
      </Pressable>

      <Animated.View
        style={[
          {
            marginTop: "auto",
            marginHorizontal: 12,
            marginBottom: 12,

            backgroundColor: "#FFF",
            borderRadius: 28,

            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 20,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: 12,
          },
          modalStyle,
        ]}
      >

        <Animated.View
          style={{
            width: 36,
            height: 5,
            borderRadius: 999,
            backgroundColor: "#D1D1D6",
            alignSelf: "center",
            marginBottom: 14,
          }}
        />

        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          {title}
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            maxHeight: 420,
          }}
        >
          <Text
            style={{
              lineHeight: 22,
              fontSize: 15,
              color: "#1C1C1E",
            }}
          >
            {content}
          </Text>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};