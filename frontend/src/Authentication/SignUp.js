import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
<<<<<<< HEAD
import { VStack } from "@chakra-ui/layout";
=======
import { Box, VStack } from "@chakra-ui/layout";
>>>>>>> master
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
<<<<<<< HEAD
import { useEffect, useState } from "react";
import {countries} from 'countries-list';
import { useNavigate } from "react-router-dom";
import { getStatesOfCountry } from "../assets/state";
=======
import React, { useEffect, useState } from "react";
import { countries, languages } from "countries-list";
import { useNavigate } from "react-router-dom";
import { getStatesOfCountry } from "../assets/state";
import UploadPicture from "../miscellenious/PicLogic";
>>>>>>> master

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
<<<<<<< HEAD

=======
>>>>>>> master
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
<<<<<<< HEAD
  const [otherName, setOtherName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState("")
  const [provinces, setProvinces] = useState("")
  const [passport, setPassport]= useState('');
  const [subdivisions, setSubdivisions] = useState([]);

 const countryOptions = Object.entries(countries).map(([code, country]) => ({
  value: country.name,
  label: country.name,
}));

  const generateAndVerify = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword || !otherName || !selectedCountry || !provinces) {
      console.log(name, email,password, confirmpassword, otherName, selectedCountry, provinces);
=======
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
>>>>>>> master
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
<<<<<<< HEAD
      console.log(data);
=======
>>>>>>> master
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
<<<<<<< HEAD
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword || !otherName || !selectedCountry || !provinces) {
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
=======
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
>>>>>>> master
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
<<<<<<< HEAD
        "/api/user",
=======
        "/api/user/post",
>>>>>>> master
        {
          name,
          email,
          password,
          gender,
          selectedCountry,
          otherName,
          provinces,
<<<<<<< HEAD
          pic,
=======
          passport,
          pic,
          language,
>>>>>>> master
        },
        config
      );
      setPicLoading(false);
<<<<<<< HEAD
      console.log(data)
=======
>>>>>>> master
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

