import { combineReducers } from "redux";
import jobs from "./jobs";
import auth from "./auth";
import searchHistory from "./searchHistory";
import favorites from "./favorites";
import toasts from "./toasts";

const rootReducer = combineReducers({
  jobs,
  auth,
  searchHistory,
  favorites,
  toasts,
});

export default rootReducer;
