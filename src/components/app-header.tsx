import { Box, Text, Center } from "@gluestack-ui/themed";

export default function AppHeader() {
  return (
    <Box pt="$12" pb="$4" bg="$backgroundLight0">
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
  );
}