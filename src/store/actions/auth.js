import { api, setTokenHeader } from "../../services/api";

export const setCurrentUser = (token) => {
  return {
    type: "SET_CURRENT_USER",
    token,
  };
};

export const authenticateUser = (type, data) => {
  return async (dispatch) => {
    try {
      const response = await api.post(`/${type}`, data);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setTokenHeader(token);
      console.log(token);
      dispatch(setCurrentUser(token));
    } catch (err) {
      console.log(err.response.data.error);
      throw new Error(err);
    }
  };
};

export const signout = () => {
  return (dispatch) => {
    console.log("arrived");
    localStorage.clear();
    setTokenHeader(false);
    dispatch(setCurrentUser({}));
  };
};
