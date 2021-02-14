import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import checkEmail from "../../Utils/checkEmail";
import { Auth } from "../../Utils/firebase";
import GoogleSignIn from "../GoogleSignIn";

const ForgotPasswordForm = () => {
  const { register, handleSubmit, errors, setError } = useForm();
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = React.useState(
    false
  );

  const [formSubmitting, setFormSubmitting] = React.useState<boolean>(false);
  const history = useHistory();

  const onSubmit = (data: any) => {
    setFormSubmitting(true);
    setIsSuccessfullySubmitted(false);

    Auth.sendPasswordResetEmail(data.email)
      .then(() => {
        setIsSuccessfullySubmitted(true);
        console.log("password reset sent");
      })
      .catch((err) => {
        if (err.code) {
          if (err.code.indexOf("not-found") > -1) {
            setError("email", {
              type: "manual",
              message: "User Not Found!",
            });
          } else {
            setError("email", {
              type: "manual",
              message: err.message,
            });
          }
        }
      })
      .finally(() => {
        setFormSubmitting(false);
      });
    console.log({ data });
  };

  const validateEmail = (email: string) => {
    setIsSuccessfullySubmitted(false);
    if (!email.trim()) {
      return "Email is required!";
    } else if (checkEmail(email.trim())) {
      return true;
    }
    return "Please enter a valid Email!";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          width="100%"
          minWidth="20em"
          name="email"
          type="email"
          placeholder="Enter Email"
          ref={register({ validate: validateEmail })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>

        <Heading as="h2" p={2} size="xs">
          {isSuccessfullySubmitted &&
            "Password reset link has been sent to your mail."}
        </Heading>
      </FormControl>

      <Center padding="2em 0.5em 0.5em 0.5em">
        <Button isLoading={formSubmitting} isFullWidth type="submit">
          Reset Password
        </Button>
      </Center>
      <br />

      <Center p={2}>
        <Button isFullWidth onClick={() => history.push("/auth")}>
          Login
        </Button>
      </Center>
      <Center p={2}>
        <Button isFullWidth onClick={() => history.push("/auth/signup")}>
          SignUp
        </Button>
      </Center>
      <GoogleSignIn />
    </form>
  );
};

export default ForgotPasswordForm;
