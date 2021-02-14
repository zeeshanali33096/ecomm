import { Center, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { DB } from "../../Utils/firebase";
import { LanguageContext } from "../LanguageProvider";

export interface Product {
  description_spanish: string;
  image: string;
  description: string;
  category_french: string;
  title_hindi: string;
  title: string;
  description_french: string;
  description_hindi: string;
  title_french: string;
  price: number;
  category_spanish: string;
  id: number;
  category: string;
  category_hindi: string;
  title_spanish: string;
}

interface FeedContextInitialState {
  homePageFeed: Product[];
}

interface Props {
  children: React.ReactNode;
}

const initialState: FeedContextInitialState = {
  homePageFeed: [],
};

export const FeedContext = React.createContext(initialState);

const FeedProvider = ({ children }: Props) => {
  const [homePageFeed, setHomepageFeed] = React.useState<Product[]>([]);

  const [loading, setLoading] = React.useState<boolean>(true);

  const init = async () => {
    try {
      const five = await DB.collection(`Items_english`).orderBy("id").get();
      const data = five.docs.map((ob) => ob.data());
      console.log({ data });
      setHomepageFeed(data as Product[]);
      setLoading(false);
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <FeedContext.Provider value={{ homePageFeed }}>
      {loading ? (
        <Center height="100vh">
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.900"
            color="white"
            size="xl"
          />
        </Center>
      ) : (
        children
      )}
    </FeedContext.Provider>
  );
};

export default FeedProvider;
