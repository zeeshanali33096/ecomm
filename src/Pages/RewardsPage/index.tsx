import { Box, Center, Grid, Heading } from "@chakra-ui/react";
import React from "react";
import { CartContext } from "../../Components/CartProvider";
import ScratchComponent from "../../Components/ScratchComponent";
import { TextContext } from "../../Components/TextProvider";

const RewardsPage = () => {
  const { clearCart } = React.useContext(CartContext);
  const text = React.useContext(TextContext)
  React.useEffect(() => {
    // effect
    clearCart();
  }, []);
  return (
    <Grid
      templateAreas="'heading' 'canvas'"
      templateRows="100px auto"
    >
      <Heading gridArea="heading" textAlign="center">
        {text.RewardsPage.message}
      </Heading>
      <Center gridArea="canvas">
        <ScratchComponent />
      </Center>
      
    </Grid>
  );
};

export default RewardsPage;
