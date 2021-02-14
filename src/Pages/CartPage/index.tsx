import { Box, Flex, Grid, Heading, List, ListItem } from "@chakra-ui/react";
import React from "react";
import CartPageRow from "../../Components/CartPageRow";
import { CartContext } from "../../Components/CartProvider";
import CostBreakUp from "../../Components/CostBreakUp";
import { LanguageContext } from "../../Components/LanguageProvider";
import { LocaleContext } from "../../Components/LocaleProvider";
import { TextContext } from "../../Components/TextProvider";

const CartPage = () => {
  const { items, CartTotal, addToCart, removeFromCart } = React.useContext(
    CartContext
  );
  const { label } = React.useContext(LanguageContext);
  const { currencySymbol, exchangeRate } = React.useContext(LocaleContext);
  const text = React.useContext(TextContext);
  return (
    <Grid
      gridTemplateColumns={["3fr 1fr", "3fr 1fr", "4fr 1fr"]}
      height={items.length <= 1 ? "100%" : "auto"}
    >
      <Flex direction="column" width="100%">
        {items.length === 0 ? (
          <Box margin="2em 0">
            <Heading textAlign="center">{text.CartPage.noItems}</Heading>
          </Box>
        ) : (
          items.map((i, index) => {
            return (
              <CartPageRow
                key={i.product.id}
                product={i.product}
                quantity={i.quantity}
                index={index}
                label={label}
                currencySymbol={currencySymbol}
                exchangeRate={exchangeRate}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            );
          })
        )}
      </Flex>
      <Box background="gray.900" height="100%">
        <CostBreakUp
          products={items}
          currencySymbol={currencySymbol}
          exchangeRate={exchangeRate}
          label={label}
          total={CartTotal}
        />
      </Box>
    </Grid>
  );
};

export default CartPage;
