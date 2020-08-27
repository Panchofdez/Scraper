const jobs = (state = { jobs: [], counter: {} }, action) => {
  switch (action.type) {
    case "LOAD_JOBS":
      return { ...state, jobs: [...action.jobs] };
    case "LOAD_ANALYSIS":
      return { jobs: [...action.jobs], counter: action.counter };
    default:
      return state;
  }
};

export default jobs;
