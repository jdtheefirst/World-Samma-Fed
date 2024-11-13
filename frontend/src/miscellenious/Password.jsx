import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  HStack,
  PinInput,
  PinInputField,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const PasskeyModal = ({ isOpen, onClose }) => {
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePasskey = () => {
    if (passkey === process.env.REACT_APP_ADMIN_PASSKEY) {
      navigate("/admin");
      onClose(); // Close the modal after successful validation
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Admin Access Verification</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="center">
            <Text>To access the admin page, please enter the passkey.</Text>
            <HStack>
              <PinInput
                value={passkey}
                onChange={(value) => {
                  setPasskey(value);
                  setError(""); // Clear error on input change
                }}
                type="number"
                autoFocus
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            {error && <Text color="red.500">{error}</Text>}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={validatePasskey} width="full">
            Enter Admin Passkey
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
