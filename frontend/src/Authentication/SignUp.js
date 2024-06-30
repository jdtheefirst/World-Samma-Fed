import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, VStack } from "@chakra-ui/layout";
import {
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
  Select,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { countries, languages } from "countries-list";
import { useNavigate } from "react-router-dom";
import { getStatesOfCountry } from "../assets/state";
import UploadPicture from "../miscellenious/PicLogic";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const overlay = React.useState(<OverlayOne />);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState(undefined);
  const [picLoading, setPicLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [code, setCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [otherName, setOtherName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [provinces, setProvinces] = useState("");
  const [passport, setPassport] = useState("");
  const [subdivisions, setSubdivisions] = useState([]);
  const [language, setLanguage] = useState("");

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: country.name,
    label: country.name,
  }));
  const languageOptions = Object.keys(languages).map((code) => ({
    code,
    name: languages[code].name,
  }));

  const generateAndVerify = async () => {
    setPicLoading(true);
    if (
      !name ||
      !email ||
      !password ||
      !confirmpassword ||
      !otherName ||
      !selectedCountry ||
      !pic
    ) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
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
      setPicLoading(false);
      return;
    }
    try {
      const { data } = await axios.get(`/api/user/${email}`);
      setCode(data);
      onOpen();
      setPicLoading(false);
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 30000);
    } catch (error) {
      toast({
        title: "Check Your Email!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 30000);
      onClose();
      setPicLoading(false);
    }
  };
  const submitHandler = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !passport ||
      !gender ||
      !selectedCountry ||
      !otherName ||
      !language ||
      !pic
    ) {
      toast({
        title: "Please fill all the required fields.",
        status: "warning",
      });
      return;
    }
    setPicLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          gender,
          selectedCountry,
          otherName,
          provinces,
          passport,
          pic,
          language,
        },
        config
      );
      setPicLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  useEffect(() => {
    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(selectedCountry);
      setSubdivisions(states);
    };

    fetchSubdivisions();
  }, [selectedCountry]);

  return (
    <VStack spacing="3px">
     <Box mb={"6"}>
              <h1>Hello there!</h1>
              <p>Enter your personal details and start journey with us</p>
      </Box>
      <Modal
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false}
      >
        {overlay}
        <ModalContent padding={5}>
          <ModalHeader
            fontSize="medium"
            fontFamily="Work sans"
            display="flex"
            flexDir={"column"}
            justifyContent="center"
            textAlign={"center"}
          >
            {" "}
            <Text> Enter the code sent to: {email} </Text>
            <Text fontSize={"sm"}> Vist your mailbox and refresh.</Text>
            <Text fontSize={"sm"}> Please do not close this modal.</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Input
              fontSize={"medium"}
              placeholder={`Enter the code here...`}
              type="text"
              textAlign="center"
              onChange={(e) => setInputCode(e.target.value)}
              value={inputCode}
              minLength={6}
              maxLength={6}
            />
            <Divider p={2} />
            <Button
              width={"100%"}
              onClick={() => {
                submitHandler();
                onClose();
              }}
              isDisabled={code !== inputCode}
              colorScheme="green"
            >
              Done
            </Button>
          </ModalBody>
          <ModalFooter display="flex">
            <Text
              textAlign={"center"}
              justifyContent={"center"}
              color={code !== inputCode ? "red" : "green"}
            >
              Please Enter the exact code recieved.
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <FormControl id="first-name" isRequired>
        <FormLabel>First name</FormLabel>
        <Input
          placeholder="Enter your first name"

          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="other-name" isRequired>
        <FormLabel >Other name</FormLabel>
        <Input
          placeholder="Enter your other name"
          value={otherName}
          onChange={(e) => setOtherName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        
        {email ? (
          <FormLabel
            fontSize={"2xs"}
            style={{
              animation: "slideInFromTop 0.5s forwards",
            }}
            p={0}
            m={0}
            color={"green.400"}
            userSelect={"none"}
          >
            Your email is for certification and login only. No ads
          </FormLabel>
        ) : (
          ""
        )}
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password-confirm" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="id/passport" isRequired>
        <FormLabel>Id/Passport</FormLabel>
        <Input
          type="number"
          placeholder="Passport"
          value={passport}
          onChange={(e) => setPassport(e.target.value)}
        />
        {passport ? (
  <FormLabel
    fontSize={"2xs"}
    style={{
      animation: "slideInFromTop 0.5s forwards",
    }}
    p={0}
    m={0}
    color={"green.400"}
    userSelect={"none"}
  >
    Your sensitive information is used solely for certification purposes.
  </FormLabel>
) : (
  ""
)}
      </FormControl>
      <FormControl id="country" isRequired>
        <FormLabel>Country</FormLabel>
        <Select
          placeholder="Select your country"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
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
      {selectedCountry && subdivisions.length > 0 ? (
        <FormControl id="provinces" isRequired>
          <FormLabel>County/Province/State</FormLabel>
          <Select
            placeholder="Select your province"
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            value={provinces}
            onChange={(e) => setProvinces(e.target.value)}
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
        <FormControl id="provinces">
          <FormLabel>County/Province</FormLabel>
          <Input
            type="text"
            placeholder="Leave blank if not applicable..."
            onChange={(e) => setProvinces(e.target.value)}
          />
        </FormControl>
      )}
      <FormControl id="language" isRequired>
        <FormLabel>Language</FormLabel>
        <Select
          placeholder="Select language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languageOptions.map((option) => (
            <option key={option.code} value={option.code}>
              {option.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl id="gender" isRequired>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          onChange={setGender}
          value={gender}
          isRequired
        >
          <Stack direction="row">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <UploadPicture
        setPic={setPic}
        setPicLoading={setPicLoading}
      />

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => generateAndVerify()}
        isLoading={picLoading}
        isDisabled={disabled}
      >
        <Text> {disabled ? `Try Again after 30sec` : `Sign Up`} </Text>
      </Button>
    </VStack>
  );
};

export default Signup;
