import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { Box } from "@gluestack-ui/themed";

import NetworkBanner from "@/src/components/network-banner";

type ContextType = {
  showNetworkBanner: (text?: string) => void;
};

const NetworkBannerContext =
  createContext<ContextType | null>(null);

export function NetworkBannerProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showNetworkBanner = (
    text = "Нет подключения к интернету"
  ) => {

    setMessage(text);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  return (
    <NetworkBannerContext.Provider
      value={{ showNetworkBanner }}
    >
      <Box flex={1}>
        {children}

        {visible && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            pointerEvents="none"
            zIndex={9999}
          >
            <NetworkBanner text={message} />
          </Box>
        )}
      </Box>
    </NetworkBannerContext.Provider>
  );
}

export function useNetworkBanner() {

  const context =
    useContext(NetworkBannerContext);

  if (!context) {
    throw new Error(
      "useNetworkBanner must be used inside NetworkBannerProvider"
    );
  }

  return context;
}