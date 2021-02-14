import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { capitalize } from "../../Utils/capitalize";
import { getProductKey } from "../../Utils/product.language";
import { CartItemsModel } from "../CartProvider";
import { TextContext } from "../TextProvider";

interface Props {
  products: CartItemsModel[];
  label: string;
  currencySymbol: string;
  exchangeRate: number;
  total: string;
}

const CostBreakUp = ({
  products,
  label,
  currencySymbol,
  exchangeRate,
  total,
}: Props) => {
  const history = useHistory();

  const text = React.useContext(TextContext);

  const x = products.map(({ product, quantity }, index) => {
    const title = capitalize(product[getProductKey("title", label)] as string);
    const price = `${(product.price * exchangeRate).toFixed(2)}`;

    return (
      <List key={`cost_${index}`} margin="1em 0">
        <ListItem>
          <Heading size="sm">{title.substring(0, 20) + ".."}</Heading>
        </ListItem>
        <ListItem>
          <Text fontSize="xs">
            {`${quantity} x ${price} = ${(
              quantity *
              (product.price * exchangeRate)
            ).toFixed(2)}`}
          </Text>
        </ListItem>
      </List>
    );
  });

  return (
    <Flex direction="column">
      <Heading size="lg" textAlign="center" margin="2em 0em">
        {text.CostBreakUp.breakupHeading}
      </Heading>
      <Box p={2}>{x}</Box>
      <Heading size="md" textAlign="center" margin="2em 0em">
        {text.CostBreakUp.totalHeading}
      </Heading>
      <Heading size="md" textAlign="center" margin="2em 0em">
        {`${currencySymbol}${total}`}
      </Heading>
      <Button
        m={2}
        disabled={products.length === 0}
        onClick={() => history.push("/rewards")}
      >
        {text.CostBreakUp.buyText}
      </Button>
    </Flex>
  );
};

export default CostBreakUp;
