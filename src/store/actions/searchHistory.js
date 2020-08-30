import { api } from "../../services/api";

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
      dispatch(setSearchHistory(response.data));
    } catch (err) {
      console.log(err.response.data.error);
      throw new Error(err);
    }
  };
};

export const deleteSearchQuery = (id) => {
  return async () => {
    try {
      const response = await api.delete(`/queries/${id}`);
    } catch (err) {
      console.log(err.response.data.error);
      throw new Error(err);
    }
  };
};
