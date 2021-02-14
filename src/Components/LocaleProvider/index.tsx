import { Center, Spinner } from "@chakra-ui/react";
import React from "react";
import getSymbolFromCurrency from "currency-symbol-map";

import {
  fetchExchangeRates,
  fetchIP,
  fetchOthers,
} from "../../Utils/fetchLocale";
import { fetchData, saveData } from "../../Utils/pouch.db.functions";

interface LocaleStateModel {
  currency: string;
  currencySymbol: string;
  country: string;
  exchangeRate: number;
}

const initialState: LocaleStateModel = {
  currency: "",
  currencySymbol: "",
  country: "",
  exchangeRate: 1,
};

interface Props {
  children: React.ReactNode;
}

export const LocaleContext = React.createContext(initialState);

const LocaleProvider = ({ children }: Props) => {
  const [LocaleState, setLocaleState] = React.useState<LocaleStateModel>(
    initialState
  );

  const [Loading, setLoading] = React.useState<boolean>(true);

  const fetchLocale = async () => {
    try {
      const ip = await fetchIP();
      const others = await fetchOthers(ip);
      const exchangeRate = await fetchExchangeRates(others.currency);
      //   console.log({ others });

      const symbol = getSymbolFromCurrency(others.currency);

      setLocaleState({
        currencySymbol: symbol!,
        currency: others.currency,
        country: others.country,
        exchangeRate: exchangeRate,
      });

      saveData({
        _id: "locale",
        currencySymbol: symbol!,
        currency: others.currency,
        country: others.country,
        exchangeRate: exchangeRate,
      });

      setLoading(false);
    } catch (err) {
      console.log({ err });
      setLocaleState({
        currencySymbol: "$",
        currency: "USD",
        country: "USA",
        exchangeRate: 1,
      });
      saveData({
        _id: "locale",
        currencySymbol: "$",
        currency: "USD",
        country: "USA",
        exchangeRate: 1,
      });
      setLoading(false);
    }
  };

  const init = async () => {
    try {
      const initialS = await fetchData("locale");
      setLocaleState({
        country: ((initialS as unknown) as LocaleStateModel).country,
        currency: ((initialS as unknown) as LocaleStateModel).currency,
        currencySymbol: ((initialS as unknown) as LocaleStateModel)
          .currencySymbol,
        exchangeRate: ((initialS as unknown) as LocaleStateModel).exchangeRate,
      });

      setLoading(false);
    } catch (err) {
      fetchLocale();
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <LocaleContext.Provider value={LocaleState}>
      {Loading ? (
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
        children
      )}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;
