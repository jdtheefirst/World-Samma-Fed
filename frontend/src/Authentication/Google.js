import React, { useCallback, useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const toast = useToast();
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
          status: "error",
          duration: 5000,
          position: "bottom",
        });
      }
    }
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
      try {
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

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
    },
  });

  return (
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
  );
};

export default GoogleLoginButton;
