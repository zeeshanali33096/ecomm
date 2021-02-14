import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { TextContext } from "../../Components/TextProvider";

const NotFoundPage = () => {
  const text = React.useContext(TextContext);
  return (
    <Box>
      <Heading>{text.NotFound.text}</Heading>
    </Box>
  );
};

export default NotFoundPage;
