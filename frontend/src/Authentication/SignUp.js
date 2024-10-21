import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, VStack } from "@chakra-ui/layout";
import { Radio, RadioGroup, Stack, Text, Select } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { countries, languages } from "countries-list";
import { useNavigate } from "react-router-dom";
import { getStatesOfCountry } from "../assets/state";
import UploadPicture from "../miscellenious/PicLogic";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserFormValidation } from "../components/config/chatlogics";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState(undefined);
  const [picLoading, setPicLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [otherName, setOtherName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [provinces, setProvinces] = useState("");
  const [passport, setPassport] = useState("");
  const [subdivisions, setSubdivisions] = useState([]);
  const [language, setLanguage] = useState("");
  const [errors, setErrors] = useState({});

  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: country.name,
    label: country.name,
  }));
  const languageOptions = Object.keys(languages).map((code) => ({
    code,
    name: languages[code].name,
  }));

  const submitHandler = async () => {
    console.log(
      name,
      email,
      password,
      confirmPassword,
      gender,
      selectedCountry,
      otherName,
      provinces,
      passport,
      pic,
      language
    );
    if (
      !name ||
      !email ||
      !password ||
      !passport ||
      !gender ||
      !selectedCountry ||
      !otherName ||
      !language
      // !pic
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

      const formData = {
        name,
        email,
        password,
        confirmPassword,
        gender,
        selectedCountry,
        otherName,
        provinces,
        passport,
        pic,
        language,
      };

      const result = await UserFormValidation.safeParse(formData);

      // Handle validation result
      if (!result.success) {
        // If validation fails, set errors
        const fieldErrors = result.error.format();
        setErrors(fieldErrors);
      } else {
        // If validation passes, proceed with form submission logic
        console.log("Form data is valid:", result.data);
        const { data } = await axios.post(
          "/api/user/post",
          result.data,
          config
        );
        setPicLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/dashboard");
        setErrors({});
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occurred!",

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
    <VStack spacing="5px">
      <Box mb={"6"} fontWeight={"bold"} textAlign={"center"} width={"100%"}>
        <h1>Hello there!</h1>
        <p>
          Enter your personal details and start your journey with us. Your
          information is used solely for certification purposes
        </p>
      </Box>
      <FormControl id="first-name" isRequired>
        <FormLabel fontSize="small">First name</FormLabel>
        <Input
          placeholder="Enter your first name"
          fontSize="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <Text color="red">{errors.name._errors[0]}</Text>}
      </FormControl>

      <FormControl id="other-name" isRequired>
        <FormLabel fontSize="small">Other name</FormLabel>
        <Input
          placeholder="Enter your other name"
          value={otherName}
          fontSize="small"
          onChange={(e) => setOtherName(e.target.value)}
        />
        {errors.otherName && (
          <Text color="red">{errors.otherName._errors[0]}</Text>
        )}
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
            p={0}
            m={0}
            color={"green.400"}
            userSelect={"none"}
          >
            Your email is for certification and login only.
          </FormLabel>
        ) : (
          ""
        )}
        {errors.email && <Text color="red">{errors.email._errors[0]}</Text>}
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel fontSize="small">Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            fontSize="small"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            {show ? (
              <FaEye onClick={handleClick} style={{ cursor: "pointer" }} />
            ) : (
              <FaEyeSlash onClick={handleClick} style={{ cursor: "pointer" }} />
            )}
          </InputRightElement>
        </InputGroup>
        {errors.password && (
          <Text color="red">{errors.password._errors[0]}</Text>
        )}
      </FormControl>
      <FormControl id="password-confirm" isRequired>
        <FormLabel fontSize="small">Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            fontSize="small"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            {show ? (
              <FaEye onClick={handleClick} style={{ cursor: "pointer" }} />
            ) : (
              <FaEyeSlash onClick={handleClick} style={{ cursor: "pointer" }} />
            )}
          </InputRightElement>
        </InputGroup>
        {errors.confirmPassword && (
          <Text color="red">{errors.confirmPassword._errors[0]}</Text>
        )}
      </FormControl>
      <FormControl id="id/passport" isRequired>
        <FormLabel fontSize="small">Id/Passport</FormLabel>
        <Input
          type="number"
          placeholder="Passport"
          fontSize="small"
          value={passport}
          onChange={(e) => setPassport(e.target.value)}
        />
        {errors.passport && (
          <Text color="red">{errors.passport._errors[0]}</Text>
        )}
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
        <RadioGroup onChange={setGender} value={gender} isRequired>
          <Stack direction="row">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <UploadPicture setPic={setPic} setPicLoading={setPicLoading} />

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => submitHandler()}
        isLoading={picLoading}
        isDisabled={disabled}
        fontSize="small"
        border={"none"}
      >
        <Text> {disabled ? `Try Again after 30sec` : `Sign Up`} </Text>
      </Button>
    </VStack>
  );
};

export default Signup;
