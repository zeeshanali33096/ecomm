import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";
import { FcSearch } from "react-icons/fc";
import { LocaleContext } from "../LocaleProvider";

const HomePageHeader = () => {
  const locale = React.useContext(LocaleContext);
  return (
    <Flex
      width="100%"
      height="100%"
      direction="row"
      wrap="nowrap"
      alignItems="center"
      justifyContent="space-around"
      padding="1em 1em"
      backgroundColor="gray.900"
      //   borderBottom="1px solid gray"
    >
      <Flex direction="row" justifyContent="space-evenly">
        <InputGroup margin="0em 1em">
          <InputLeftElement pointerEvents="none" children={<FcSearch />} />
          <Input colorScheme="whiteAlpha" variant="filled" type="text" />
        </InputGroup>
        <Button>Search</Button>
      </Flex>

      <Heading as="h3" size="md">
        Showing in <span>{locale.currencySymbol}</span>
      </Heading>
    </Flex>
  );
};

export default HomePageHeader;
