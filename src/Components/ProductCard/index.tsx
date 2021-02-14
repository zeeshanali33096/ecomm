import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Grid,
  Skeleton,
  useImage,
} from "@chakra-ui/react";
import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { capitalize } from "../../Utils/capitalize";
import { getProductKey } from "../../Utils/product.language";
import { Product } from "../FeedProvider";

import ErrorImage from "../../Images/not-found-image.jpg";
import QuantityForm from "../QuantiyForm";

interface Props {
  feed: Product;
  label: string;
  rate: number;
  symbol: string;
  addToCart: (product: Product, quantity: number, index: number) => void;
}

const ProductCard = ({ feed, label, rate, symbol, addToCart }: Props) => {
  const title = capitalize(feed[getProductKey("title", label)] as string);
  const category = capitalize(feed[getProductKey("category", label)] as string);
  const price = `${(feed.price * rate).toFixed(2)}`;
  const history = useHistory();
  const match = useRouteMatch();

  const [Quantity, setQuantity] = React.useState(1);

  const onImageLoad = () => {
    // setImageLoaded(true);
  };

  const useImageHook = useImage({
    src: feed.image,
    onLoad: onImageLoad,
    onError: onImageLoad,
  });

  const gotoDescription = () => {
    history.push(`${match.url}/${feed.id}`);
  };

  const pushToCart = (quantity: number) => {
    // console.log({ quantity, id: feed["id"] });
    addToCart(feed, quantity, feed["id"]);
  };

  return (
    <Box p={5} backgroundColor="gray.900">
      <Grid templateRows="120px 4fr 5em">
        <Flex
          onClick={gotoDescription}
          textAlign="center"
          direction="column"
          alignItems="center"
        >
          <Heading as="h4" size="sm">
            {title}
          </Heading>
          <Text fontSize="xs">IN</Text>
          <Text fontSize="sm">{category}</Text>
        </Flex>
        {useImageHook === "loaded" ? (
          <Image
            onClick={gotoDescription}
            alignSelf="center"
            justifySelf="center"
            boxSize="250px"
            objectFit="cover"
            src={feed.image}
            alt="product"
          />
        ) : useImageHook === "loading" ? (
          <Skeleton alignSelf="center" boxSize="250px" justifySelf="center" />
        ) : (
          <Image
            onClick={gotoDescription}
            alignSelf="center"
            justifySelf="center"
            boxSize="250px"
            objectFit="cover"
            src={ErrorImage}
            alt="product"
          />
        )}

        <Grid
          templateColumns="1fr 3fr"
          alignItems="center"
          justifyContent="center"
        >
          <Flex>
            <Text fontSize="xs">{symbol}</Text>
            <Text fontSize="md">{price}</Text>
          </Flex>
          <Box>
            <QuantityForm handleAddToCart={pushToCart} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductCard;
