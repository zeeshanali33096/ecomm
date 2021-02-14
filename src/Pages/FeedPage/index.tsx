import { SimpleGrid } from "@chakra-ui/react";
import React, { useContext } from "react";
import { CartContext } from "../../Components/CartProvider";
import { FeedContext, Product } from "../../Components/FeedProvider";
import { LanguageContext } from "../../Components/LanguageProvider";
import { LocaleContext } from "../../Components/LocaleProvider";
import ProductCard from "../../Components/ProductCard";

interface Props {
  homePageFeed: Product[];
  label: string;
  currencySymbol: string;
  exchangeRate: number;
}

const FeedPage = () => {
  const { homePageFeed } = useContext(FeedContext);
  const { label } = useContext(LanguageContext);
  const { currencySymbol, exchangeRate } = useContext(LocaleContext);
  const { addToCart } = useContext(CartContext);

  return (
    <SimpleGrid
      spacing="40px"
      minChildWidth="300px"
      height="100%"
      // overflowY="auto"
    >
      {homePageFeed.map((feed) => {
        return (
          <ProductCard
            key={feed.id}
            addToCart={addToCart}
            feed={feed}
            label={label}
            rate={exchangeRate}
            symbol={currencySymbol}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default FeedPage;
