import React, { useEffect, useState } from "react";
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
  Input,
  FormControl,
  FormLabel,
  Select,
  Button,
} from "@chakra-ui/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
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
    if (!country || !province || !amount) {
      toast({
        title: "Form is incomplete",
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
        description: "You may proceed or try again after sometime",
        status: "error",
      });
    }
  };
  useEffect(() => {
    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(country);
      setSubdivisions(states);
    };

    fetchSubdivisions();
  }, [country]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
          Donation details
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
                  {countryOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      style={{ color: "black" }}
                    >
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              {country && subdivisions ? (
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
                    {subdivisions &&
                      subdivisions.map((subdivision) => (
                        <option
                          key={subdivision.value}
                          value={subdivision.value}
                          style={{ color: "black" }}
                        >
                          {subdivision.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              ) : (
                <FormControl id="provinces" isRequired>
                  <FormLabel textColor={"grey"}>County/Province</FormLabel>
                  <Input
                    type="text"
                    textColor={"grey"}
                    placeholder="Province"
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </FormControl>
              )}
              <FormControl isRequired textColor={"grey"}>
                <FormLabel>Donate</FormLabel>{" "}
                <Input
                  type="number"
                  textColor={"grey"}
                  placeholder="Enter your donation"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FormControl>

              <Button
                onClick={() => {
                  setShow(true);
                }}
                borderRadius={20}
                m={1}
                background={"purple"}
                color={"white"}
                _hover={{ color: "black", background: "green" }}
              >
                Done
              </Button>
            </>
          )}
          {show && (
            <PayPalScriptProvider
              options={{
                clientId:
                  "ASgI4T_UWqJJpTSaNkqcXbQ9H8ub0f_DAMR8SJByA19N4HtPK0XRgTv4xJjj4Mpx_KxenyLzBDapnJ82",
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
