import { Box, Text, Center } from "@gluestack-ui/themed";

export default function AppHeader() {
  return (
    <Box pt="$12" pb="$4" bg="$backgroundLight0">
      <Center>
        <Text
          color="$lime400"
          fontSize="$2xl"
          fontWeight="$medium"
        >
          /Пермь
        </Text>
      </Center>
    </Box>
  );
}