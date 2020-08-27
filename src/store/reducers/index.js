import { combineReducers } from "redux";
import jobs from "./jobs";
import auth from "./auth";
import searchHistory from "./searchHistory";

const rootReducer = combineReducers({
  jobs,
  auth,
  searchHistory,
});

export default rootReducer;
