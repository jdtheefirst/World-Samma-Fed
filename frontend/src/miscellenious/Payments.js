import React from "react";
import {
  Box,
  Text,
  useColorModeValue,
  VStack,
  useToast,
  Button,
  Image,
  Input,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { makePaymentMpesa } from "../components/config/chatlogics";
import { ChatState } from "../components/Context/ChatProvider";

export default function Paycheck({ course }) {
  const toast = useToast();
  const { user } = ChatState();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(course.title);

  return (
    <>
      <Button
        borderRadius={20}
        fontSize={"small"}
        background={"#a432a8"}
        textColor={"white"}
        _hover={{ color: "black" }}
        isDisabled={course.title === user?.belt}
        m={1}
        onClick={() => onOpen()}
      >
        Enroll
      </Button>
      <Modal
        size="lg"
        onClose={() => {
          setShow(false);
          onClose();
        }}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent width={"calc(100% - 20px)"}>
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              p={0}
              m={0}
            >
              <Text
                fontSize={"sm"}
                fontWeight={500}
                bg={useColorModeValue("green.100", "green.900")}
                p={2}
                px={3}
                color={"green.500"}
                rounded={"full"}
              >
                Elevate Your Craft: Select Your Belt & Subscribe
              </Text>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            width={"100%"}
          >
            <PayPalScriptProvider
              options={{
                clientId:
                  "AZ5Pdn0aioG6OzW6n4Q7W64LxkdOhS0wEIOAn_UmF5askK41E72ejdrsHPJoFIcg0atbN-WZG14fd6oc",
              }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  const amount = 45.0;
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: amount.toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  return actions.order.capture().then(function (details) {
                    toast({
                      title: "Success",
                      description: data.subscriptionID,
                      status: "info",
                      duration: 3000,
                      isClosable: true,
                      position: "bottom",
                    });
                  });
                }}
                onCancel={() => {
                  toast({
                    title: "Cancelled",
                    description: "Subscription Unsuccessfull",
                    status: "info",
                    isClosable: true,
                    position: "bottom",
                  });
                }}
              />
            </PayPalScriptProvider>
            <Button
              fontSize={"small"}
              width={"80%"}
              backgroundColor={"green.400"}
              color={"white"}
              onClick={() => {
                setShow(true);
              }}
              p={0}
            >
              <Image
                height={5}
                width={"auto"}
                src={
                  "https://res.cloudinary.com/dvc7i8g1a/image/upload/v1694007922/mpesa_ppfs6p.png"
                }
                alt={""}
                loading="lazy"
              />{" "}
              Pay via Mpesa
            </Button>
            {show && (
              <Box m={3}>
                <Text
                  textAlign={"center"}
                  justifyContent={"center"}
                  fontSize={"2xl"}
                >
                  Enter Your Mpesa Phone Number
                </Text>
                <Input
                  fontSize={"small"}
                  color={"green.400"}
                  fontWeight={"bold"}
                  placeholder="i.e 0710334455"
                  textAlign={"center"}
                  type="text"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  minLength={10}
                  maxLength={10}
                />
                <Divider p={2} />
                <Button
                  width={"100%"}
                  onClick={() => {
                    makePaymentMpesa(course.title, phoneNumber, user, toast);
                    setShow(false);
                    toast({
                      title: "Wait as message is sent",
                      status: "loading",
                      isClosable: true,
                      position: "bottom",
                      duration: 5000,
                    });
                  }}
                  isDisabled={phoneNumber.length !== parseInt(10)}
                  colorScheme="green"
                >
                  Proceed
                </Button>
                <Text textAlign={"center"} justifyContent={"center"}>
                  You'll be sent a Message
                </Text>
              </Box>
            )}
          </ModalBody>
          <ModalFooter display="flex"></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
