const jobs = (state = { jobs: [], count: {} }, action) => {
  switch (action.type) {
    case "LOAD_JOBS":
      return { jobs: [...action.jobs], count: action.count };
    default:
      return state;
  }
};

export default jobs;
