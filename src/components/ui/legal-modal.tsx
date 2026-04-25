import { Modal } from "@gluestack-ui/themed";
import { Text, ScrollView, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
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

  const translateY = useSharedValue(300);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);

      translateY.value = withTiming(0, { duration: 300 });
      backdropOpacity.value = withTiming(0.4, { duration: 300 });
    } else {
      translateY.value = withTiming(300, { duration: 220 }, () => {
        runOnJS(setVisible)(false);
      });

      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [isOpen]);

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!visible) return null;

  return (
    <Modal isOpen={visible} onClose={onClose}>
      {/* BACKDROP + TAP CLOSE */}
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
              backgroundColor: "black",
            },
            backdropStyle,
          ]}
        />
      </Pressable>

      {/* MODAL CARD */}
      <Animated.View
        style={[
          {
            marginTop: "auto",
            marginHorizontal: 16,
            marginBottom: 24,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,

            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            elevation: 12,
          },
          modalStyle,
        ]}
      >
        <Text
          style={{
            fontWeight: "600",
            fontSize: 18,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {title}
        </Text>

        <ScrollView style={{ maxHeight: 400 }}>
          <Text style={{ lineHeight: 20 }}>{content}</Text>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};