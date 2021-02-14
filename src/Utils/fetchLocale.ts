import axiosClient from "./axios.client";

export const fetchIP = async () => {
  try {
    const res = await axiosClient.get("https://edns.ip-api.com/json");
    const data = res.data;
    if (data.edns) {
      return data.edns.ip;
    } else if (data.dns) {
      console.log({ ip: data.dns.ip });
      return data.dns.ip;
    } else {
      throw { message: "invalid response type", data };
    }
    // console.log({ data });
  } catch (err) {
    throw err;
  }
};

export const fetchOthers = async (ip: string) => {
  try {
    const res = await axiosClient.post("https://api.trexeego.com/post/ip", {
      ip,
    });

    const data = res.data;

    if (data.status === "success") {
      return data;
    } else {
      throw { message: "invalid response", data };
    }
  } catch (err) {
    throw err;
  }
};

export const fetchExchangeRates = async (to: string) => {
  try {
    const res = await axiosClient(
      "https://api.ratesapi.io/api/latest?base=USD&symbols=" + to
    );
    const data = res.data;
    if (data.error) {
      throw { message: "Invalid Response", data };
    } else {
      return data.rates[to];
    }
  } catch (err) {
    throw err;
  }
};
