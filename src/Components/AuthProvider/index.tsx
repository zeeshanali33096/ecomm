import React, { useEffect, useState } from "react";
import { Auth, DB, initMessaging, Messaging } from "../../Utils/firebase";
import firebase from "firebase";
import { Center, Spinner, useToast } from "@chakra-ui/react";
import { LanguageContext } from "../LanguageProvider";

interface AuthContextProps {
  fcmToken: string;
  user: firebase.User | null;
}

const initialState: AuthContextProps = {
  fcmToken: "",
  user: null,
};

export const AuthContext = React.createContext(initialState);

const AuthProvider = (props: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<null | firebase.User>(null);
  const [fcmToken, setFcmToken] = useState<string>("");
  const { label } = React.useContext(LanguageContext);
  const [loading, setLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    const code =
      label.toLowerCase().indexOf("spa") > -1
        ? "es"
        : label.toLowerCase().substring(0, 2);
    Auth.languageCode = code;
    console.log({ Auth });
  }, [label]);

  useEffect(() => {
    const listenerStop = Auth.onAuthStateChanged((user) => {
      console.log({ user });
      if (user) {
        initMessaging()
          .then((token) => {
            if (token) {
              setFcmToken(token);
            }
            DB.collection("users").doc(user?.uid).set({ token });
            // console.log({ token });
          })
          .catch((err) => {
            console.log({ err });
          });
      }
      setCurrentUser(user);
      setLoading(false);
    });

    Messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      toast({
        position: "top-right",
        duration: 3000,
        title: payload.notification?.title,
        description: payload.notification?.body,
        isClosable: true,
      });
      // ...
    });
    return () => {
      listenerStop();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ user: currentUser, fcmToken }}>
      {loading ? (
        <Center height="100vh">
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.900"
            color="white"
            size="xl"
          />
        </Center>
      ) : (
        props.children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
