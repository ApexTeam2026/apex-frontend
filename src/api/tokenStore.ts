import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "auth_token";

let token: string | null = null;

export const TokenStore = {
  set: async (newToken: string | null) => {
    token = newToken;

    if (newToken) {
      await AsyncStorage.setItem(TOKEN_KEY, newToken);
    } else {
      await AsyncStorage.removeItem(TOKEN_KEY);
    }
  },

  get: () => token,

  load: async () => {
    token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  },
};