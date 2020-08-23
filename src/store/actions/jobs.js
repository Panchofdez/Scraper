import { api } from "../../services/api";

const loadJobs = (jobs) => {
  return {
    type: "LOAD_JOBS",
    payload: jobs,
  };
};

export const fetchJobs = (data) => {
  return async (dispatch) => {
    try {
      const response = await api.get("/scrape", data);
      dispatch(loadJobs(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};
