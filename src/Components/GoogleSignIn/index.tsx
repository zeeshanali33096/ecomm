import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  CloseButton,
} from "@chakra-ui/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../../Utils/firebase";
import { TextContext } from "../TextProvider";

const GoogleSignIn = () => {
  const [formSubmitting, setFormSubmitting] = React.useState<boolean>(false);
  const [signInError, setSignInError] = React.useState({
    code: "",
    message: "",
  });
  const [showError, setShowError] = React.useState<boolean>(false);

  const text = React.useContext(TextContext);

  const handleGoogleSignIn = async () => {
    setFormSubmitting(true);
    try {
      const result = await signInWithGoogle();
      console.log({ result });
    } catch (err) {
      setShowError(true);
      setSignInError({
        code: err.code,
        message: err.message,
      });
      console.error({ err });
    } finally {
      setFormSubmitting(false);
    }
  };

  React.useEffect(() => {
    let timeOut: null | NodeJS.Timeout = null;
    if (showError) {
      timeOut = setTimeout(() => {
        setShowError(false);
        setSignInError({
          code: "",
          message: "",
        });
      }, 2000);
    }
    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, [showError]);
  return (
    <>
      <Center p={2}>
        <Button
          onClick={handleGoogleSignIn}
          isFullWidth
          isLoading={formSubmitting}
          leftIcon={<FcGoogle />}
          type="button"
        >
          {text.LoginForm.googleSignIn}
        </Button>
      </Center>
      {showError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>{signInError.code}</AlertTitle>
          <AlertDescription>{signInError.message}</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}
    </>
  );
};

export default GoogleSignIn;
