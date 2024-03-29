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
import { useState, useEffect } from "react";
import {
  makePaymentMpesa,
  useConnectSocket,
} from "../components/config/chatlogics";
import { ChatState } from "../components/Context/ChatProvider";
import axios from "axios";

export default function Paycheck({ course }) {
  const toast = useToast();
  const { user, setUser } = ChatState();
  const [show, setShow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(course.title);
  const socket = useConnectSocket(user?.token);

  useEffect(() => {
    if (!socket) return;
    socket.on("noPayment", (nothing) => {
      toast({
        title: nothing,
        description: "Subscription unsuccessful",
        status: "info",
        duration: 5000,
        position: "bottom",
      });
    });
    socket.on("userUpdated", async (updatedUser) => {
      const userData = await {
        ...user,
      };
      await setUser(userData);

      toast({
        title: "Successfully subscribed",
        description: `${user.accountType} subscriber`,
        status: "info",
        duration: 5000,
        position: "bottom",
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [user, setUser, toast, socket]);
  const handleAfterPay = async () => {
    if (!user) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user/update`, config);
      setUser((prev) => ({ ...prev, belt: data.belt }));
    } catch (error) {
      console.error("Error updating user after payment:", error);
    }
  };

  const checkAvailability = () => {
    const userCertificatesLength = user && user.certificates.length;
    const courseIndex = course.id - 1;

    // Allow enrollment for the first/next course only if the user is a guest
    const canEnroll =
      (user && user.belt === "Membe" && courseIndex === 0) ||
      userCertificatesLength + 1 === courseIndex + 1;

    if (canEnroll) {
      // Open the payment modal
      onOpen();
    } else if (user && user.belt === course.title) {
      toast({
        title: "Currently on this course",
        description: "You don't need to enroll in this course.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } else {
      // Display a toast message indicating unavailability
      toast({
        title: "Course Unavailable",
        description:
          "You don't meet the requirements to enroll in this course.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        borderRadius={20}
        fontSize={"small"}
        background={"#a432a8"}
        textColor={"white"}
        _hover={{ color: "black" }}
        m={1}
        onClick={checkAvailability}
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
                  await handleAfterPay();
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
