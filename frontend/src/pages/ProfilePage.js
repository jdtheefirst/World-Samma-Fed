import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  FormLabel,
  Heading,
  Image,
  Input,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  Textarea,
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
import {
  makePaymentMpesa,
  useConnectSocket,
} from "../components/config/chatlogics";

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
  const [payment, setPayment] = useState(false);
  const [register, setRegister] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [show, setShow] = useState(false);
  const [savePhoto, setSavePhoto] = useState("");
  const [details, setDetails] = useState("");
  const [photoLoading, setPhotoLoading] = useState(false);
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [studentId, setStudentId] = useState("");
  const adminId = "6693a995f6295b8bd90d9301";

  const socket = useConnectSocket(user);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    if (socket) {
      setIsSocketConnected(socket.connected);

      socket.on("connect", () => {
        setIsSocketConnected(true);
      });

      socket.on("disconnect", () => {
        setIsSocketConnected(false);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (isSocketConnected) {
      socket.on("Upgrade", async () => {
        await submitDetails();
        toast({
          title: "Submitting details!",
          status: "loading",
          duration: 5000,
          position: "bottom",
        });
      });
      return () => {
        socket.off("Upgrade");
      };
    }
  });

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
    setPayment(false);
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

  const handlePhotoChange = (event) => {
    setPassportPhoto(event.target.files[0]);
  };
  const submitHandler = useCallback(
    async (studentId) => {
      if (!user) {
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
          `/api/submit/${user._id}?studentId=${studentId}`,
          {
            savePhoto,
            details,
          },
          config
        );
        toast({
          title: "Submission successful!",
          description: "Wait for your results under 24hrs",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Error occurred trying to send your work!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    },
    [toast, user, savePhoto, details]
  );

  useEffect(() => {
    if (savePhoto || studentId) {
      submitHandler(studentId);
    }
  }, [savePhoto, studentId]);

  const submitDetails = () => {
    if (passportPhoto) {
      setPhotoLoading(true);

      let data = new FormData();
      data.append("file", passportPhoto);
      data.append("upload_preset", "worldsamma");

      fetch("https://api.cloudinary.com/v1_1/dsdlgmgwi/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setSavePhoto(data.url);
          setPhotoLoading(false);
        })
        .catch((err) => {
          setPhotoLoading(false);
          toast({
            title: "Error Occurred uploading your passport photo.",
            description: "Please try again later.",
            duration: 5000,
            status: "error",
          });
        });
    }
  };

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
        flexDir={"column"}
        width={{ base: "100%", md: "80%" }}
        bg="whitesmoke"
        mt={20}
        fontFamily="Arial, sans-serif"
        overflow="auto"
      >
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          textAlign={"start"}
          boxShadow="base"
          width={"100%"}
          p="2"
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
          <Box fontSize={"md"}>
            {" "}
            <Heading textAlign={"center"} mb={4} color={"teal"}>
              Profile
            </Heading>
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
              {user?.admission
                ? user?.admission
                : `Not enrolled: ${user?.belt}`}
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
            {user?._id === adminId && (
              <Box display={"flex"} flexWrap={"wrap"}>
                <Button
                  colorScheme="teal"
                  onClick={() => navigate("/admin-work-slot")}
                  border={"none"}
                  m={1}
                >
                  Admin Work Slot
                </Button>
              </Box>
            )}
          </Box>
        </Box>{" "}
        <Text width={"100%"} textAlign={"center"} p={"3"}>
          Access all features in one place
        </Text>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          width={"100%"}
          p={"3"}
          fontSize={"small"}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            border={"1px solid grey"}
            borderRadius={"5px"}
            p={"1"}
            m={"1"}
          >
            <GoDotFill />
            <Text p={"1"}>Live stream competitions</Text>
            <FaLockOpen style={{ color: "green" }} />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            border={"1px solid grey"}
            borderRadius={"5px"}
            p={"1"}
            m={"1"}
          >
            <GoDotFill />
            <Text p={"1"}>Become a coach = 50%+ Revenue</Text>
            {user?.coach ? (
              <FaLockOpen style={{ color: "green" }} />
            ) : (
              <FaLock />
            )}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            border={"1px solid grey"}
            borderRadius={"5px"}
            p={"1"}
            m={"1"}
          >
            <GoDotFill />
            <Text p={"1"}>Become a provincial coach = 70%+ Revenue</Text>
            {user?.coach ? (
              <FaLockOpen style={{ color: "green" }} />
            ) : (
              <FaLock />
            )}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            border={"1px solid grey"}
            borderRadius={"5px"}
            p={"1"}
            m={"1"}
          >
            <GoDotFill />
            <Text p={"1"}>Become a national coach = 90%+ Revenue</Text>
            {user?.coach ? (
              <FaLockOpen style={{ color: "green" }} />
            ) : (
              <FaLock />
            )}
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
          <Box
            display="flex"
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            overflow={"auto"}
            width={"100%"}
            boxShadow="base"
            p="6"
            rounded="md"
            bg="whitesmoke"
          >
            <Box textAlign={"center"} width={"100%"} mb={"4"}>
              <Button
                background={"purple.400"}
                onClick={() => setRegister(!register)}
              >
                Register Students Manually
              </Button>
              {register && `↓`}
            </Box>
            {register && (
              <Box
                display="flex"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                overflow="auto"
                width="100%"
                boxShadow="base"
                p="4"
                rounded="md"
                background="whitesmoke"
              >
                {" "}
                <AdmissionForm />
              </Box>
            )}
            <Text
              fontSize={"sm"}
              fontWeight={500}
              bg={useColorModeValue("green.50", "green.900")}
              px={6}
              p={"3"}
              mb={"4"}
              color={"green.500"}
              rounded={"full"}
            >
              Coach's assisted student rank upgrading
            </Text>
            {!details || !passportPhoto}
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
                fontSize={"small"}
              />
              <Button borderRadius={20} onClick={handleSearch}>
                🔍Search
              </Button>
            </Box>
            <Text>Or</Text>
            {!student && (
              <Box
                display="flex"
                pb={2}
                width={{ base: "100%", md: "60%" }}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Textarea
                  placeholder="Enter student details"
                  mr={2}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  fontSize={"small"}
                />
                <FormLabel>Picture</FormLabel>
                <Input
                  type="file"
                  accept="image/*" // Only accept image files
                  borderRadius={20}
                  fontSize={"small"}
                  onChange={handlePhotoChange}
                  isDisabled={photoLoading}
                />
              </Box>
            )}
            <Box
              display={"flex"}
              flexDir={"column"}
              overflow={"auto"}
              width={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              overflowY={"auto"}
            >
              <Box
                display={payment ? "none" : "flex"}
                flexDir={"column"}
                width={"100%"}
                maxH={"300px"}
                overflow={"auto"}
              >
                {loading ? (
                  <Box
                    display={"flex"}
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
                        setPayment(true);
                      }}
                    />
                  ))
                )}
              </Box>
              {(payment || (details && passportPhoto)) && (
                <Box p={"6"}>
                  <Text
                    textAlign={"center"}
                    fontSize={"sm"}
                    fontWeight={500}
                    bg={useColorModeValue("green.50", "green.900")}
                    px={3}
                    p="2.5"
                    mb={"4"}
                    color={"purple.500"}
                    rounded={"full"}
                  >
                    Upgrading: {student?.name} {student?.email} {details}
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
                        await submitDetails();
                        await setStudentId(student._id);
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
                        setPayment(false);
                        toast({
                          title: "Cancelled",
                          status: "info",
                          isClosable: true,
                          position: "bottom",
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                  <Button
                    fontSize={"small"}
                    width={"100%"}
                    bg={useColorModeValue("green.100", "green.900")}
                    onClick={() => {
                      setShow(true);
                    }}
                    p={0}
                  >
                    <Image
                      height={5}
                      width={"auto"}
                      src={
                        "https://res.cloudinary.com/dvc7i8g1a/image/upload/v1694007922/mpesa_ppfs6p.png"
                      }
                      alt={""}
                      loading="lazy"
                    />{" "}
                    Pay via Mpesa
                  </Button>
                  {show && (
                    <Box padding={"6"}>
                      <Text
                        textAlign={"center"}
                        justifyContent={"center"}
                        fontSize={"xl"}
                      >
                        Enter Your Mpesa Phone Number (KSH 450/=)
                      </Text>
                      <Input
                        fontSize={"small"}
                        color={"green.400"}
                        fontWeight={"bold"}
                        placeholder="Enter phone number"
                        textAlign={"center"}
                        type="number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                        minLength={10}
                        maxLength={10}
                      />
                      <Divider p={2} />
                      <Button
                        width={"100%"}
                        onClick={() => {
                          makePaymentMpesa("450", phoneNumber, user, toast);
                          setShow(false);
                          toast({
                            title: "Wait as message is sent",
                            status: "loading",
                            isClosable: true,
                            position: "bottom",
                            duration: 5000,
                          });
                        }}
                        isDisabled={phoneNumber.length !== parseInt(10)}
                        colorScheme="green"
                      >
                        Proceed
                      </Button>
                      <Text textAlign={"center"} justifyContent={"center"}>
                        You'll be sent a Message
                      </Text>
                    </Box>
                  )}
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
