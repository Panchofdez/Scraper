const jobs = (state = { jobs: [], counter: {}, query: {} }, action) => {
  switch (action.type) {
    case "LOAD_JOBS":
      return { jobs: action.jobs, query: action.query, counter: {} };
    case "LOAD_ANALYSIS":
      return {
        jobs: action.jobs,
        counter: action.counter,
        query: action.query,
      };
    default:
      return state;
  }
};

export default jobs;
