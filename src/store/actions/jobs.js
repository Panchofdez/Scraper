import { api } from "../../services/api";

const loadJobs = (jobs) => {
  return {
    type: "LOAD_JOBS",
    jobs,
  };
};

const loadAnalysis = (jobs, counter) => {
  return {
    type: "LOAD_ANALYSIS",
    jobs,
    counter,
  };
};

export const scrapeJobs = (data) => {
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

export const fetchJobs = (query_id) => {
  return async (dispatch) => {
    try {
      console.log(query_id);
      const response = await api.get(`/queries/${query_id}`);
      console.log(response);
      dispatch(loadJobs(response.data));
    } catch (err) {
      console.log(err.response.data.error);
      throw new Error(err);
    }
  };
};

export const analyseJobs = (query_id, technologies) => {
  return async (dispatch) => {
    try {
      const response = await api.post(`/analyse/${query_id}`, { technologies });
      console.log(response.data);
      const { jobs, counter } = response.data;
      dispatch(loadAnalysis(jobs, counter));
    } catch (err) {
      console.log(err.response.data.error);
      throw new Error(err);
    }
  };
};
