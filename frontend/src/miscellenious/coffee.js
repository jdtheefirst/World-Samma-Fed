import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CoffeeModal = ({ isOpen, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState(Number);
  const toast = useToast();

  console.log(selectedAmount);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
          Choose an amount
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!selectedAmount ? (
            <RadioGroup value={selectedAmount} onChange={setSelectedAmount}>
              <Stack spacing={3}>
                <Radio value={5}>$5 - Thank you!</Radio>
                <Radio value={10}>$10 - Much appreciated!</Radio>
                <Radio value={20}>$20 - Your support means a lot!</Radio>
                <Radio value={30}>$30 - You're amazing!</Radio>
              </Stack>
            </RadioGroup>
          ) : (
            <PayPalScriptProvider
              options={{
                clientId:
                  "AZ5Pdn0aioG6OzW6n4Q7W64LxkdOhS0wEIOAn_UmF5askK41E72ejdrsHPJoFIcg0atbN-WZG14fd6oc",
              }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: selectedAmount,
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  return actions.order.capture().then(function (details) {
                    toast({
                      title: "Transaction Successful",
                      description: "Thank you for your support!",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                      position: "bottom",
                    });
                  });
                }}
                onCancel={() => {
                  toast({
                    title: "Transaction Canceled",
                    description: "Thank you for considering!",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom",
                  });
                }}
              />
            </PayPalScriptProvider>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CoffeeModal;
