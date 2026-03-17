import { Box, Center, Text } from "@gluestack-ui/themed";

export default function AllPlacesScreen() {
  return (
    <Box flex={1} bg="$backgroundLight0">
      <Center flex={1}>
        <Text fontSize="$xl">
          Главная страница
        </Text>
      </Center>
    </Box>
  );
}