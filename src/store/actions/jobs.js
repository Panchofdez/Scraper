import { api } from "../../services/api";

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

export const baseTechnologies = [
  "HTML",
  "CSS",
  "Python",
  "Javascript",
  "Java",
  "C++",
  "C#",
  "C",
  "Go",
  "PHP",
  "React",
  "Angular",
  "Vue",
  "AWS",
  "SQL",
  "Docker",
];

export const scrapeJobs = (data) => {
  return async (dispatch) => {
    try {
      const formData = {
        ...data,
        technologies: baseTechnologies,
      };
      const response = await api.post("/scrape", formData);
      const { jobs, counter, query } = response.data;
      dispatch(loadAnalysis(jobs, counter, query));
      return query;
    } catch (err) {
      console.log(err);
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
      const { jobs, query } = response.data;
      dispatch(loadJobs(jobs, query));
    } catch (err) {
      console.log(err.response.data.error);
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
      console.log(err.response.data.error);
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
      console.log(err.response.data.error);
      throw new Error(err);
    }
  };
};
