import React from "react";
import { LanguageContext } from "../LanguageProvider";
import english from "./english";
import french from "./french";
import spanish from "./spanish";
import hindi from "./hindi";

const initialState = english;

export const TextContext = React.createContext(initialState);
interface Props {
  children: React.ReactNode;
}

const TextProvider = ({ children }: Props) => {
  const [Text, setText] = React.useState(english);
  const { label } = React.useContext(LanguageContext);

  React.useEffect(() => {
    const lang = label.toLowerCase();
    switch (lang) {
      case "english":
        setText(english);
        break;
      case "french":
        setText(french);
        break;
      case "spanish":
        setText(spanish);
        break;
      case "hindi":
        setText(hindi);
        break;
      default:
        setText(english);
    }
  }, [label]);

  return <TextContext.Provider value={Text}>{children}</TextContext.Provider>;
};

export default TextProvider;
