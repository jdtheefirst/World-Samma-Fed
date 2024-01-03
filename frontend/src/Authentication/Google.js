import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button, Image, useToast, Text, Box } from "@chakra-ui/react";
import { ChatState } from "../components/Context/ChatProvider";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const toast = useToast();
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
          status: "error",
          duration: 5000,
          position: "bottom",
        });
      }
    }
  };
  const googleLogin = useGoogleLogin({
    clientId:
      "836402802539-eqr9obfujd1q8heagf9luptlmcid62ss.apps.googleusercontent.com",
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse;

      try {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
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
    },
  });

  return (
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
  );
};

export default GoogleLoginButton;
