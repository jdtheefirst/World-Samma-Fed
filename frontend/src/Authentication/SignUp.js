import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import {
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
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

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
  const [code, setCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [disabled, setDisabled] = useState(false);

  const generateAndVerify = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
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
          pic,
        },
        config
      );
      let userData = await { ...data, isNewUser: true };
      localStorage.setItem("userInfo", JSON.stringify(userData));

      setTimeout(() => {
        delete userData.isNewUser;
        localStorage.setItem("userInfo", JSON.stringify(userData));
      }, 2500);
      setPicLoading(false);
      navigate("/dashboard");
    } catch (error) {
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


  return (
    <VStack spacing="3px">
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent padding={5}>
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            <Text
              textAlign={"center"}
              justifyContent={"center"}
              fontSize={"2xl"}
            >
              Enter Code sent to: ~{email}~
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Input
              fontSize={"2xl"}
              placeholder={`i.e 126413`}
              type="text"
              textColor={"white"}
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
              textColor={"white"}
              color={code !== inputCode ? "red" : "green"}
            >
              Please Enter the Exact Code Recieved
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <FormControl id="first-name" isRequired>
        <FormLabel  textColor={"white"}>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          textColor={"white"}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl  id="email" isRequired>
        <FormLabel  textColor={"white"}>Email Address</FormLabel>
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
        <FormLabel  textColor={"white"}>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            textColor={"white"}
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
        <FormLabel  textColor={"white"}>Confirm Password</FormLabel>
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
        onClick={() => generateAndVerify()}
        isLoading={picLoading}
        isDisabled={disabled}
      >
       Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
