import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import UpperNav from "../miscellenious/upperNav";
import axiosInstance from "../components/config/axios";
import axios from "axios";
import UserListItem from "../miscellenious/Skeleton";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import AdmissionForm from "../miscellenious/AdmissionForm";
import { GoDotFill } from "react-icons/go";
import { FaLock, FaLockOpen } from "react-icons/fa";

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
  const [register, setRegister] = useState(false);

  const requestClub = useCallback(async () => {
    if (!user.coach) {
      return;
    }
    setLoading(true);

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
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
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
      setLoading(false);
    }
  }, [user?.token, setClub, setLoading]);

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
        title: "Please enter something in search",
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
  const handleAfterPay = async (studentId) => {
    if (!studentId) {
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
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.post(
        `/api/submit/${studentId}?assisted=${true}`,
        { savePhoto: user.pic },
        config
      );
      setStudent(null);
      setShow(false);
    } catch (error) {
      setStudent(null);
      setShow(false);
      toast({
        title: "An Error Occurred!",
        description: "Please try again later",
        status: "warning",
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const belts = [
    "Guest",
    "Beginner",
    "Yellow",
    "Orange",
    "Red",
    "Purple",
    "Green",
    "Blue",
    "Brown",
    "Black",
  ];

  const Level = belts.indexOf("Black");

  return (
    <Box
      display={"flex"}
      width={"100%"}
      minH={"100vh"}
      justifyContent={"start"}
      flexDir={"column"}
      overflow={"auto"}
      alignItems={"center"}
      bg={"whitesmoke"}
    >
      <UpperNav />
      <Box
        display={"flex"}
        flexDir={'column'}
        width={{ base: "100%", md: "80%" }}
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        bg="whitesmoke"
        mt={20}
        fontStyle={"italic"}
        overflow="auto"
      >
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          textAlign={"start"}
          boxShadow="base"
          width={"100%"}
          p="0"
          rounded="md"
          bg="whitesmoke"
         >
          {" "}
          <Image
            src={user?.pic}
            alt={`Profile*`}
            borderRadius="full"
            boxSize={{ base: "100px", md: "200px" }}
            border="4px solid white"
          />
          <Box fontSize={"md"} fontFamily={"monospace"}>
            {" "}
            <Heading textAlign={"center"} mb={4} color={"teal"}>Profile</Heading>
            <Box display={"flex"}>
              <Text fontWeight={"bold"} px={1}>
                Name:
              </Text>
              {user?.name} {user?.otherName}
            </Box>
            <Box display={"flex"}>
              <Text fontWeight={"bold"} px={1}>
                Code:
              </Text>{" "}
              {user?.admission ? user?.admission : `Not enrolled: ${user?.belt}`}
            </Box>
            <Box display={"flex"}>
              <Text fontWeight={"bold"} px={1}>
                Email:
              </Text>{" "}
              {user?.email}
            </Box>
            <Box display={"flex"}>
              <Text fontWeight={"bold"} px={1}>
                Country:
              </Text>{" "}
              {user?.country}
            </Box>
            <Box display={"flex"}>
              <Text fontWeight={"bold"} px={1}>
                Province:
              </Text>{" "}
              {user?.provinces}
            </Box>
            <Box display={"flex"}>
              <Text fontWeight={"bold"} px={1}>
                Coach:
              </Text>
              {user?.coach ? " ✔️" : "Not a coach"}
            </Box>
            <Box display={"flex"} flexWrap={"wrap"}>
              <Text fontWeight={"bold"} px={1}>
                Highest Level Attained:
              </Text>{" "}
              {user?.belt}
            </Box>
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
        </Box>{" "}
        <Text width={"100%"} textAlign={"center"} p={"3"}>Access all features in one place</Text>
<Box display={"flex"} flexWrap={"wrap"} width={"100%"} p={"3"} fontSize={"small"}>
  <Box display={"flex"} justifyContent={"center"} alignItems={"center"} border={"1px solid grey"} borderRadius={"5px"} p={"1"} m={"1"}>
    <GoDotFill />
    <Text p={'1'}>Live stream competitions</Text>
    <FaLockOpen style={{color: "green"}} />
  </Box>
  <Box display={"flex"} justifyContent={"center"} alignItems={"center"} border={"1px solid grey"} borderRadius={"5px"} p={"1"} m={"1"}>
    <GoDotFill />
    <Text p={'1'}>Become a coach = 50%+ Revenue</Text>
    {user?.coach ? <FaLockOpen style={{color: "green"}} /> : <FaLock />}
  </Box>
  <Box display={"flex"} justifyContent={"center"} alignItems={"center"} border={"1px solid grey"} borderRadius={"5px"} p={"1"} m={"1"}>
    <GoDotFill />
    <Text p={'1'}>Become a provincial coach = 70%+ Revenue</Text>
    {user?.coach ? <FaLockOpen style={{color: "green"}} /> : <FaLock />}
  </Box>
  <Box display={"flex"} justifyContent={"center"} alignItems={"center"} border={"1px solid grey"} borderRadius={"5px"} p={"1"} m={"1"}>
    <GoDotFill />
    <Text p={'1'}>Become a national coach = 90%+ Revenue</Text>
    {user?.coach ? <FaLockOpen style={{color: "green"}} /> : <FaLock />}
  </Box>
</Box>
        {user?.coach && (
          <>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              width={"100%"}
              minH={"200px"}
              overflow={"auto"}
            >
              {loading ? (
                <Stack width={"100%"}>
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </Stack>
              ) : (
                <Box
                  display="flex"
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
                  overflow="auto"
                  width={{ base: "100%", md: "60%" }}
                  boxShadow="base"
                  mt={2}
                  p="4"
                  rounded="md"
                  bg="whitesmoke"
                >
                  <Heading mb={2}>Club Details</Heading>
                  <Text
                    fontSize={"sm"}
                    fontWeight={500}
                    bg={useColorModeValue("green.50", "green.900")}
                    p={2}
                    px={3}
                    color={"green.500"}
                    rounded={"full"}
                    margin={1}
                    width={"90%"}
                  >
                    Status (*
                    {club && club.registered ? "Registered" : "Not registered"})
                  </Text>
                  <Text>Club Name: {club?.name}</Text>
                  <Text>Club Code: {club?.code}</Text>
                  <Button
                    background={"transparent"}
                    _hover={{ background: "transparent", color: "green" }}
                    onClick={handleMembers}
                    fontStyle={"italic"}
                  >
                    Members: {club?.members.length}
                  </Button>
                  <Text>Followers: {club?.followers.length}</Text>
                  <Text>Received Likes: {club?.likes.length}</Text>
                </Box>
              )}

              {showFollowers && (
                <Box
                  display={"flex"}
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
                  background={"white"}
                  overflow={"auto"}
                  boxShadow="base"
                  p="6"
                  mt={2}
                  rounded="md"
                  bg="whitesmoke"
                  width={{ base: "100%", md: "60%" }}
                >
                  <Heading mb={2}>Members List</Heading>
                  {club.members.length > 0 &&
                    club.members.map((member, index) => (
                      <Text fontSize={"small"} key={member._id}>
                        {index + 1}. Name: {member.name} Adm: {member.admission}
                      </Text>
                    ))}
                </Box>
              )}
            </Box>
          </>
        )}
        {user?.coach && (
          <Text textAlign={"center"} width={"100%"}>
            <Button
              background={"purple.400"}
              onClick={() => setRegister(!register)}
            >
              Register Students Manually
            </Button>
            {register && `↓`}
          </Text>
        )}
        {register && (
          <Box
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            overflow="auto"
            width="100%"
            m={2}
            boxShadow="base"
            p="4"
            rounded="md"
            background="whitesmoke"
          >
            {" "}
            <AdmissionForm />
          </Box>
        )}
        {user?.coach &&
          club?.registered &&
          belts.indexOf(user?.belt) >= Level && (
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
              bg="whitesmoke"
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
                  placeholder="Search by name, email, or admission"
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
                      bg="whitesmoke"
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
                            pic: user.pic,
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
                      ($5 Fee)
                    </Text>{" "}
                    <PayPalScriptProvider
                      options={{
                        clientId:
                          "AZAdYFR_SbadcgOcCLYn9ajkReJTZmOCnEeAvQ3xPYAE5BMYFBHi4vDeILfNwBO-hh-8wfyGC9lNeB1I",
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
                          await handleAfterPay(student.id);
                          return actions.order
                            .capture()
                            .then(function (details) {
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
          )}
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
            bg="whitesmoke"
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
            bg="whitesmoke"
            width={"100%"}
          >
            <Heading mb={4}>National Requests</Heading>
            {user?.nationalRequests.map((member, index) => (
              <Box
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
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
