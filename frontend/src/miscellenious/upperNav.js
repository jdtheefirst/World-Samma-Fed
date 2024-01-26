import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Text } from "@chakra-ui/layout";
import { Badge, Image, useBreakpointValue, IconButton } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../components/Context/ChatProvider";
import { useEffect } from "react";

function UpperNav (){

  const {
    user,
    setUser,
    notification,
    setNotification,
  } = ChatState()

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  useEffect(() => {
   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   if(!userInfo){
    navigate('/');
    return;
   }
  setUser(userInfo);
}, [setUser, navigate]);

  

  const displayValue = useBreakpointValue({ base: "none", md: "flex" });

  const textVisibility = useBreakpointValue({
    base: "hidden",
    md: "visible",
  });

  console.log(user);


  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        boxShadow='lg'
      >
        <Text
          display={displayValue}
          justifyContent={"center"}
          alignItems={"space-between"}
          fontSize="2xl"
          userSelect={"none"}
          visibility={textVisibility}
        >
          Worldsamma
        </Text>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}
        ><Button backgroundColor={"transparent"}  _hover={{ backgroundColor: "transparent", color: "green.400" }}  onClick={() => {
          navigate('/dashboard')
        }}>My Programs</Button>
          <Button
            variant="ghost"
            onClick={onOpen}
            _hover={{ backgroundColor: "transparent", color: "green.400" }}
          >
            <i className="fas fa-search"></i>
            <Text
              display={{ base: "none", md: "flex" }}
              px={4}
              userSelect={"none"}
            >
              Discover
            </Text>
           
          </Button>
         <Button backgroundColor={"Background"} _hover={{ backgroundColor: "transparent"}}><Image src="https://res.cloudinary.com/dvc7i8g1a/image/upload/v1706249110/icons8-search-50_xjjjxc.png" height={5}/></Button>
        </Box>

        <div>
          <Menu>
            <MenuButton p={1} position="relative">
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
                    const otherNotifications = notification.filter(
                      (n) => n.chat._id !== notif.chat._id
                    );
                    setNotification(otherNotifications);
                  }}
                >
                  {/* {`New Message from ${getSenderName(user, notif.chat.users)}`} */}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bg="white"
              _hover={{ backgroundColor: "green.100" }}
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user?.name}
                src={user?.pic}
              />
            </MenuButton>
            <MenuList>
              {/* <ClientModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ClientModal> */}
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Dashboard</DrawerHeader>
           <DrawerBody display={"flex"} flexDir={"column"} justifyContent={"space-between"} width={"100%"}>
            <Box padding={3}><Text>
              Profile
            </Text> 
             <Text textAlign={"start"}>
              My Programs
            </Text> </Box>
            <Button>Log out</Button>
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default UpperNav;
