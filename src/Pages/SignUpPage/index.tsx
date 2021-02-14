import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import SignUpForm from "../../Components/SignUpForm";

interface Props {}

interface fromProps {
  pathname: string;
}

const SignUpPage = (props: Props) => {
  return (
    <Flex
      height="100%"
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
          For Easy Shopping!
        </Heading>
      </Box>

      <Box
        backgroundColor="gray.800"
        borderRadius="10px"
        marginBottom="2em"
        padding="1em"
      >
        <SignUpForm />
      </Box>
    </Flex>
  );
};

export default SignUpPage;
