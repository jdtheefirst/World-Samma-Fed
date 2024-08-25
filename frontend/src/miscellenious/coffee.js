import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  useToast,
  Text,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Image,
} from "@chakra-ui/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getStatesOfCountry } from "../assets/state";
import { countries } from "countries-list";
import axios from "axios";
import {
  donationsMpesa,
  makePaymentMpesa,
} from "../components/config/chatlogics";

const CoffeeModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [country, setCountry] = useState("");
  const [amount, setAmount] = useState(0);
  const [province, setProvince] = useState("");
  const [subdivisions, setSubdivisions] = useState([]);
  const [show, setShow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: country.name,
    label: country.name,
  }));

  const handleSubmit = async () => {
    if (!country || !amount) {
      toast({
        title: "Form was incomplete",
        status: "warning",
      });
      return;
    }
    try {
      const { data } = await axios.post("/api/donate", {
        country,
        province,
        amount,
      });
      toast({
        title: data.message,
        status: "success",
      });
    } catch (error) {
      console.error("Donation error:", error);
      toast({
        title: "An Error Occurred!",
        status: "error",
      });
    }
  };

  useEffect(() => {
    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(country);
      setSubdivisions(states);
    };

    if (country) {
      fetchSubdivisions();
    } else {
      setSubdivisions([]);
    }
  }, [country]);

  const handleChange = (e) => {
    const value = e.target.value;

    // Prevent default action if the value is invalid
    if (value === "" || (Number(value) >= 0 && !isNaN(value))) {
      setAmount(value);
    } else {
      e.preventDefault(); // Prevent default action if needed
    }
  };

  const overlay = (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      {overlay}
      <ModalContent p={"6"}>
        <ModalHeader p={0} m={0} textAlign={"center"}>
          <Text bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
            Donation details
          </Text>
          <br /> Country: <strong style={{ color: "teal" }}>{country}</strong>{" "}
          <br /> State: <strong style={{ color: "teal" }}>{province}</strong>
          <br /> Donation: <strong style={{ color: "teal" }}>${amount}</strong>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          width={"100%"}
        >
          {!show && (
            <>
              <FormControl id="country" isRequired>
                <FormLabel textColor="grey">Country</FormLabel>
                <Select
                  placeholder="Select your country"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"100%"}
                  textColor={"grey"}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countryOptions.map((option, index) => (
                    <option
                      key={index}
                      value={option.value}
                      style={{ color: "black" }}
                    >
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              {country && subdivisions.length > 0 ? (
                <FormControl id="provinces" isRequired>
                  <FormLabel textColor={"grey"}>County/Province</FormLabel>
                  <Select
                    placeholder="Select your province"
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    textColor={"grey"}
                    width={"100%"}
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  >
                    {subdivisions.map((subdivision, index) => (
                      <option
                        key={index}
                        value={subdivision.value}
                        style={{ color: "black" }}
                      >
                        {subdivision.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <FormControl id="provinces">
                  <FormLabel textColor={"grey"}>County/Province</FormLabel>
                  <Input
                    type="text"
                    textColor={"grey"}
                    placeholder="Leave blank if not applicable..."
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </FormControl>
              )}
              <FormControl isRequired textColor={"grey"}>
                <FormLabel>Donate</FormLabel>
                <Input
                  type="number"
                  min={"1"}
                  textColor={"grey"}
                  placeholder="$"
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <Button
                onClick={() => setShow(true)}
                borderRadius={20}
                mt={"6"}
                background={"teal"}
                isDisabled={!country || !amount}
                color={"white"}
                width={"100%"}
                _hover={{ background: "green" }}
              >
                Pay
              </Button>
            </>
          )}
        </ModalBody>
        {show && (
          <>
            <PayPalScriptProvider
              options={{
                clientId:
                  "AZAdYFR_SbadcgOcCLYn9ajkReJTZmOCnEeAvQ3xPYAE5BMYFBHi4vDeILfNwBO-hh-8wfyGC9lNeB1I",
              }}
            >
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: amount,
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  await handleSubmit();
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
                onError={(err) => {
                  console.error("PayPal error:", err);
                  toast({
                    title: "Transaction Error",
                    description:
                      "An error occurred with the PayPal transaction.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom",
                  });
                }}
              />
            </PayPalScriptProvider>
            <Text textAlign={"center"} width={"100%"}>
              Or
            </Text>
            <FormControl id="password-login">
              <FormLabel
                display="flex"
                justifyContent={"start"}
                alignItems={"center"}
                fontSize={"small"}
              >
                {" "}
                <Text pr={"2"}>Pay with</Text>
                <Image
                  height={10}
                  width={"auto"}
                  src={
                    "https://res.cloudinary.com/dsdlgmgwi/image/upload/v1724605149/M-PESA.png"
                  }
                  alt={""}
                  loading="lazy"
                />
              </FormLabel>
              <InputGroup size="md">
                <Input
                  fontSize={"small"}
                  color={"green.400"}
                  fontWeight={"bold"}
                  placeholder="Enter phone number"
                  textAlign={"center"}
                  type="number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  isDisabled={!country || !amount}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    width={"100%"}
                    onClick={() => {
                      donationsMpesa(amount, phoneNumber, toast);
                      toast({
                        title: "Wait as message is sent by Admin Apparels",
                        status: "loading",
                        isClosable: true,
                        position: "bottom",
                        duration: 5000,
                      });
                    }}
                    isDisabled={
                      phoneNumber.length !== parseInt(10) || !country || !amount
                    }
                    colorScheme="teal"
                    borderRadius={"full"}
                    _hover={{ background: "green" }}
                  >
                    Pay
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CoffeeModal;
