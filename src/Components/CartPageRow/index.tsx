import {
  Flex,
  Heading,
  Text,
  Image,
  Grid,
  Center,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { capitalize } from "../../Utils/capitalize";
import { getProductKey } from "../../Utils/product.language";
import { Product } from "../FeedProvider";
import { TextContext } from "../TextProvider";

interface Props {
  product: Product;
  quantity: number;
  label: string;
  index: number;
  currencySymbol: string;
  exchangeRate: number;
  addToCart: (product: Product, quantity: number, index: number) => void;
  removeFromCart: (product: Product, index: number, all?: boolean) => void;
}

const CartPageRow = ({
  product,
  quantity,
  label,
  currencySymbol,
  exchangeRate,
  addToCart,
  removeFromCart,
  index,
}: Props) => {
  const title = capitalize(product[getProductKey("title", label)] as string);
  const description = product[getProductKey("description", label)] as string;
  const text = React.useContext(TextContext);

  const category = capitalize(
    product[getProductKey("category", label)] as string
  );

  const handleAddButtonClicked = (e: React.MouseEvent) => {
    addToCart(product, 1, 0);
  };

  const handleRemoveButtonClicked = (e: React.MouseEvent) => {
    e.preventDefault();
    removeFromCart(product, index);
  };

  const price = `${(product.price * exchangeRate).toFixed(2)}`;
  return (
    <Grid
      templateAreas={[
        "'photo' 'description' 'quantity'",
        "'photo' 'description' 'quantity'",
        "'photo description quantity'",
      ]}
      templateColumns={["100%", "100%", "200px 2fr 100px"]}
      //   templateRows="auto auto auto"
      alignContent="center"
      justifyItems="center"
      width="100%"
      gridGap="20px"
      padding="2em"
      marginBottom="2em"
      // marginTop="2em"
      // height="100%"
    >
      <Image
        gridArea="photo"
        src={product.image}
        objectFit="cover"
        boxSize="200px"
      />
      <Grid
        templateAreas="'title' 'category' 'description' 'cost'"
        templateRows="50px 20px 75px 15px"
        gridGap="10px"
        textAlign="center"
      >
        <Heading textAlign="center" gridArea="title" size="md">
          {title}
        </Heading>
        <Text gridArea="category" size="md">
          {category}
        </Text>
        <Text
          gridArea="description"
          isTruncated
          noOfLines={3}
          textOverflow="ellipsis"
          overflow="hidden"
          size="sm"
        >
          {description}
        </Text>

        <Flex
          gridArea="cost"
          text="center"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="xs">{currencySymbol}</Text>
          <Text fontSize="md">{price}</Text>
        </Flex>
      </Grid>
      <Center gridArea="quantity" textAlign="center">
        <Flex direction="column">
          <Heading size="sm">{text.QuantityForm.selectLabel}</Heading>
          <Heading size="sm">{quantity}</Heading>
          <Flex direction="row">
            <Button m={2} onClick={handleAddButtonClicked}>
              +
            </Button>
            <Button m={2} onClick={handleRemoveButtonClicked}>
              -
            </Button>
          </Flex>
        </Flex>
      </Center>
    </Grid>
  );
};

export default CartPageRow;
