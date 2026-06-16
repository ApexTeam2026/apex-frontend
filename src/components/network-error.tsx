import {
  Box,
  Text,
  Button,
  ButtonText,
  VStack,
} from "@gluestack-ui/themed";

import AppHeader from "@/src/components/app-header";

interface Props {
  onRetry: () => void;
}

export default function NetworkError({
  onRetry,
}: Props) {
  return (
    <Box
      flex={1}
      justifyContent="space-between"
      alignItems="center"
      px="$6"
      bg="$backgroundLight0"
    >
        <AppHeader />

        <VStack space="lg" alignItems="center">
    
            <Text 
                fontSize="$2xl"
                textAlign="center"
                color="#000"
            >
            Нет подключения к интернету
            </Text>

            <Text 
                fontSize="$xl"
                textAlign="center"
                color="#000"
            >
            Проверьте интернет и попробуйте ещё раз
            </Text>

            <Button
                onPress={onRetry}
                variant="outline"
                borderRadius="$lg"
                size="lg"
                borderColor="#CECECE"
                mt="$4"
            >
            <ButtonText color="#000">Повторить попытку</ButtonText>
            </Button>

      </VStack>

      <Box pb="$6">
        
      </Box>
    </Box>
  );
}