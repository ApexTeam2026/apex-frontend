import { Box, Text, Center } from "@gluestack-ui/themed";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppHeader() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={["top"]}>
      <Box py="$4" bg="$backgroundLight0">
        <Center>
          <Text
            color="#C8F751"
            fontSize="$3xl"
            fontWeight="$medium"
          >
            /Пермь
          </Text>
        </Center>
      </Box>
    </SafeAreaView>
  );
}