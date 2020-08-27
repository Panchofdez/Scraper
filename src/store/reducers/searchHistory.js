const searchHistory = (state = [], action) => {
  switch (action.type) {
    case "SET_SEARCH_HISTORY":
      return [...action.payload];
    default:
      return state;
  }
};

export default searchHistory;
