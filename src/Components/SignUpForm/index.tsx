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
import { useHistory, useLocation } from "react-router-dom";
import checkEmail from "../../Utils/checkEmail";
import { Auth } from "../../Utils/firebase";
import GoogleSignIn from "../GoogleSignIn";
import { TextContext } from "../TextProvider";

const SignUpForm = () => {
  const { register, handleSubmit, setError, errors } = useForm();
  const history = useHistory();
  const location = useLocation();

  const text = React.useContext(TextContext);
  const [show, setShow] = React.useState<boolean>(false);
  const [formSubmitting, setFormSubmitting] = React.useState<boolean>(false);

  const onSubmit = (data: any) => {
    console.log({ data });
    const { email, name, password } = data;

    setFormSubmitting(true);

    Auth.createUserWithEmailAndPassword(email.trim(), password.trim())
      .then((user) => {
        if (user.user?.displayName === null) {
          Auth.currentUser?.updateProfile({ displayName: name }).then(() => {
            console.log("profile updated");
            if ((location as any).state) {
              history.replace("/cart");
            } else {
              history.replace("/home");
            }
          });
        } else {
          console.log({ displayName: Auth.currentUser?.displayName });
          if ((location as any).state) {
            history.replace("/cart");
          } else {
            history.replace("/home");
          }
        }
        console.log({ user });
      })
      .catch((err) => {
        if (err.code) {
          if (err.code.indexOf("email") > -1) {
            setError("email", {
              type: "manual",
              message: err.message,
            });
          } else if (err.code.indexOf("password") > -1) {
            setError("password", {
              type: "manual",
              message: err.message,
            });
          } else {
            setError("email", {
              type: "manual",
              message: err.message,
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
      return text.SignUpForm.noEmail;
    } else if (checkEmail(email.trim())) {
      return true;
    }
    return text.SignUpForm.validateEmail;
  };

  const validatePassword = (password: string) => {
    if (!password.trim()) {
      return text.SignUpForm.noPassword;
    } else if (password.trim().length < 7) {
      return text.SignUpForm.validatePassword;
    }
    return true;
  };

  const validateName = (name: string) => {
    if (!name.trim()) {
      return text.SignUpForm.noName;
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired isInvalid={errors.name}>
        <FormLabel htmlFor="name">{text.SignUpForm.nameLabel}</FormLabel>
        <Input
          width="100%"
          minWidth="20em"
          name="name"
          type="text"
          placeholder={text.SignUpForm.namePlaceholder}
          ref={register({ validate: validateName })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.email}>
        <FormLabel htmlFor="email">{text.SignUpForm.emailLabel}</FormLabel>
        <Input
          width="100%"
          minWidth="20em"
          name="email"
          type="email"
          placeholder={text.SignUpForm.emailPlaceholder}
          ref={register({ validate: validateEmail })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={errors.password}>
        <FormLabel htmlFor="password">
          {text.SignUpForm.passwordLabel}
        </FormLabel>
        <InputGroup size="md">
          <Input
            width="100%"
            minWidth="20em"
            name="password"
            type={show ? "text" : "password"}
            placeholder={text.SignUpForm.passwordPlaceholder}
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
          {text.SignUpForm.signupButtonText}
        </Button>
      </Center>
      <br />

      <Center p={2}>
        <Button isFullWidth onClick={() => history.push("/auth")}>
          {text.SignUpForm.loginButtonText}
        </Button>
      </Center>
      <GoogleSignIn />
    </form>
  );
};

export default SignUpForm;
