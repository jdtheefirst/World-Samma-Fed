import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Text } from "@chakra-ui/layout";
import {
  Badge,
  Image,
  useBreakpointValue,
  IconButton,
  CloseButton,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
<<<<<<< HEAD
=======
import { TiThMenuOutline } from "react-icons/ti";
>>>>>>> master
import { BellIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../components/Context/ChatProvider";
import Requests from "./Requests";
<<<<<<< HEAD

function UpperNav() {
  const { user, notification, setNotification } = ChatState();

=======
import React from "react";
import logo7 from "../final.jpeg";

function UpperNav() {
  const { user, notification, setNotification } = ChatState();
>>>>>>> master
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
<<<<<<< HEAD
=======
    setNotification([]);
>>>>>>> master
    navigate("/");
  };

  const displayValue = useBreakpointValue({ base: "none", md: "flex" });

  const textVisibility = useBreakpointValue({
    base: "hidden",
    md: "visible",
  });

  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p={3}
        paddingBottom={2}
<<<<<<< HEAD
        boxShadow="lg"
=======
        boxShadow="2xl"
>>>>>>> master
        zIndex={10}
        top={0}
        position={"fixed"}
      >
<<<<<<< HEAD
        <Text
          textAlign={"center"}
          fontSize={{ base: "small", md: "medium" }}
          fontWeight={"bold"}
          userSelect={"none"}
          p={0}
          m={0}
          pl={3}
        >
          Worldsamma
        </Text>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Button
            backgroundColor={"transparent"}
=======
        <Image src={logo7} height={12}/>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Button
            backgroundColor={"transparent"}
            border={"none"}
>>>>>>> master
            display={displayValue}
            visibility={textVisibility}
            _hover={{ backgroundColor: "transparent", color: "green.400" }}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            My Programs
          </Button>
          <Button
            variant="ghost"
<<<<<<< HEAD
=======
            display={{ base: "none", md: "flex" }}
            border={"none"}
>>>>>>> master
            onClick={onOpen}
            _hover={{ backgroundColor: "transparent", color: "green.400" }}
          >
            <Text
<<<<<<< HEAD
              display={{ base: "none", md: "flex" }}
=======
>>>>>>> master
              px={4}
              userSelect={"none"}
            >
              Discover
            </Text>
          </Button>
          <Requests />
        </Box>

        <div>
          <Menu>
<<<<<<< HEAD
            <MenuButton p={1} position="relative">
=======
            <MenuButton p={1} position="relative" border={"none"}>
>>>>>>> master
              <BellIcon fontSize="2xl" p={0} m={0} />
              {notification.length > 0 && (
                <Badge
                  variant="subtle"
                  position="absolute"
                  top="-3px"
                  right="-3px"
                  backgroundColor={"red"}
                  zIndex={1}
                  borderRadius={"50%"}
                  color="white"
                >
                  {notification.length}
                </Badge>
              )}
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {`New Message from ${
                    notif.sender ? notif.sender.name : "Coach"
                  } ADM: ${notif.sender ? notif.sender.admission : " "}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bg="white"
<<<<<<< HEAD
=======
              border={"none"}
>>>>>>> master
              _hover={{ backgroundColor: "transparent" }}
              onClick={onOpen}
            >
              {displayValue === "flex" ? (
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user?.name}
                  src={user?.pic}
                />
              ) : (
                <IconButton
                  backgroundColor={"transparent"}
<<<<<<< HEAD
                  icon={
                    <Image
                      src="https://res.cloudinary.com/dvc7i8g1a/image/upload/v1706276791/icons8-menu-50_afv1fe.png"
                      height={5}
                    />
=======
                  border={"none"}
                  icon={
                    <TiThMenuOutline />
>>>>>>> master
                  }
                />
              )}
            </MenuButton>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
<<<<<<< HEAD
        <DrawerOverlay />
=======
      <DrawerOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
>>>>>>> master
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            display={"flex"}
            justifyContent={"space-between"}
          >
<<<<<<< HEAD
            Dashboard <CloseButton onClick={onClose} />
=======
            Dashboard
            <CloseButton onClick={onClose} border={"none"} />
>>>>>>> master
          </DrawerHeader>
          <DrawerBody
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Box
              padding={3}
              display={"flex"}
              justifyContent={"space-around"}
              flexDir={"column"}
            >
              <Button
                display={"flex"}
                justifyContent={"left"}
                alignItems={"center"}
<<<<<<< HEAD
=======
                border={"none"}
>>>>>>> master
                background={"white"}
                m={1}
                _hover={{ backgroundColor: "transparent", color: "green" }}
                onClick={() => navigate("/profile")}
              >
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user?.name}
                  src={user?.pic}
                />
                <Text p={2} m={1}>
                  Profile
                </Text>
              </Button>
              <Button
                justifyContent={"left"}
<<<<<<< HEAD
=======
                border={"none"}
>>>>>>> master
                background={"white"}
                _hover={{ backgroundColor: "transparent", color: "green" }}
                onClick={() => {
                  navigate("/dashboard");
                  onClose();
                }}
              >
                My Programs
              </Button>
              <Button
                justifyContent={"start"}
                background={"white"}
<<<<<<< HEAD
=======
                border={"none"}
>>>>>>> master
                _hover={{ backgroundColor: "transparent", color: "green" }}
                onClick={() => {
                  navigate("/clubs");
                  onClose();
                }}
              >
                Clubs
              </Button>
              <Button
                justifyContent={"left"}
                background={"white"}
<<<<<<< HEAD
                _hover={{ backgroundColor: "transparent", color: "green" }}
=======
                border={"none"}
                _hover={{ backgroundColor: "transparent", color: "green" }}
                isDisabled={!user?.provinces}
>>>>>>> master
                onClick={() => {
                  navigate("/province");
                  onClose();
                }}
              >
                Provincial level
              </Button>
              <Button
                background={"white"}
                justifyContent={"left"}
<<<<<<< HEAD
                _hover={{ backgroundColor: "transparent", color: "green" }}
=======
                border={"none"}
                _hover={{ backgroundColor: "transparent", color: "green" }}
                onClick={() => {
                  navigate("/national");
                  onClose();
                }}
>>>>>>> master
              >
                National level
              </Button>
              <Button
                background={"white"}
                justifyContent={"left"}
<<<<<<< HEAD
                _hover={{ backgroundColor: "transparent", color: "green" }}
=======
                border={"none"}
                _hover={{ backgroundColor: "transparent", color: "green" }}
                onClick={()=> {
                  navigate("/championships")
                }}
>>>>>>> master
              >
                International Championship
              </Button>
            </Box>
<<<<<<< HEAD
            <Button onClick={logoutHandler}>Log out</Button>
=======
            <Button border={"none"} onClick={logoutHandler}>Log out</Button>
>>>>>>> master
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default UpperNav;
