import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Text } from "@chakra-ui/layout";
import { Badge, Image, useBreakpointValue, IconButton, CloseButton} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
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
import { BellIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../components/Context/ChatProvider";

function UpperNav (){
  const {
    user,
    notification,
    setNotification,
  } = ChatState()

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
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
        p={1}
        paddingBottom={2}
        boxShadow='lg'
      >
        <Text
          textAlign={"center"}
          fontSize="medium"
          fontWeight={"bold"}
          userSelect={"none"}
          p={0}
          m={0}
        >
          Worldsamma
        </Text>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}
        ><Button backgroundColor={"transparent"} display={displayValue} visibility={textVisibility}  _hover={{ backgroundColor: "transparent", color: "green.400" }}  onClick={() => {
          navigate('/dashboard')
        }}>My Programs</Button>
          <Button
            variant="ghost"
            onClick={onOpen}
            _hover={{ backgroundColor: "transparent", color: "green.400" }}
          >
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
                  }}
                >
                  {`New Message from ${notification.sender.name} ADM: ${notification.sender.admission}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bg="white"
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
        <IconButton backgroundColor={"transparent"} icon={<Image src="https://res.cloudinary.com/dvc7i8g1a/image/upload/v1706276791/icons8-menu-50_afv1fe.png" height={5}/>} />
      )}
            </MenuButton>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent >
          <DrawerHeader borderBottomWidth="1px" display={"flex"} justifyContent={"space-between"}>Dashboard <CloseButton onClick={onClose}/></DrawerHeader>
           <DrawerBody display={"flex"} flexDir={"column"} justifyContent={"space-between"} width={"100%"}>
            <Box padding={3} display={"flex"} justifyContent={"space-around"} flexDir={"column"}>
              <Button display={"flex"} justifyContent={"left"} alignItems={"center"} m={1} backgroundColor={"Background"} _hover={{ backgroundColor: "transparent"}}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user?.name}
                src={user?.pic}
              />
              <Text p={2} m={1}>Profile</Text>
            </Button> 
             <Button justifyContent={"left"} backgroundColor={"Background"} _hover={{ backgroundColor: "transparent", color: "green"}} onClick={() => {navigate('/dashboard'); onClose();}}>
              My Programs
            </Button>
            <Button justifyContent={"start"} backgroundColor={"Background"} _hover={{ backgroundColor: "transparent", color: "green"}} onClick={() => {navigate('/clubs'); onClose();}}>
              Clubs
            </Button>
            <Button justifyContent={"left"}  backgroundColor={"Background"} _hover={{ backgroundColor: "transparent", color: "green"}}>
             Provincial level
            </Button>
            <Button justifyContent={"left"}  backgroundColor={"Background"} _hover={{ backgroundColor: "transparent", color: "green"}}>
             National level
            </Button>
            <Button justifyContent={"left"}  backgroundColor={"Background"} _hover={{ backgroundColor: "transparent", color: "green"}}>
             International Championship
            </Button>
            </Box>
            <Button onClick={logoutHandler}>Log out</Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default UpperNav;