<<<<<<< HEAD
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      let data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "RocketChat");
      fetch("https://api.cloudinary.com/v1_1/dvc7i8g1a/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());

          setPicLoading(false);
        })
        .catch((err) => {
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };
   useEffect(() => {
    
=======
  useEffect(() => {
>>>>>>> master
    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(selectedCountry);
      setSubdivisions(states);
    };

    fetchSubdivisions();
  }, [selectedCountry]);

  return (
<<<<<<< HEAD
    <VStack spacing="3px">
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent padding={5}>
          <ModalHeader
            fontSize="medium"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
            textAlign={"center"}
          >
              Enter Code sent to: ~{email}~
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
              placeholder={`i.e 126413`}
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
              textColor={"white"}
              justifyContent={"center"}
              color={code !== inputCode ? "red" : "green"}
            >
              Please Enter the Exact Code Recieved
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <FormControl id="first-name" isRequired>
        <FormLabel textColor={"white"}>First name</FormLabel>
        <Input
          placeholder="Enter Your First Name"
          textColor={"white"}
=======
    <VStack spacing="5px">
     <Box mb={"6"} fontWeight={"bold"} textAlign={"center"} width={"100%"}>
              <h1>Hello there!</h1>
              <p>Enter your personal details and start your journey with us. Your information is used solely for certification purposes</p>
      </Box>
      <Modal
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay
         bg="blackAlpha.300"
         backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent padding={5}>
  <ModalHeader
    fontFamily="Work Sans"
    display="flex"
    flexDir="column"
    justifyContent="space-between"
    alignItems="center"
    textAlign="center"
    mb="6"
  >
    <Text fontSize="2xl" mb="3" width="100%">
      For your account security, please confirm your email.
    </Text>
    <Text fontSize="xl" mb="3" width="100%">
      Enter the code sent to: <br />
      <strong style={{ color: "green" }}>{email}</strong>
    </Text>
    <Text fontSize="sm">
      ✔️ Check your inbox and refresh if you don't see it.
    </Text>
    <Text fontSize="sm">
      ⚠️ Please do not close this modal.
    </Text>
  </ModalHeader>
  <ModalCloseButton />
  <ModalBody
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="space-between"
    fontSize="small"
  >
    <Input
      fontSize="medium"
      placeholder="Enter the code here..."
      type="text"
      textAlign="center"
      onChange={(e) => setInputCode(e.target.value)}
      value={inputCode}
      minLength={6}
      maxLength={6}
    />
    <Divider p={2} />
    <Button
      width="100%"
      onClick={() => {
        submitHandler();
        onClose();
      }}
      border="none"
      isDisabled={code !== inputCode}
      colorScheme="green"
    >
      Confirm
    </Button>
     </ModalBody>
     <ModalFooter display="flex">
     <Text
      textAlign="center"
      justifyContent="center"
      color={code !== inputCode ? "red" : "green"}
      fontSize="small"
      >
      Please enter the exact code you received.
      </Text>
     </ModalFooter>
     </ModalContent>
      </Modal>
      <FormControl id="first-name" isRequired>
        <FormLabel fontSize="small">First name</FormLabel>
        <Input
          placeholder="Enter your first name"
          fontSize="small"
>>>>>>> master
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="other-name" isRequired>
<<<<<<< HEAD
        <FormLabel textColor={"white"}>Other name</FormLabel>
        <Input
          placeholder="Enter Your Other Name"
          textColor={"white"}
          value={otherName}
          onChange={(e) => setOtherName(e.target.value)}
        />
      </FormControl>
      <FormControl id="country" isRequired>
  <FormLabel textColor="white">Country</FormLabel>
  <Select
    placeholder="Select your country"
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
    width={"100%"}
    textColor={"white"}
    value={selectedCountry}
    onChange={(e) => setSelectedCountry(e.target.value)}
  >
    {countryOptions.map((option) => (
      <option key={option.value} value={option.value} style={{color: "black"}}>
        {option.label}
      </option>
    ))}
  </Select>
</FormControl>
    {selectedCountry && subdivisions ? <FormControl id="provinces">
  <FormLabel textColor={"white"}>County/Province</FormLabel>
  <Select
    placeholder="Select your province"
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}
    textColor={"white"}
    width={"100%"}
    value={provinces}
    onChange={(e) => setProvinces(e.target.value)}>
    {subdivisions && subdivisions.map((subdivision) => (
      <option key={subdivision.value} value={subdivision.value} style={{color: "black"}}>
        {subdivision.name}
      </option>
    ))}
  </Select>
</FormControl> : 
      <FormControl id="provinces">
        <FormLabel textColor={"white"}>County/Province</FormLabel>
        <Input
          type="text"
          textColor={"white"}
          placeholder="Province"
          onChange={(e) => setProvinces(e.target.value)}
        />
        
      </FormControl>}
       <FormControl id="id/passport" isRequired>
        <FormLabel textColor={"white"}>Id/Passport</FormLabel>
        <Input
          type="number"
          textColor={"white"}
          placeholder="passport no:"
          value={passport}
          onChange={(e) => setPassport(e.target.value)}
        />
        
      </FormControl>
      
      <FormControl id="email" isRequired>
        <FormLabel textColor={"white"}>Email Address</FormLabel>
        <Input
          type="email"
          textColor={"white"}
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        {email ? (
          <FormLabel
            fontSize={"2xs"}
=======
        <FormLabel fontSize="small">Other name</FormLabel>
        <Input
          placeholder="Enter your other name"
          value={otherName}
          fontSize="small"
          onChange={(e) => setOtherName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel fontSize="small">Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email address"
          fontSize="small"
          onChange={(e) => setEmail(e.target.value)}
        />
        
        {email ? (
          <FormLabel
            fontSize={"2xs"}
            style={{
              animation: "slideInFromTop 0.5s forwards",
            }}
>>>>>>> master
            p={0}
            m={0}
            color={"green.400"}
            userSelect={"none"}
<<<<<<< HEAD
            textColor={"white"}
          >
            Your email is for login only. No ads
=======
          >
            Your email is for certification and login only. A code will be sent for security.
>>>>>>> master
          </FormLabel>
        ) : (
          ""
        )}
      </FormControl>
      <FormControl id="password" isRequired>
<<<<<<< HEAD
        <FormLabel textColor={"white"}>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            textColor={"white"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
=======
        <FormLabel fontSize="small">Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            fontSize="small"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" fontSize="small" onClick={handleClick} border={"none"}>
>>>>>>> master
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
<<<<<<< HEAD
      <FormControl id="password" isRequired>
        <FormLabel textColor={"white"}>Confirm Password</FormLabel>
=======
      <FormControl id="password-confirm" isRequired>
        <FormLabel fontSize="small">Confirm Password</FormLabel>
>>>>>>> master
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
<<<<<<< HEAD
            textColor={"white"}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
=======
            fontSize="small"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick} fontSize="small" border={"none"}>
>>>>>>> master
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
<<<<<<< HEAD
      <FormControl id="gender" isRequired>
        <FormLabel textColor={"white"}>Gender</FormLabel>
        <RadioGroup onChange={setGender} value={gender} textColor={"white"} isRequired>
=======
      <FormControl id="id/passport" isRequired>
        <FormLabel fontSize="small">Id/Passport</FormLabel>
        <Input
          type="number"
          placeholder="Passport"
          fontSize="small"
          value={passport}
          onChange={(e) => setPassport(e.target.value)}
        />
      </FormControl>
      <FormControl id="country" isRequired>
        <FormLabel fontSize="small">Country</FormLabel>
        <Select
          placeholder="Select your country"
          display={"flex"}
          justifyContent={"center"}
          fontSize="small"
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
          <FormLabel fontSize="small">County/Province/State</FormLabel>
          <Select
            placeholder="Select your province"
            display={"flex"}
            fontSize="small"
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
          <FormLabel fontSize="small">County/Province</FormLabel>
          <Input
            type="text"
            fontSize="small"
            placeholder="Leave blank if not applicable..."
            onChange={(e) => setProvinces(e.target.value)}
          />
        </FormControl>
      )}
      <FormControl id="language" isRequired>
        <FormLabel fontSize="small">Language</FormLabel>
        <Select
          placeholder="Select language"
          value={language}
          fontSize="small"
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
        <FormLabel fontSize="small">Gender</FormLabel>
        <RadioGroup
          onChange={setGender}
          value={gender}
          isRequired
        >
>>>>>>> master
          <Stack direction="row">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
<<<<<<< HEAD
      <FormControl id="pic">
        <FormLabel textColor={"white"}>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          textColor={"white"}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
=======
      <UploadPicture
        setPic={setPic}
        setPicLoading={setPicLoading}
      />
>>>>>>> master

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
<<<<<<< HEAD
        onClick={() => submitHandler()}
        // generateAndVerify()
        isLoading={picLoading}
        isDisabled={disabled}
      >
          <Text> {disabled ? `Try Again after 30sec` : `Sign Up`} </Text>
     
=======
        onClick={() => generateAndVerify()}
        isLoading={picLoading}
        isDisabled={disabled}
        fontSize="small"
        border={"none"}
      >
        <Text> {disabled ? `Try Again after 30sec` : `Sign Up`} </Text>
>>>>>>> master
      </Button>
    </VStack>
  );
};

export default Signup;
