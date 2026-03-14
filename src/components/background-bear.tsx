import React from "react";
import { Box } from "@gluestack-ui/themed";
import Bear from "@/src/assets/images/bear-perm.svg";

export default function BackgroundBear() {
  return (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
      alignItems="center"
      justifyContent="center"
      pointerEvents="none"
    >
      <Bear width={350} height={350} opacity={1.75} />
    </Box>
  );
}