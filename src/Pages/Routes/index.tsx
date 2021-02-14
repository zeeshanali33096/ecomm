import { Box, Flex, Grid, Heading, useColorMode } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import LanguageEnforcedRoute from "../../Components/LanguageEnforcer";
import PrivateRoute from "../../Components/PrivateRoute";
import ScrollToTop from "../../Components/ScrollToTop";
import AuthPage from "../AuthPage";
import CartPage from "../CartPage";
import HomePage from "../HomePage";
import LanguageSelection from "../LanguageSelection";
import NotFoundPage from "../NotFoundPage";
import NotificationPage from "../NotificationPage";
import RewardsPage from "../RewardsPage";

const Routes = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    if (colorMode === "light") {
      toggleColorMode();
    }
    // console.log({ colorMode });
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <Grid height="100vh" templateRows="5em auto">
        <Header />
        <Flex
          direction="column"
          backgroundColor="gray.700"
          // height="100%"
          overflowY="auto"
          justifyContent="space-between"
        >
          <div id="scroller" />
          {/* <Box> */}
          <Switch>
            <Route exact path="/">
              <LanguageSelection start />
            </Route>

            <LanguageEnforcedRoute path="/home">
              <HomePage />
            </LanguageEnforcedRoute>

            <LanguageEnforcedRoute path="/auth">
              <AuthPage />
            </LanguageEnforcedRoute>

            <LanguageEnforcedRoute path="/cart">
              <CartPage />
            </LanguageEnforcedRoute>

            <Route path="/change-language">
              <LanguageSelection />
            </Route>

            <LanguageEnforcedRoute path="/rewards">
              <PrivateRoute>
                <RewardsPage />
              </PrivateRoute>
            </LanguageEnforcedRoute>

            <LanguageEnforcedRoute path="/notification">
              <PrivateRoute>
                <NotificationPage />
              </PrivateRoute>
            </LanguageEnforcedRoute>

            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
          {/* </Box> */}
          <Footer />
        </Flex>
      </Grid>
    </Router>
  );
};

export default Routes;
