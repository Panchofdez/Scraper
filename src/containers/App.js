import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore from "../store";
import { Provider } from "react-redux";
import { setTokenHeader } from "../services/api";
import { setCurrentUser } from "../store/actions/auth";
import Main from "./Main";

const store = configureStore();

if (localStorage.token) {
  setTokenHeader(localStorage.token);
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(localStorage.token));
  } catch (e) {
    store.dispatch(setCurrentUser(null));
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Main />
      </Router>
    </Provider>
  );
}

export default App;
