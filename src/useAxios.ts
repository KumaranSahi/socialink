import axios from "axios";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "https://socialink-api.herokuapp.com/",
  headers: {
    Authorization: "Bearer " + token,
  },
});

export default instance;
