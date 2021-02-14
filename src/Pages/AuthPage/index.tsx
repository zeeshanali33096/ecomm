import { Flex, Box, Heading } from "@chakra-ui/react";
import React from "react";
import { Route, Switch } from "react-router-dom";
import ForgotPasswordForm from "../../Components/ForgotPasswordForm";
import LoginForm from "../../Components/LoginForm";
import SignUpForm from "../../Components/SignUpForm";
import { TextContext } from "../../Components/TextProvider";

const AuthPage = () => {
  const text = React.useContext(TextContext);
  // const location = useLocation();
  // console.log({ location });
  return (
    <Flex
      width="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box padding="1em 3em" textAlign="center">
        <Heading as="h2" size="lg">
          Express Buy
        </Heading>
        <Heading as="h3" color="gray.500" size="sm">
          {text.AuthPage.tagLine}
        </Heading>
      </Box>

      <Box
        backgroundColor="gray.800"
        borderRadius="10px"
        marginBottom="2em"
        padding="1em"
      >
        <Switch>
          <Route exact path="/auth">
            <LoginForm />
          </Route>
          <Route path="/auth/signup">
            <SignUpForm />
          </Route>
          <Route path="/auth/forgot">
            <ForgotPasswordForm />
          </Route>
        </Switch>
      </Box>
    </Flex>
  );
};

export default AuthPage;
