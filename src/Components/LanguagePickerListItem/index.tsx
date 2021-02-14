import { ListItem } from "@chakra-ui/react";
import React from "react";

interface Props {
  id: number;
  label: string;
  onSelected: (id: number) => void;
}

const LanguagePickerListItem = ({ label, id, onSelected }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    console.log({ clicked: id });
    onSelected(id);
  };
  return (
    <ListItem
      onClick={handleClick}
      _hover={{ background: "#171923", color: "white" }}
      padding="0.5em 1em"
      borderBottom="1px solid white"
      borderBottomRadius="5px"
      color="black"
      bg="gray.400"
    >
      {label}
    </ListItem>
  );
};

export default LanguagePickerListItem;
