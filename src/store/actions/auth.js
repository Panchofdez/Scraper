import { api, setTokenHeader } from "../../services/api";
import { addToast } from "./toasts";
export const setCurrentUser = (token) => {
  return {
    type: "SET_CURRENT_USER",
    token,
  };
};

export const authenticateUser = (type, data) => {
  return async (dispatch) => {
    try {
      console.log(type);
      const response = await api.post(`/${type}`, data);
      const { token } = response.data;
      console.log(token);
      localStorage.setItem("token", token);
      setTokenHeader(token);
      dispatch(setCurrentUser(token));
    } catch (err) {
      console.log(err);
      dispatch(addToast(err.response.data));
      throw new Error(err);
    }
  };
};

export const signout = () => {
  return (dispatch) => {
    try {
      localStorage.clear();
      setTokenHeader(false);
      dispatch(setCurrentUser({}));
    } catch (err) {
      dispatch(addToast(err.response.data));
    }
  };
};
