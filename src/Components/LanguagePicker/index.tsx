import {
  Box,
  Button,
  Grid,
  Input,
  InputGroup,
  InputLeftAddon,
  List,
} from "@chakra-ui/react";

import React, { useEffect, useRef } from "react";
import LanguagePickerListItem from "../LanguagePickerListItem";
import query from "../../Utils/fuse.service";
import useComponentVisible from "../useComponentVisible";
import { LanguageContext } from "../LanguageProvider";
import { useHistory } from "react-router-dom";
import { TextContext } from "../TextProvider";

export interface Item {
  id: number;
  label: string;
  translation: string;
}

interface DropDownProps {
  left: string;
  top: string;
  width: string;
}

const textOnPage = {
  inputPlaceHolder: "Select Language",
  Heading: "Select your Language",
  inputAddon: "Language",
  button: "Proceed",
};

const LanguagePicker = () => {
  const languageSelected = React.useContext(LanguageContext);
  const [searchText, setSearchText] = React.useState<string>(
    languageSelected.label
  );
  const [selected, setSelected] = React.useState<boolean>(true);

  const text = React.useContext(TextContext);
  // console.log({searchText});

  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  const InputAddonRef = React.useRef<HTMLDivElement>(null);
  const history = useHistory();

  const [data, setData] = React.useState<Item[]>(query(""));
  const [DropDownPos, setDropDownPos] = React.useState<DropDownProps>({
    left: "0px",
    top: "0px",
    width: "10px",
  });

  const handleSelect = (id: number) => {
    // languageSelected.setCurrentLanguage(data[id]);
    setSearchText(data[id].label);
    setIsComponentVisible(false);
  };

  useEffect(() => {
    setSelected(
      data.filter((d) => d.label === searchText || d.translation === searchText)
        .length === 1
        ? false
        : true
    );
  }, [searchText, data]);

  useEffect(() => {
    resizeEvent();
  }, [ref]);

  const resizeEvent = () => {
    if (InputAddonRef.current && ref.current) {
      const top = InputAddonRef.current.clientHeight + " px";
      const left = InputAddonRef.current.clientWidth + "px";
      const width =
        (ref.current as any).clientWidth -
        InputAddonRef.current.clientWidth +
        "px";
      setDropDownPos({ top, left, width });
    }
  };

  const proceedClicked = () => {
    languageSelected.setCurrentLanguage(
      data.filter(
        (d) => d.label === searchText || d.translation === searchText
      )[0]
    );

    history.replace("/home");
  };

  useEffect(() => {
    setSearchText(languageSelected.label);
  }, [languageSelected]);

  useEffect(() => {
    // setSearchText(languageSelected.label);

    window.addEventListener("resize", resizeEvent);

    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  return (
    <>
      <Box bg="gray.600" position="relative" ref={ref} borderRadius="10px">
        <InputGroup>
          <InputLeftAddon
            ref={InputAddonRef}
            fontWeight="600"
            children={text.LanguagePicker.inputAddon}
          />
          <Input
            // autoFocus
            onSelect={(e) => setIsComponentVisible(true)}
            value={searchText}
            borderBottomRadius={isComponentVisible ? "0" : "5px"}
            bg="gray.800"
            onChange={(e) => {
              setSearchText(e.target.value);
              setData(query(e.target.value));
            }}
            type="text"
            placeholder={text.LanguagePicker.inputPlaceHolder}
          />
        </InputGroup>

        {/* DropDown */}
        {isComponentVisible && (
          <List
            position="absolute"
            left={DropDownPos.left}
            width={DropDownPos.width}
            top={DropDownPos.top}
            zIndex="50"
            // overflow="auto"
          >
            {data.map((ob, index) => (
              <LanguagePickerListItem
                onSelected={handleSelect}
                key={"languagelistitem_" + index}
                label={ob.label}
                id={index}
              />
            ))}
          </List>
        )}
      </Box>
      <Button disabled={selected} margin="2em 0em" onClick={proceedClicked}>
        {text.LanguagePicker.button}
      </Button>
    </>
  );
};

export default LanguagePicker;
