import axios from "axios";

export const setupAuthHeaderForServiceCalls = (token: string) => {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = "Bearer " + token);
  }
  delete axios.defaults.headers.common["Authorization"];
};

export const APP_URL = "https://socialink-api.herokuapp.com/";
