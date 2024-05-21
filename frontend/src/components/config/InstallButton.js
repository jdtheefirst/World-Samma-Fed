// src/components/InstallButton.js
import React from "react";
import useInstallPrompt from "./useInstallPrompt";
import { Button } from "@chakra-ui/button";

const InstallButton = () => {
  const { isInstallable, promptInstall } = useInstallPrompt();

  if (!isInstallable) {
    return null;
  }

  return (
    <Button
      id="installButton"
      onClick={promptInstall}
      style={{ display: "block" }}
    >
      Install App
    </Button>
  );
};

export default InstallButton;
