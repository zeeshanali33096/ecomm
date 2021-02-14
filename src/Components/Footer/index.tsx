import React from "react";
import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { TextContext } from "../TextProvider";

// const FooterColumn = (children: any) => {
//   return <Flex direction="column">{children}</Flex>;
// };

const Footer = () => {
  const text = React.useContext(TextContext);
  return (
    <Grid
      bg="gray.900"
      minHeight="150px"
      // templateColumns="1fr 1fr 1fr"
      textAlign="center"
      justifyItems="center"
      alignContent="center"
    >
      <Flex direction="column">
        <Box m={5}>
          <NavLink to="/change-language">
            <Heading size="md">{text.Footer.changeLanguage}</Heading>
          </NavLink>
        </Box>
        <Box m={5}>
          <NavLink to="/notification">
            <Heading size="md">{text.Footer.notification}</Heading>
          </NavLink>
        </Box>
      </Flex>
    </Grid>
  );
};

export default Footer;
