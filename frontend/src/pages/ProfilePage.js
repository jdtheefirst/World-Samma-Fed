import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  SkeletonCircle,
  SkeletonText,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import UpperNav from "../miscellenious/upperNav";
import axiosInstance from "../components/config/axios";
import axios from "axios";
import UserListItem from "../miscellenious/Skeleton";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const ProfilePage = ({ user }) => {
  const navigate = useNavigate();
  const [club, setClub] = useState();
  const toast = useToast();
  const [showFollowers, setShowFollowers] = useState(false);
  const handleMembers = () => {
    setShowFollowers(!showFollowers);
  };
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [student, setStudent] = useState(null);
  const [show, setShow] = useState(false);

  const requestClub = useCallback(async () => {
    if (!user.coach) {
      return;
    }

    try {
      const clubId = user.coach;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      axiosInstance
        .get(`/api/clubs/${clubId}`, config)
        .then(async (response) => {
          setClub(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            toast({
              title: "Your session has expired",
              description: "Logging out in less than 8 seconds",
              duration: 8000,
              status: "loading",
              position: "bottom",
            });

            setTimeout(() => {
              localStorage.removeItem("userInfo");
              navigate("/");
            }, 8000);
          }
        });
    } catch (error) {
      console.error("Error fetching Club:", error);
    }
  }, [user?.token, setClub]);

  useEffect(() => {
    if (user) {
      requestClub();
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  const handleAcceptDecline = async (provinceId, accept) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/province/accept/decline/${provinceId}?accept=${accept}`,
        config
      );

      setUser((prevUser) => ({
        ...prevUser,
        provinceRequests: data.provinceRequests,
      }));
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occurred!",
        description: "Try again after sometime.",
        status: "error",
      });
    }
  };
  const handleAcceptDeclineNational = async (nationalId, accept) => {
    if (!user) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/national/accept/decline/${nationalId}?accept=${accept}`,
        config
      );

      setUser((prevUser) => ({
        ...prevUser,
        nationalRequests: data.nationalRequests,
      }));
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occurred!",
        description: "Try again after sometime.",
        status: "error",
      });
    }
  };
  const handleSearch = async () => {
    setShow(false);
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleAfterPay = async () => {
    if (!student) {
      toast({
        title: "Your student info was lost or never inputted!",
        description: "Failed to process",
        status: "warning",
        isClosable: true,
        position: "bottom",
      });
      setShow(false);
      return;
    }
  };
  console.log(searchResult);

  return (
    <Box
      display={"flex"}
      width={"100%"}
      justifyContent={"center"}
      flexDir={"column"}
      overflow={"auto"}
      alignItems={"center"}
      background={"white"}
    >
      <UpperNav /> <Text>worldsamma</Text>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        width={{ base: "100%", md: "80%" }}
        height={"100%"}
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        bg="white"
        mt={"10"}
        fontStyle={"italic"}
        overflow="auto"
      >
        <Box
          display={"flex"}
          textAlign={"start"}
          boxShadow="base"
          width={"100%"}
          p="0"
          rounded="md"
          bg="white"
        >
          {" "}
          <Image
            src={user?.pic}
            alt={`Profile*`}
            borderRadius="full"
            boxSize={{ base: "100px", md: "200px" }}
            border="4px solid white"
          />
          <Box textAlign={"center"} fontSize={"md"} fontFamily={"cursive"}>
            {" "}
            <Heading mb={4}>Profile</Heading>
            <Text>
              Name: {user?.name} {user?.otherName}
            </Text>
            <Text>Email: {user?.email}</Text>
            <Text>Country: {user?.country}</Text>
            <Text textAlign={"center"}>
              Coach: {user?.coach ? " ✔️" : "Not a coach"}
            </Text>
            <Text>Highest Level Attained: {user?.belt}</Text>
            {user?.admin && (
              <Button
                mt={4}
                colorScheme="teal"
                onClick={() => navigate("/admin-work-slot")}
              >
                Admin Work Slot
              </Button>
            )}
          </Box>
        </Box>
        <Box
          display="flex"
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          overflow={"auto"}
          width={"100%"}
          m={2}
          boxShadow="base"
          p="6"
          rounded="md"
          bg="white"
        >
          {" "}
          <Text
            fontSize={"sm"}
            fontWeight={500}
            bg={useColorModeValue("green.50", "green.900")}
            px={6}
            p={"3"}
            m={1}
            color={"green.500"}
            rounded={"full"}
          >
            Coach's assisted student rank upgrading
          </Text>
          <Box
            display="flex"
            pb={2}
            width={{ base: "100%", md: "60%" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Input
              placeholder="Search by email"
              mr={2}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button borderRadius={20} onClick={handleSearch}>
              🔍Search
            </Button>
          </Box>
          <Box
            display={"flex"}
            flexDir={"column"}
            overflow={"auto"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {" "}
            <Box
              display={show ? "none" : "flex"}
              flexDir={"column"}
              width={"100%"}
              maxH={"300px"}
              overflow={"auto"}
            >
              {" "}
              {loading ? (
                <Box
                  display={show ? "none" : "flex"}
                  width={"100%"}
                  padding="6"
                  boxShadow="lg"
                  bg="white"
                >
                  <SkeletonCircle size="10" />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => {
                      setStudent({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                      });
                      setShow(true);
                    }}
                  />
                ))
              )}
            </Box>
            {show && (
              <Box>
                <Text
                  textAlign={"center"}
                  fontSize={"sm"}
                  fontWeight={500}
                  bg={useColorModeValue("green.50", "green.900")}
                  px={3}
                  p={"3"}
                  m={1}
                  color={"purple.500"}
                  rounded={"full"}
                >
                  Upgrading: {student.name} {student.email}
                </Text>{" "}
                <PayPalScriptProvider
                  options={{
                    clientId:
                      "AZ5Pdn0aioG6OzW6n4Q7W64LxkdOhS0wEIOAn_UmF5askK41E72ejdrsHPJoFIcg0atbN-WZG14fd6oc",
                  }}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      const amount = 5.0;
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              currency_code: "USD",
                              value: amount.toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      await handleAfterPay();
                      return actions.order.capture().then(function (details) {
                        toast({
                          title: "Success",
                          description:
                            "Wait for WSF to send certificate to particulars.",
                          status: "success",
                          duration: 3000,
                          isClosable: true,
                          position: "bottom",
                        });
                      });
                    }}
                    onCancel={() => {
                      setShow(false);
                      toast({
                        title: "Cancelled",
                        status: "info",
                        isClosable: true,
                        position: "bottom",
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </Box>
            )}
          </Box>
        </Box>
        {user?.provinceRequests?.length > 0 && (
          <Box
            textAlign={"start"}
            fontSize={"medium"}
            fontWeight={"bold"}
            background={"white"}
            overflow={"auto"}
            boxShadow="base"
            p="4"
            height={"200px"}
            rounded="md"
            bg="white"
            width={"100%"}
          >
            <Heading mb={4}>Province Requests</Heading>
            {user?.provinceRequests.map((member, index) => (
              <Text
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                key={member._id}
                width={"100%"}
              >
                <Text
                  p={1}
                  fontStyle={"italic"}
                  width={"100%"}
                  fontSize={"x-small"}
                >
                  {" "}
                  {index + 1}.{member.provincialCoach?.name} Adm:
                  {member.provincialCoach?.admission} Approvals:{" "}
                  {member.approvals?.length}
                </Text>
                <Button
                  borderRadius={20}
                  background={"#A020F0"}
                  color={"white"}
                  _hover={{ color: "black" }}
                  fontSize={"x-small"}
                  onClick={() => handleAcceptDecline(member._id, true)}
                >
                  Approve✔️
                </Button>
                <Button
                  borderRadius={20}
                  fontSize={"x-small"}
                  color={"white"}
                  _hover={{ color: "black" }}
                  background={"#A020F0"}
                  m={1}
                  onClick={() => handleAcceptDecline(member._id, false)}
                >
                  Decline
                </Button>
              </Text>
            ))}
          </Box>
        )}
        {user?.nationalRequests?.length > 0 && (
          <Box
            textAlign={"start"}
            fontSize={"medium"}
            fontWeight={"bold"}
            background={"white"}
            overflow={"auto"}
            boxShadow="base"
            p="4"
            height={"200px"}
            rounded="md"
            bg="white"
            width={"100%"}
          >
            <Heading mb={4}>National Requests</Heading>
            {user?.nationalRequests.map((member, index) => (
              <Text
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                key={member._id}
                width={"100%"}
              >
                <Text
                  p={1}
                  fontStyle={"italic"}
                  width={"100%"}
                  fontSize={"x-small"}
                >
                  {" "}
                  {index + 1}.{member.nationalCoach.name} Adm:
                  {member.nationalCoach.admission}
                </Text>
                <Button
                  borderRadius={20}
                  background={"#A020F0"}
                  color={"white"}
                  _hover={{ color: "black" }}
                  fontSize={"x-small"}
                  onClick={() => handleAcceptDeclineNational(member._id, true)}
                >
                  Approve✔️
                </Button>
                <Button
                  borderRadius={20}
                  fontSize={"x-small"}
                  color={"white"}
                  _hover={{ color: "black" }}
                  background={"#A020F0"}
                  m={1}
                  onClick={() => handleAcceptDeclineNational(member._id, false)}
                >
                  Decline
                </Button>
              </Text>
            ))}
          </Box>
        )}
        {user?.coach && club && (
          <>
            <Box
              textAlign={"center"}
              fontSize={"small"}
              fontWeight={"bold"}
              m={2}
              background={"white"}
              boxShadow="base"
              overflow="auto"
              p="6"
              rounded="md"
              bg="white"
            >
              <Heading mb={4}>Club Details</Heading>
              <Text>Club Name: {club.name}</Text>
              <Button
                background={"transparent"}
                _hover={{ background: "transparent", color: "green" }}
                onClick={handleMembers}
                fontStyle={"italic"}
              >
                Members: {club.members.length}
              </Button>
              <Text>Followers: {club.followers.length}</Text>
              <Text>Received Likes: {club.likes.length}</Text>
            </Box>
            {showFollowers && (
              <Box
                textAlign={"start"}
                fontSize={"medium"}
                fontWeight={"bold"}
                m={4}
                background={"white"}
                overflow={"auto"}
                boxShadow="base"
                p="6"
                rounded="md"
                bg="white"
              >
                <Heading mb={4}>Members List</Heading>
                {club.members.length > 0 &&
                  club.members.map((member, index) => (
                    <Text fontSize={"small"} key={member._id}>
                      {index + 1}. Name: {member.name} Adm: {member.admission}
                    </Text>
                  ))}
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
