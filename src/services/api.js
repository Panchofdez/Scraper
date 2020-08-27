import axios from "axios";

const url = "http://localhost:5000";

export const api = axios.create({
  baseURL: url,
});

export const setTokenHeader = (token) => {
  if (token) {
    api.defaults.headers.common["authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["authorization"];
  }
};
