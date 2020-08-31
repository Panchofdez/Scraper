import { api } from "../../services/api";
import { addToast } from "./toasts";

const setFavorites = (jobs) => {
  return {
    type: "FETCH_FAVORITES",
    jobs,
  };
};

export const fetchFavorites = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/favorites");
      dispatch(setFavorites(response.data));
    } catch (err) {
      dispatch(addToast(err.response.data));
    }
  };
};

export const saveJob = (jobData) => {
  return async (dispatch) => {
    try {
      console.log(jobData);
      const response = await api.post("/favorites", { job: jobData });
      dispatch(addToast(response.data));
    } catch (err) {
      dispatch(addToast(err.response.data));
    }
  };
};
