import { Center, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Redirect } from "react-router-dom";
import LanguagePicker from "../../Components/LanguagePicker";
import { LanguageContext } from "../../Components/LanguageProvider";
import { TextContext } from "../../Components/TextProvider";

interface Props {
  start?: boolean;
}
const LanguageSelection = ({ start }: Props) => {
  const languagePreference = React.useContext(LanguageContext);
  const text = React.useContext(TextContext);

  if (start && languagePreference.id !== -1) {
    return <Redirect to="/home" />;
  } else {
    return (
      <Center>
        <Flex direction="column">
          <Heading margin="1em 0em">{text.LanguagePicker.Heading}</Heading>
          <LanguagePicker />
        </Flex>
      </Center>
    );
  }
};

export default LanguageSelection;
