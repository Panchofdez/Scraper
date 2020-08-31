import { api } from "../../services/api";
import { addToast } from "./toasts";

export const setSearchHistory = (data) => {
  return {
    type: "SET_SEARCH_HISTORY",
    payload: data,
  };
};

export const fetchSearchHistory = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/queries");
      console.log(response);
      dispatch(setSearchHistory(response.data));
    } catch (err) {
      dispatch(addToast(err.response.data));
    }
  };
};

export const deleteSearchQuery = (id) => {
  return async (dispatch) => {
    try {
      const response = await api.delete(`/queries/${id}`);
      dispatch(addToast(response.data));
    } catch (err) {
      dispatch(addToast(err.response.data));
      throw new Error(err);
    }
  };
};
