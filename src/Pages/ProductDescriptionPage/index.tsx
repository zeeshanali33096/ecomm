import {
  Box,
  Text,
  Image,
  Flex,
  SimpleGrid,
  Heading,
  Container,
  Grid,
  Button,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import { FeedContext, Product } from "../../Components/FeedProvider";
import { LanguageContext } from "../../Components/LanguageProvider";
import { LocaleContext } from "../../Components/LocaleProvider";
import { TextContext } from "../../Components/TextProvider";
import { capitalize } from "../../Utils/capitalize";
import { getProductKey } from "../../Utils/product.language";

interface Params {
  id: string;
}

const ProductDescriptionPage = () => {
  const { id } = useParams() as Params;
  const { homePageFeed } = useContext(FeedContext);
  const { label } = useContext(LanguageContext);
  const { currencySymbol, exchangeRate } = useContext(LocaleContext);
  const text = React.useContext(TextContext);
  const feed = homePageFeed.filter((f: Product) => f.id === parseInt(id))[0];
  if (!id || !feed) {
    return <Redirect to="/404" />;
  } else {
    const title = capitalize(feed[getProductKey("title", label)] as string);
    const description = feed[getProductKey("description", label)] as string;
    const category = capitalize(
      feed[getProductKey("category", label)] as string
    );
    const price = `${Math.round(feed.price * exchangeRate)}`;
    return (
      //   <Box height="100%">
      <SimpleGrid height="100%" spacing="40px" minChildWidth="225px">
        <Image
          alignSelf="center"
          justifySelf="center"
          //   boxSize="250px"
          objectFit="cover"
          src={feed.image}
          alt="product"
        />

        <Grid templateRows="170px 4fr 5em" overflowY="auto">
          <Flex textAlign="center" direction="column" alignItems="center">
            <Heading as="h4" size="lg">
              {title}
            </Heading>
            <Text fontSize="sm">{text.ProductDescriptionPage.category}</Text>
            <Text fontSize="md">{category}</Text>
          </Flex>
          <Flex direction="column">
            <Heading margin="1em 0.5em" as="h4" textAlign="left" size="md">
              {text.ProductDescriptionPage.descriptionHeader}
            </Heading>
            <Container textAlign="justify" size="md">
              {description}
            </Container>
          </Flex>
          <Flex alignItems="center" justifyContent="space-around">
            <Flex>
              <Text fontSize="sm">{currencySymbol}</Text>
              <Heading fontSize="lg">{price}</Heading>
            </Flex>
            <Button>{text.ProductDescriptionPage.buttonText}</Button>
          </Flex>
        </Grid>
      </SimpleGrid>
      //   </Box>
    );
  }
};

export default ProductDescriptionPage;
