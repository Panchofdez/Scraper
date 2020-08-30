const auth = (state = { token: "" }, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        token: action.token,
      };
    default:
      return state;
  }
};

export default auth;
