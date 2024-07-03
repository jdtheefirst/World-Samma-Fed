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
} from "@chakra-ui/react";
import { getStatesOfCountry } from "../assets/state";
import { countries } from "countries-list";
import axios from "axios";

const CoffeeModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [country, setCountry] = useState("");
  const [amount, setAmount] = useState(0);
  const [province, setProvince] = useState("");
  const [subdivisions, setSubdivisions] = useState([]);
  const [show, setShow] = useState(false);

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

  const overlay = (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  // Function to handle PayPal button setup and rendering
  const setupPayPalButtons = () => {
    window.paypal
      .Buttons({
        createOrder: function (data, actions) {
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
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            // Handle successful capture
            handleSubmit();
            toast({
              title: "Transaction Successful",
              description: "Thank you for your support!",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "bottom",
            });
          });
        },
        onCancel: function (data) {
          toast({
            title: "Transaction Canceled",
            description: "Thank you for considering!",
            status: "info",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
        },
        onError: function (err) {
          console.error("PayPal error:", err);
          toast({
            title: "Transaction Error",
            description: "An error occurred with the PayPal transaction.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
        },
      })
      .render("#paypal-button-container");
  };

  useEffect(() => {
    if (show) {
      setupPayPalButtons();
    }
  }, [show]);

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
                  textColor={"grey"}
                  placeholder="$"
                  onChange={(e) => setAmount(e.target.value)}
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
        <div id="paypal-button-container"></div>
      </ModalContent>
    </Modal>
  );
};

export default CoffeeModal;
