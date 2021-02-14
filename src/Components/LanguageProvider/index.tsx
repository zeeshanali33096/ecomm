import React, { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { Item } from "../LanguagePicker";
import { fetchData, saveData } from "../../Utils/pouch.db.functions";

interface LanguageContextProps {
  id: number;
  label: string;
  translation: string;
  setCurrentLanguage: (item: Item) => void;
}

export const LanguageContext = React.createContext<LanguageContextProps>({
  id: -1,
  label: "",
  translation: "",
  setCurrentLanguage: (item: Item) => {},
});

interface Props {
  children: React.ReactNode;
}

const LanguageProvider = (props: Props) => {
  //   const history = useHistory();
  const [currentLanguage, setCurrentLanguage] = useState<Item>({
    id: -1,
    label: "",
    translation: "",
  });

  const [loading, setLoading] = useState<boolean>(true);

  // const saveCookie = (cname: string, cvalue: string) => {
  //   let d = new Date();
  //   d.setTime(d.getTime() + 999 * 24 * 60 * 60 * 1000);
  //   const expires = "expires=" + d.toUTCString();
  //   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  // };

  // const getCookie = (cname: string) => {
  //   const name = cname + "=";
  //   const decodedCookie = decodeURIComponent(document.cookie);
  //   const ca = decodedCookie.split(";");

  //   for (var i = 0; i < ca.length; i++) {
  //     var c = ca[i];
  //     while (c.charAt(0) === " ") {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) === 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // };

  const init = async () => {
    try {
      const initData = await fetchData("language");
      setCurrentLanguage({
        id: (initData as any).id,
        translation: (initData as any).translation,
        label: (initData as any).label,
      });

      setLoading(false);
    } catch (err) {
      saveData({
        _id: "language",
        id: currentLanguage.id,
        label: currentLanguage.label,
        translation: currentLanguage.translation,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
    // const data = getCookie("languagePreference");
    // if (data !== "") {
    //   const ob = JSON.parse(data);
    //   setCurrentLanguage(ob);
    //   console.log({ ob });
    // } else {
    //   setLoading(false);
    // }
  }, []);

  useEffect(() => {
    if (currentLanguage.id !== -1) {
      console.log("Provider currentLanguage changed");
      // console.log(JSON.stringify(currentLanguage));
      saveData({
        _id: "language",
        ...currentLanguage,
      });
      // saveCookie("languagePreference", JSON.stringify(currentLanguage));
      // console.log(getCookie("languagePreference"));
      // setLoading(false);
    }
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider
      value={{ ...currentLanguage, setCurrentLanguage }}
    >
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
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
