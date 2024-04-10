import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
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
import { useEffect, useState } from "react";
import {countries} from 'countries-list';
import { useNavigate } from "react-router-dom";
import { getStatesOfCountry } from "../assets/state";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      console.log(data);
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
          pic,
        },
        config
      );
      setPicLoading(false);
      console.log(data)
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
    
    const fetchSubdivisions = async () => {
      const states = getStatesOfCountry(selectedCountry);
      setSubdivisions(states);
    };

    fetchSubdivisions();
  }, [selectedCountry]);

  return (
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="other-name" isRequired>
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
            p={0}
            m={0}
            color={"green.400"}
            userSelect={"none"}
            textColor={"white"}
          >
            Your email is for login only. No ads
          </FormLabel>
        ) : (
          ""
        )}
      </FormControl>
      <FormControl id="password" isRequired>
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
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel textColor={"white"}>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            textColor={"white"}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="gender" isRequired>
        <FormLabel textColor={"white"}>Gender</FormLabel>
        <RadioGroup onChange={setGender} value={gender} textColor={"white"} isRequired>
          <Stack direction="row">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
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

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => submitHandler()}
        // generateAndVerify()
        isLoading={picLoading}
        isDisabled={disabled}
      >
          <Text> {disabled ? `Try Again after 30sec` : `Sign Up`} </Text>
     
      </Button>
    </VStack>
  );
};

export default Signup;
