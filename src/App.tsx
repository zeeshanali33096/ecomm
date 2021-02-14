import { Box, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import AuthProvider from "./Components/AuthProvider";
import CartProvider from "./Components/CartProvider";
import FeedProvider from "./Components/FeedProvider";
import LanguageProvider from "./Components/LanguageProvider";
import LocaleProvider from "./Components/LocaleProvider";
import TextProvider from "./Components/TextProvider";
import Routes from "./Pages/Routes";


const App = () => {
  return (
    <ChakraProvider resetCSS>
        <LanguageProvider>
          <LocaleProvider>
            <FeedProvider>
              <TextProvider>
                <CartProvider>
                  <AuthProvider>
                    <Routes />
                  </AuthProvider>
                </CartProvider>
              </TextProvider>
            </FeedProvider>
          </LocaleProvider>
        </LanguageProvider>
    </ChakraProvider>
  );
};

export default App;
