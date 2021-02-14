import { Avatar, Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { CartContext } from "../CartProvider";

const CartAvatarComponent = () => {
  const history = useHistory();
  const avatarSize = useBreakpointValue({
    base: "sm",
    xs: "sm",
    sm: "lg",
    md: "lg",
  });

  return (
    <IconButton
      onClick={() => history.push("/cart")}
      size={avatarSize}
      aria-label="cart"
      background="#718096"
      color="white"
      fontSize="20px"
      icon={<IconComponent />}
    />
  );
};

const IconComponent: React.FC = () => {
  const { CartQuantity } = React.useContext(CartContext);

  return (
    <Box position="relative">
      <FaShoppingCart />
      {CartQuantity === 0 ? (
        <></>
      ) : (
        <Avatar
          position="absolute"
          size="xs"
          background="gray.600"
          color="white"
          right="-20px"
          name={CartQuantity.toString().split("").join(" ")}
        ></Avatar>
      )}
    </Box>
  );
};

export default CartAvatarComponent;
