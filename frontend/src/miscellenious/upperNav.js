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
import { TiThMenuOutline } from "react-icons/ti";
import { BellIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../components/Context/ChatProvider";
import Requests from "./Requests";
import logo7 from "../assets/images/final.jpeg";
import { PiSignOutLight } from "react-icons/pi";
import { PasskeyModal } from "./Password";
import { useState } from "react";
import { RiAdminLine } from "react-icons/ri";
import { MdLiveTv } from "react-icons/md";

function UpperNav() {
  const { user, notification, setNotification } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setNotification([]);
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
        boxShadow="2xl"
        zIndex={10}
        top={0}
        position={"fixed"}
      >
        <Image src={logo7} height={12} />
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Button
            backgroundColor={"transparent"}
            border={"none"}
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
            display={{ base: "none", md: "flex" }}
            border={"none"}
            onClick={onOpen}
            _hover={{ backgroundColor: "transparent", color: "green.400" }}
          >
            <Text px={4} userSelect={"none"}>
              Discover
            </Text>
          </Button>
          <Requests />
        </Box>

        <div>
          <Menu>
            <MenuButton p={1} position="relative" border={"none"}>
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
                  p={"4"}
                >
                  {`New message from ${
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
              border={"none"}
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
                  border={"none"}
                  icon={<TiThMenuOutline />}
                />
              )}
            </MenuButton>
          </Menu>
        </div>
      </Box>

      <PasskeyModal isOpen={modal} onClose={() => setModal(false)} />

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            display={"flex"}
            justifyContent={"space-between"}
          >
            Dashboard
            <CloseButton onClick={onClose} border={"none"} />
          </DrawerHeader>
          <DrawerBody
            display={"flex"}
            flexDir={"column"}
            justifyContent={"start"}
            width={"100%"}
            padding={3}
          >
            <Button
              display={"flex"}
              justifyContent={"left"}
              alignItems={"center"}
              border={"none"}
              fontSize={"medium"}
              background={"white"}
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
              border={"none"}
              background={"white"}
              _hover={{
                backgroundColor: "transparent",
                color: "blackAlpha.600",
              }}
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
              border={"none"}
              _hover={{
                backgroundColor: "transparent",
                color: "blackAlpha.600",
              }}
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
              border={"none"}
              _hover={{
                backgroundColor: "transparent",
                color: "blackAlpha.600",
              }}
              isDisabled={!user?.provinces}
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
              border={"none"}
              _hover={{
                backgroundColor: "transparent",
                color: "blackAlpha.600",
              }}
              onClick={() => {
                navigate("/national");
                onClose();
              }}
            >
              National level
            </Button>
            <Button
              background={"white"}
              justifyContent={"left"}
              border={"none"}
              _hover={{
                backgroundColor: "transparent",
                color: "blackAlpha.600",
              }}
              onClick={() => {
                navigate("/championships");
                onClose();
              }}
            >
              International Championship
            </Button>
            <Button
              background={"white"}
              justifyContent={"left"}
              border={"none"}
              _hover={{
                backgroundColor: "transparent",
                color: "blackAlpha.600",
              }}
              onClick={() => {
                navigate("/streams");
                onClose();
              }}
            >
              <MdLiveTv /> &nbsp; Streams
            </Button>
            <Button
              background={"white"}
              justifyContent={"left"}
              border={"none"}
              _hover={{
                backgroundColor: "transparent",
                color: "blackAlpha.600",
              }}
              onClick={() => {
                setModal(true);
                onClose();
              }}
            >
              <RiAdminLine /> &nbsp; Admin
            </Button>
            <Button
              background={"white"}
              justifyContent={"left"}
              border={"none"}
              _hover={{
                backgroundColor: "transparent",
                color: "blackAlpha.600",
              }}
              onClick={logoutHandler}
            >
              <PiSignOutLight /> &nbsp; Sign out
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default UpperNav;
