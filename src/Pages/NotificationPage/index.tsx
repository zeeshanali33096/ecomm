import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React from "react";
import { DB } from "../../Utils/firebase";
import { AuthContext } from "../../Components/AuthProvider";
import PeriodicNotification from "../../Components/PeriodicNotification";
import { TextContext } from "../../Components/TextProvider";

const NotificationPage = () => {
  const { register, handleSubmit, errors, setError } = useForm();
  const { user } = React.useContext(AuthContext);
  const text = React.useContext(TextContext);

  const onFormSubmit = (data: any) => {
    console.log({ data });

    DB.collection("messages").doc(user?.uid).set({
      title: data.title,
      description: data.body,
      delay: data.delay,
    });
  };

  const validateTitle = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) {
      return text.NotificationPage.noTitle;
    }
    return true;
  };

  const validateBody = (body: string) => {
    const trimmed = body.trim();

    if (!trimmed) {
      return text.NotificationPage.noBody;
    } else if (trimmed.length > 100) {
      return text.NotificationPage.longBody;
    } else {
      return true;
    }
  };

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormControl isRequired isInvalid={errors.title}>
          <FormLabel htmlFor="title">{text.NotificationPage.title}</FormLabel>
          <Input
            width="100%"
            minWidth="20em"
            name="title"
            type="text"
            placeholder={text.NotificationPage.titlePlaceholder}
            ref={register({ validate: validateTitle })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={errors.body}>
          <FormLabel htmlFor="body">{text.NotificationPage.body}</FormLabel>
          <Textarea
            name="body"
            placeholder={text.NotificationPage.bodyPlaceholder}
            ref={register({ validate: validateBody })}
            size="sm"
          />
          <FormErrorMessage>
            {errors.body && errors.body.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="delay">{text.NotificationPage.delay}</FormLabel>
          <Checkbox name="delay" ref={register()} />
        </FormControl>
        <Button type="submit">{text.NotificationPage.submit}</Button>
      </form>

      <PeriodicNotification />
    </Flex>
  );
};

export default NotificationPage;
