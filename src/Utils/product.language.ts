import { Product } from "../Components/FeedProvider";

export const getProductKey = (key: string, language: string): keyof Product => {
  const l = language.toLowerCase();
  const v =
    l.indexOf("engli") > -1
      ? (key as keyof Product)
      : (`${key}_${l}` as keyof Product);
  return v;
};
