import React from "react";
import Header from "../components/Navbar";
import Home from "./Home";
import JobResults from "../components/JobResults";
import SearchHistory from "./SearchHistory";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore from "../store";
import { Provider } from "react-redux";
import AuthForm from "./AuthForm";
import { setTokenHeader } from "../services/api";
import { setCurrentUser } from "../store/actions/auth";

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
        <Header />
        <Switch>
          <Route
            exact
            path="/jobs"
            render={(props) => <JobResults {...props} />}
          />
          <Route
            exact
            path="/history"
            render={(props) => <SearchHistory {...props} />}
          />
          <Route
            exact
            path="/signup"
            render={(props) => (
              <AuthForm type="signup" btnMessage="Sign Up" {...props} />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <AuthForm type="login" btnMessage="Login" {...props} />
            )}
          />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
