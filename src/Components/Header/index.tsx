import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import CartAvatarComponent from "../CartAvatarComponent";
import UserAvatar from "../UserAvatar";

const Header = () => {
  const { user } = React.useContext(AuthContext);
  const history = useHistory();

  return (
    <Flex
      direction="row"
      alignItems="center"
      backgroundColor="gray.900"
      justifyContent="space-between"
    >
      <Box p={3}>
        <Heading
          onClick={() => history.push("/home")}
          as="h2"
          userSelect="none"
          cursor="pointer"
        >
          Express Buy
        </Heading>
      </Box>
      <Flex alignItems="center">
        <Box p={3}>
          <CartAvatarComponent />
        </Box>
        <Box p={3}>
          {user === null ? (
            <Button onClick={() => history.push("/auth")}>Login</Button>
          ) : (
            <UserAvatar name={user?.displayName} url={user?.photoURL} />
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
