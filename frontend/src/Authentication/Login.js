import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
<<<<<<< HEAD
import { VStack } from "@chakra-ui/layout";
=======
import { Box, VStack } from "@chakra-ui/layout";
>>>>>>> master
import { useState } from "react";
import axios from "axios";
import {
  useToast,
  Link,
  useDisclosure,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD

import { GoogleOAuthProvider } from "@react-oauth/google";
=======
>>>>>>> master
import GoogleLoginButton from "./Google";
import { ChatState } from "../components/Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [forgotEmail, setForgotEmail] = useState();
  const [searching, setSearching] = useState(false);
  const { setVerify, setRecoverEmail } = ChatState();
  const [disable, setDisable] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
<<<<<<< HEAD
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);

      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast({
        title: "Account Missing!",
        description: "Wrong Email or Password",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
=======
      await localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response && error.response.status === 401) {
        toast({
          title: "Account Missing!",
          description: error.response.data.message,
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        toast({
          title: "An Error Occurred!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
>>>>>>> master
    }
  };
  const forgotPassword = async () => {
    setSearching(true);
    setDisable(true);
    try {
      const { data } = await axios.get(
        `/api/user/accountrecovery/${forgotEmail}`
      );
      if (data !== false) {
        navigate("/accountrecovery");
        setVerify(data.verificationCode);
        setRecoverEmail(data.email);
      } else {
        toast({
          title: "Email not found",
          status: "info",
          duration: 5000,
          position: "bottom",
        });
      }

      setSearching(false);
      setTimeout(() => {
        setDisable(false);
      }, 30000);
    } catch (error) {
<<<<<<< HEAD
=======
      console.log(error);
>>>>>>> master
      setSearching(false);
      setTimeout(() => {
        setDisable(false);
      }, 30000);
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
<<<<<<< HEAD
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel textColor={"white"}>Email Address</FormLabel>
        <Input
          value={email}
          textColor={"white"}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel textColor={"white"}>Password</FormLabel>
=======
    <VStack spacing="5px">
      <Box mb={"6"} fontWeight={"bold"}>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
         
            </Box>
      <FormControl id="email-login" isRequired>
        <FormLabel fontSize={"small"}>Email address/Code</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter email or code here"
          fontSize={"small"}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password-login" isRequired>
        <FormLabel fontSize={"small"}>Password</FormLabel>
>>>>>>> master
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
<<<<<<< HEAD
            textColor={"white"}
=======
            fontSize={"small"}
>>>>>>> master
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
<<<<<<< HEAD
      >
        Login
      </Button>
      <GoogleOAuthProvider clientId="836402802539-eqr9obfujd1q8heagf9luptlmcid62ss.apps.googleusercontent.com">
        <GoogleLoginButton />
      </GoogleOAuthProvider>
=======
        border={"none"}
        fontSize={"small"}
      >
        Login
      </Button>
        <GoogleLoginButton />
>>>>>>> master
      <Link
        onClick={() => {
          onOpen();
        }}
      >
        Forgot password?
      </Link>
<<<<<<< HEAD
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
=======
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered closeOnOverlayClick={false}>
      <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
>>>>>>> master
        <ModalContent padding={5}>
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
<<<<<<< HEAD
            justifyContent="center"
          >
            <Text
              textAlign={"center"}
              justifyContent={"center"}
              fontSize={"2xl"}
              textColor={"white"}
            >
              Enter your Email below
            </Text>
          </ModalHeader>
          <ModalCloseButton />
=======
            flexDir={"column"}
            justifyContent="space-between"
            alignItems={"center"}
            mb={"6"}
          >
           <Text textAlign={"center"} justifyContent={"center"} fontSize={"2xl"}>
           Enter your Email below
           </Text>
          </ModalHeader>
          <ModalCloseButton border={"none"}/>
>>>>>>> master
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Input
<<<<<<< HEAD
              fontSize={"2xl"}
              placeholder={`example@mymail.com`}
              type="text"
              textColor={"white"}
              textAlign="center"
=======
              placeholder={`Enter your email here`}
              fontSize={"small"}
              type="text"
>>>>>>> master
              onChange={(e) => setForgotEmail(e.target.value)}
              value={forgotEmail}
            />
            <Divider p={2} />
            <Button
              width={"100%"}
              onClick={() => {
                forgotPassword();
              }}
              colorScheme="green"
              isDisabled={disable}
<<<<<<< HEAD
=======
              border={"none"}
>>>>>>> master
            >
              {disable ? "Try again after 30sec" : "Search for my email"}
            </Button>
          </ModalBody>
          <ModalFooter display="flex">
<<<<<<< HEAD
            <Text textAlign={"start"} textColor={"white"}>
=======
            <Text textAlign={"start"}>
>>>>>>> master
              A code will be sent to the above email
            </Text>
            {searching && <Spinner />}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Login;
