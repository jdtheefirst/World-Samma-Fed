import {
  Box,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  useToast,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../components/Context/ChatProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const { verify, recoverEmail, setUser } = ChatState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [verifyPassword, setVerifyPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!password || !confirmpassword) {
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
    if (verify !== verifyPassword) {
      toast({
        title: `Please enter the correct code sent to ${recoverEmail}`,
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: { "Content-type": "Application/json" },
      };
      const { data } = await axios.post(
        `/api/user/emailrecovery/${recoverEmail}`,
        { password },
        config
      );
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error occurred trying to update your password",
        description: "Try again after some time",
        status: "error",
        duration: 5000,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
    >
      <Box
        padding={5}
        backgroundColor={"Background"}
        justifyContent={"space-between"}
        border={"1px solid purple"}
        mt={"6"}
      >
        {" "}
        <Text padding={4} textAlign={"center"} fontSize={"2xl"}>
          Enter the verification code sent to your email
        </Text>
        <Input
          onChange={(e) => setVerifyPassword(e.target.value)}
          color={verify === verifyPassword ? "green" : "red.400"}
          value={verifyPassword}
          placeholder="Enter the exact code here..."
          textAlign={"center"}
          maxLength={6}
        />
        <FormControl id="password" isRequired>
          <FormLabel>New Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
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
          <FormLabel>Confirm New Password</FormLabel>
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
        <Button
          onClick={() => {
            submitHandler();
          }}
          width={"100%"}
          backgroundColor={"green.400"}
          marginTop={10}
          isLoading={loading}
        >
          Change Password
        </Button>
      </Box>
      <Box flex="1" mt={"6"} />
      <Box>
            <Box display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"space-around"} width={"100%"} ><Link href="https://www.termsfeed.com/live/95163648-013f-4f36-9a57-0c15548ad847" target="_blank" rel="noopener noreferrer" p={1}>
                  Privacy Policy
                  </Link>
                  <Link href="https://www.termsfeed.com/live/d75005a6-b516-48aa-b247-31df645410b7" target="_blank" rel="noopener noreferrer" p={1}>
                  Terms and Conditions
                  </Link>
            </Box>
            <Text
              textAlign={"center"}
              fontSize={"small"}
              position="sticky"
              width="100%"
              mt={'6'}
            >
              <Text mb={'3'}>{`Copyright © World Samma Academy. 1999-${new Date().getFullYear()}`}</Text>{" "}
              All rights reserved. Terms and conditions apply. For queries and
              comments, email support@worldsamma.org.
            </Text>
       </Box>
    </VStack>
  );
}
