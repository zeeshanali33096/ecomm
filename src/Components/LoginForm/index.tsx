import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";

import { useForm } from "react-hook-form";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import checkEmail from "../../Utils/checkEmail";
import { Auth } from "../../Utils/firebase";
import GoogleSignIn from "../GoogleSignIn";
import { TextContext } from "../TextProvider";

const LoginForm = () => {
  const { register, handleSubmit, errors, setError } = useForm();
  const text = React.useContext(TextContext);
  const history = useHistory();
  const location = useLocation();
  console.log({ location });

  const [show, setShow] = React.useState<boolean>(false);
  const [formSubmitting, setFormSubmitting] = React.useState<boolean>(false);

  const onSubmit = (data: any) => {
    const { email, password } = data;
    setFormSubmitting(true);
    Auth.signInWithEmailAndPassword(email.trim(), password.trim())
      .then((user) => {
        console.log({ user });
        if ((location as any).state) {
          history.replace("/cart");
        } else {
          history.replace("/home");
        }
      })
      .catch((err) => {
        if (err.code) {
          if (err.code.indexOf("not-found")) {
            setError("email", {
              type: "manual",
              message: text.LoginForm.userNotFound,
            });
          } else if (err.code.indexOf("password") > -1) {
            setError("password", {
              type: "manual",
              message: text.LoginForm.invalidPassword,
            });
          } else {
            setError("email", {
              type: "manual",
              message: err.msg,
            });
          }
        }
        console.error({ err });
      })
      .finally(() => {
        setFormSubmitting(false);
      });
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return text.LoginForm.noEmail;
    } else if (checkEmail(email.trim())) {
      return true;
    }
    return text.LoginForm.validateEmail;
  };

  const validatePassword = (password: string) => {
    if (!password.trim()) {
      return text.LoginForm.noPassword;
    } else {
      return true;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errors.email}>
        <FormLabel htmlFor="email">{text.LoginForm.emailLabel}</FormLabel>
        <Input
          width="100%"
          minWidth="20em"
          name="email"
          type="email"
          placeholder={text.LoginForm.emailPlaceholder}
          ref={register({ validate: validateEmail })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.password}>
        <FormLabel htmlFor="password">{text.LoginForm.passwordLabel}</FormLabel>
        <InputGroup size="md">
          <Input
            width="100%"
            minWidth="20em"
            name="password"
            type={
              show
                ? "text"
                : "password"
            }
            placeholder={text.LoginForm.passwordPlaceholder}
            ref={register({ validate: validatePassword })}
          />
          <InputRightElement width="4em">
            <Button
              h="100%"
              width="5em"
              size="sm"
              onClick={() => setShow(!show)}
            >
              {show
                ? text.SignUpForm.passwordButtonTextHide
                : text.SignUpForm.passwordButtonTextShow}
            </Button>
          </InputRightElement>
        </InputGroup>

        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Center padding="2em 0.5em 0.5em 0.5em">
        <Button isLoading={formSubmitting} isFullWidth type="submit">
          {text.LoginForm.loginButtonText}
        </Button>
      </Center>
      <Center>
        <NavLink to="/auth/forgot">{text.LoginForm.forgotPassword}</NavLink>
      </Center>
      <br />

      <Center p={2}>
        <Button isFullWidth onClick={() => history.push("/auth/signup")}>
          {text.LoginForm.signupButtonText}
        </Button>
      </Center>
      <GoogleSignIn />
    </form>
  );
};

export default LoginForm;
