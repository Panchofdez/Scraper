import { api } from "../../services/api";
import { addToast } from "./toasts";

const loadJobs = (jobs, query) => {
  return {
    type: "LOAD_JOBS",
    jobs,
    query,
  };
};

const loadAnalysis = (jobs, counter, query) => {
  return {
    type: "LOAD_ANALYSIS",
    jobs,
    counter,
    query,
  };
};

export const baseTechnologies = ["HTML", "CSS", "Python", "Javascript", "Java", "C++", "C#", "C", "PHP", "AWS", "SQL"];

export const scrapeJobs = (data) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/scrape", data);
      const { jobs, counter, query } = response.data;
      dispatch(loadAnalysis(jobs, counter, query));
      return query;
    } catch (err) {
      dispatch(addToast(err.response.data));
      throw Error(err);
    }
  };
};

export const fetchJobs = (id) => {
  return async (dispatch) => {
    try {
      console.log("fetched");
      const response = await api.get(`/queries/${id}`);
      console.log(response);
      const { jobs, query, counter } = response.data;
      dispatch(loadAnalysis(jobs, counter, query));
    } catch (err) {
      dispatch(addToast(err.response.data));
      throw new Error(err);
    }
  };
};

export const analyseJobs = (id, technologies) => {
  return async (dispatch) => {
    try {
      console.log(id);
      const response = await api.post(`/analyse/${id}`, { technologies });
      console.log(response.data);
      const { counter, jobs, query } = response.data;
      dispatch(loadAnalysis(jobs, counter, query));
    } catch (err) {
      dispatch(addToast(err.response.data));
      throw new Error(err);
    }
  };
};

export const updateSearchQuery = (id, technologies) => {
  return async (dispatch) => {
    try {
      const response = await api.put(`/queries/${id}`, { technologies });
      const { counter, jobs, query } = response.data;
      dispatch(loadAnalysis(jobs, counter, query));
      return query;
    } catch (err) {
      dispatch(addToast(err.response.data));
      throw new Error(err);
    }
  };
};
