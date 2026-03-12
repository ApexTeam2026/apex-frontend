import { Box, Center, Text } from "@gluestack-ui/themed";

export default function ProfileScreen() {
  return (
    <Box flex={1} bg="$backgroundLight0">
      <Center flex={1}>
        <Text fontSize="$xl">
          Профиль
        </Text>
      </Center>
    </Box>
  );
}