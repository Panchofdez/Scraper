const favorites = (state = [], action) => {
  switch (action.type) {
    case "FETCH_FAVORITES":
      return [...action.jobs];
    default:
      return state;
  }
};

export default favorites;
