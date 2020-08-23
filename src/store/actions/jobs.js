import { api } from "../../services/api";

const loadJobs = (data) => {
  return {
    type: "LOAD_JOBS",
    jobs: data.jobs,
    count: data.counter,
  };
};

export const fetchJobs = (data) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/scrape", data);
      dispatch(loadJobs(response.data));
    } catch (err) {
      console.log(err);
      throw Error(err);
    }
  };
};
