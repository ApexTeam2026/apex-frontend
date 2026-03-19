import { Button, Text, Box, Center } from "@gluestack-ui/themed";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Login() {
  const { login, user } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login({ name: "User" }); // обновляем контекст
  };

  // когда user поменялся → редиректим
  useEffect(() => {
    if (user) {
      router.replace("/(tabs)/profile");
    }
  }, [user]);

  return (
    <Box flex={1} bg="$backgroundLight0">
      <Center flex={1}>
        <Text>Login</Text>
        <Button onPress={handleLogin}>
          <Text>Войти</Text>
        </Button>
      </Center>
    </Box>
    
  );
}