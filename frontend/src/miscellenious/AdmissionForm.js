import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getStatesOfCountry } from "../assets/state";
import { countries, languages } from "countries-list";
import formatMessageTime from "../components/config/formatTime";
import {
  makePaymentMpesa,
  useConnectSocket,
} from "../components/config/chatlogics";
import { ChatState } from "../components/Context/ChatProvider";
import UploadPicture from "./PicLogic";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    otherName: "",
    id: "",
    phoneNumber: "",
    email: "",
    selectedCountry: "",
    provinces: "",
    language: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });
  const [showPaypal, setShowPaypal] = useState(false);
  const [show, setShow] = useState(false);
  const [subdivisions, setSubdivisions] = useState([]);
  const [student, setStudent] = useState(null);
  const [phone, setPhone] = useState("");
  const [pic, setPic] = useState("");
  const { user } = ChatState();
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const socket = useConnectSocket(user?.token);

  const handleClick = () => setShow(!show);

  const handleChange = (e) => {
    console.log("Event:", e);
    if (!e || !e.target) {
      console.log("Event or target is undefined.");
      return;
    }

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "selectedCountry") {
      const states = getStatesOfCountry(value);
      setSubdivisions(states);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/user/admission",
        {
          ...formData,
          pic: pic,
        },
        config
      );
      setStudent(data);
      setFormData({
        name: "",
        otherName: "",
        id: "",
        phoneNumber: "",
        email: "",
        selectedCountry: "",
        provinces: "",
        language: "",
        password: "",
        confirmpassword: "",
        gender: "",
      });
      setPic("");
      setShowPaypal(false);
      setSubdivisions([]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error occurred!",
        description: error.response.data.message || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: country.name,
    label: country.name,
  }));
  const languageOptions = Object.keys(languages).map((code) => ({
    code,
    name: languages[code].name,
  }));
  useEffect(() => {
    if (!formData.selectedCountry) {
      return;
    }
    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(formData.selectedCountry);
      setSubdivisions(states);
    };

    fetchSubdivisions();
  }, [formData.selectedCountry]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    const handleManualRegister = async () => {
      await handleSubmit();
    };

    socket.on("manualRegister", handleManualRegister);

    return () => {
      socket.off("manualRegister", handleManualRegister);
    };
  }, [socket]);

  const handleShow = () => {
    const {
      name,
      otherName,
      selectedCountry,
      provinces,
      language,
      password,
      confirmpassword,
      gender,
    } = formData;

    if (
      !name ||
      !otherName ||
      !selectedCountry ||
      !provinces ||
      !language ||
      !password ||
      !confirmpassword ||
      !gender ||
      !pic
    ) {
      toast({
        title: "Please fill all the required fields.",
        status: "warning",
      });
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    setShowPaypal(true);
  };

  return (
    <>
      {!showPaypal && (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          overflow="auto"
          width={{ base: "100%", md: "80%" }}
          boxShadow="base"
          p="4"
          rounded="md"
          bg="white"
        >
          <form style={{ width: "100%" }}>
            <Text
              fontSize={"sm"}
              fontWeight={500}
              bg={useColorModeValue("green.50", "green.900")}
              px={6}
              p={"3"}
              m={1}
              color={"green.500"}
              rounded={"full"}
            >
              Register Students Manually
            </Text>
            {student && (
              <Text textAlign={"center"}>
                ⚠️Student Code: {student?.admission}, Name: {student?.name},
                createdAt: {formatMessageTime(student?.createdAt)}{" "}
              </Text>
            )}
            <FormControl id="name" isRequired>
              <FormLabel>First Name </FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="Student's first name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="otherName" isRequired>
              <FormLabel>Last Name </FormLabel>
              <Input
                type="text"
                name="otherName"
                placeholder="Student's last name"
                value={formData.otherName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="country" isRequired>
              <FormLabel>Country</FormLabel>
              <Select
                placeholder="Select your country"
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
                value={formData.selectedCountry}
                onChange={(e) =>
                  setFormData({ ...formData, selectedCountry: e.target.value })
                }
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
            {formData.selectedCountry && subdivisions.length > 0 ? (
              <FormControl id="provinces" isRequired>
                <FormLabel>County/Province</FormLabel>
                <Select
                  placeholder="Select your province"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"100%"}
                  value={formData.provinces}
                  onChange={(e) =>
                    setFormData({ ...formData, provinces: e.target.value })
                  }
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
              <FormControl id="province" isRequired>
                <FormLabel>County/Province/state</FormLabel>
                <Input
                  type="text"
                  placeholder="Province"
                  value={formData.provinces}
                  onChange={(e) =>
                    setFormData({ ...formData, provinces: e.target.value })
                  }
                />
              </FormControl>
            )}
            <FormControl id="language" isRequired>
              <FormLabel>Language</FormLabel>
              <Select
                placeholder="Select language"
                textColor={"grey"}
                value={formData.language}
                onChange={(e) =>
                  setFormData({ ...formData, language: e.target.value })
                }
              >
                {languageOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="id">
              <FormLabel>ID</FormLabel>
              <Input
                type="text"
                name="id"
                placeholder="Student's ID (optional)"
                value={formData.id}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="phoneNumber">
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="number"
                name="phoneNumber"
                placeholder="Student's phone number (optional)"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Student's email address (optional)"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.confirmpassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmpassword: e.target.value,
                    })
                  }
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <RadioGroup
              value={formData.gender}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  gender: value,
                })
              }
              isRequired
            >
              <Stack direction="row">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Stack>
            </RadioGroup>

            <UploadPicture
              setPic={setPic}
              setPicLoading={setPicLoading}
              color={"black"}
            />

            <Button
              onClick={() => handleShow()}
              mt={4}
              colorScheme="teal"
              isDisabled={!formData.name || !formData.otherName || picLoading}
              isLoading={picLoading}
            >
              Submit
            </Button>
          </form>
        </Box>
      )}
      {showPaypal && (
        <Box
          display="flex"
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          overflow={"auto"}
          width={"100%"}
          boxShadow="base"
          p="6"
          rounded="md"
          bg="white"
        >
          {" "}
          <PayPalScriptProvider
            options={{
              clientId:
                "AZ5Pdn0aioG6OzW6n4Q7W64LxkdOhS0wEIOAn_UmF5askK41E72ejdrsHPJoFIcg0atbN-WZG14fd6oc",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                const amount = 4.0;
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
                await handleSubmit();
                return actions.order.capture().then(function (details) {
                  setShowPaypal(false);
                  toast({
                    title: "Success",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom",
                  });
                });
              }}
              onCancel={() => {
                setShowPaypal(false);
                toast({
                  title: "Cancelled",
                  status: "info",
                  isClosable: true,
                  position: "bottom",
                });
              }}
            />
          </PayPalScriptProvider>
          <Button
            fontSize={"small"}
            width={{ base: "80%", md: "25%" }}
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
            <Box m={3} width={{ base: "80%", md: "50%" }}>
              <Input
                fontSize={"small"}
                color={"green.400"}
                fontWeight={"bold"}
                placeholder="Enter Your Mpesa Phone Number"
                textAlign={"center"}
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                minLength={10}
                maxLength={10}
              />
              <Divider p={2} />
              <Button
                width={"100%"}
                onClick={() => {
                  makePaymentMpesa("500", phone, user, toast);
                  setShow(false);
                  toast({
                    title: "Wait as message is sent",
                    status: "loading",
                    isClosable: true,
                    position: "bottom",
                    duration: 5000,
                  });
                }}
                isDisabled={phone.length !== parseInt(10)}
                colorScheme="green"
              >
                Proceed
              </Button>
              <Text textAlign={"center"} justifyContent={"center"}>
                You'll be sent a Message
              </Text>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default AdmissionForm;
