import { Flex, FormControl, FormLabel, Select, Button } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { TextContext } from "../TextProvider";

interface Props {
  handleAddToCart: (quantity: number) => void;
}

const QuantityForm = ({ handleAddToCart }: Props) => {
  const { register, handleSubmit } = useForm();
  const text = React.useContext(TextContext);

  const onSubmit = (data: any) => {
    // console.log({ data });
    const { quantity } = data;
    handleAddToCart(parseInt(quantity));
  };
  return (
    <form
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        justifyItems: "center",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex direction="column" alignItems="center" justifyContent="center">
        <FormLabel textAlign="center" m={0} p={0} htmlFor="quantity">
          {text.QuantityForm.selectLabel}
        </FormLabel>
        <FormControl isRequired>
          <Select name="quantity" ref={register()}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </Select>
        </FormControl>
      </Flex>
      <Button type="submit">{text.QuantityForm.buttonText}</Button>
    </form>
  );
};

export default QuantityForm;
