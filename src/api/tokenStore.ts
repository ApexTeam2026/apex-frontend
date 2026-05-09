let token: string | null = null;

export const TokenStore = {
    set: (newToken: string | null) => {
        token = newToken;
    },

    get: () => token,
};