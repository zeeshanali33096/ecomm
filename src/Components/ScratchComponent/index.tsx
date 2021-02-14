import React from "react";
import scratchImage from "../../Images/scratch.jpg";
// @ts-ignore
import ScratchCard from "react-scratchcard";
import { Box, Button, Center, Flex, Heading } from "@chakra-ui/react";
import { LocaleContext } from "../LocaleProvider";
import { TextContext } from "../TextProvider";
import SCard from "../SCard";

import NewScratchCard from "../NewScratchCard";

const ScratchComponent = () => {
  const [load, setLoad] = React.useState(false);
  const text = React.useContext(TextContext);

  const settings = {
    width: 300,
    height: 300,
    image: scratchImage,
    background: "gray.200",
    finishPercent: 40,
    onComplete: () => console.log("The card is now clear!"),
  };

  const number = Math.round(Math.random() * 1000);
  console.log({ number });

  const { exchangeRate, currencySymbol } = React.useContext(LocaleContext);
  const handleReset = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 100);
  };

  return (
    <Flex direction="column" alignItems="center" justifyContent="center">
      {load ? (
        <></>
      ) : (
        <NewScratchCard {...settings}>
          <Center height="300px" width="300px">
            <Heading textAlign="center" color="black">
              {number % 2 === 0 && number !== 0
                ? text.ScratchComponent.winMessage.replace(
                    "${{}}",
                    `${currencySymbol}${
                      Math.round(
                        Math.round(Math.random() * 10) * exchangeRate
                      ) | 10
                    }`
                  )
                : text.ScratchComponent.nextTime}
            </Heading>
          </Center>
        </NewScratchCard>
      )}

      <Button type="button" m={5} onClick={handleReset}>
        {text.ScratchComponent.resetButton}
      </Button>
    </Flex>
  );
};

export default ScratchComponent;
