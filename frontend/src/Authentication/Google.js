<<<<<<< HEAD
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button, Image, useToast, Text, Box } from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import { useNavigate } from "react-router-dom";
=======
import React, { useCallback, useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
>>>>>>> master

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const toast = useToast();
<<<<<<< HEAD
  const [tryAgain, setTryAgain] = useState(false);
  const { email, setEmail, name, setName, setPic } = ChatState();

  const submitHandler = async () => {
    if (email && name) {
      try {
        const { data } = await axios.get(`/api/user/searchuser/${email}`);

        if (data === "Unfound") {
          navigate("/googleinfo");
        } else {
          localStorage.setItem("userInfo", JSON.stringify(data));

          navigate("/chats");
        }
      } catch (error) {
        toast({
          title: "Error Occurred, please try again later",
          description: "If this persists, log in using your email and password",
=======
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = useCallback(async (email) => {
    
    if (email) {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/user/searchuser/${email}`);
        if (data === "Unfound") {
          toast({
            title: "Account doesn't exist!",
            description: "Create a new account with us, sign up.",
            status: "info",
            duration: 10000,
            position: "bottom",
          });
        } else {
          localStorage.setItem("userInfo", JSON.stringify(data));
          navigate("/dashboard");
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        toast({
          title: "Error occurred during login",
          description:
            "An error occurred while fetching user data. Please try again.",
>>>>>>> master
          status: "error",
          duration: 5000,
          position: "bottom",
        });
      }
    }
<<<<<<< HEAD
  };
  const googleLogin = useGoogleLogin({
    clientId:
      "836402802539-eqr9obfujd1q8heagf9luptlmcid62ss.apps.googleusercontent.com",
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;

=======
  }, [navigate, toast]);

  useEffect(() => {
    if (email) {
      submitHandler(email);
    }
  }, [email, submitHandler]);

  const googleLogin = useGoogleLogin({
    clientId:
      "940835071660-da44he72t3otp7cbn96vlg5pb753tv73.apps.googleusercontent.com",
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;
>>>>>>> master
      try {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
<<<<<<< HEAD
        const parts = data.name.split(" ");
        setName(parts[0]);
        setEmail(data.email);
        setPic(data.picture);
        await submitHandler();
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
=======

        setEmail(data.email); 
      } catch (error) {
        toast({
          title: "Error occurred during login",
          description: "Try another way.",
          status: "error",
          duration: 5000,
          position: "bottom",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Login error",
        description: "An error occurred during Google login. Please try again.",
        status: "error",
        duration: 5000,
        position: "bottom",
      });
>>>>>>> master
    },
  });

  return (
<<<<<<< HEAD
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      width={"100%"}
    >
      <Button
        onClick={() => {
          googleLogin();
          setTryAgain((prev) => !prev);
        }}
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
      >
        <Image
          height={5}
          margin={1}
          src="https://developers.google.com/identity/images/g-logo.png"
          alt=""
        />
        Sign in with Google
      </Button>
      <Text fontSize={"15px"} color={"red.400"} p={0} m={0}>
        {tryAgain
          ? "Oops! Login unsuccessful. Please give it another shot."
          : ""}
      </Text>
    </Box>
=======
      <Button
        onClick={googleLogin}
        display={"flex"}
        justifyContent={"center"}
        width={"100%"}
        isLoading={loading}
        fontSize={"small"}
        border={"none"}
      >
        <FcGoogle />
        Sign in with Google
      </Button>
>>>>>>> master
  );
};

export default GoogleLoginButton;
