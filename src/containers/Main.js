import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toast } from "react-bootstrap";
import Header from "../components/Header";
import Home from "./Home";
import JobResults from "./JobResults";
import Profile from "./Profile";
import AuthForm from "./AuthForm";

const Main = () => {
  const toast = useSelector((state) => state.toasts);
  const [show, setShow] = useState(false);
  const [toastPosition, setToastPosition] = useState(0);
  useEffect(() => {
    console.log(toast);
    if (toast && Object.keys(toast).length > 0) {
      setShow(true);
      console.log(window.pageYOffset);
      setToastPosition(window.pageYOffset + 20);
    }
  }, [toast]);
  return (
    <>
      <Header />
      {toast && Object.keys(toast).length > 0 && (
        <Toast
          style={{
            position: "fixed",
            zIndex: 5,
            right: 20,
            width: "400px",
          }}
          onClose={() => setShow(false)}
          show={show}
          delay={6000}
          autohide
        >
          <Toast.Header>
            {toast.type === "Error" ? (
              <strong className="mr-auto" style={{ color: "red" }}>
                Error
              </strong>
            ) : (
              <strong className="mr-auto" style={{ color: "green" }}>
                Success
              </strong>
            )}
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      )}

      <Switch>
        <Route exact path="/jobs" render={(props) => <JobResults {...props} />} />
        <Route exact path="/profile" render={(props) => <Profile {...props} />} />
        <Route
          exact
          path="/signup"
          render={(props) => (
            <AuthForm type="signup" btnMessage="Sign Up" headerMessage="Create An Account" {...props} />
          )}
        />
        <Route
          exact
          path="/login"
          render={(props) => <AuthForm type="login" btnMessage="Login" headerMessage="Welcome Back!" {...props} />}
        />
        <Route path="/" render={(props) => <Home {...props} />} />
      </Switch>
    </>
  );
};

export default Main;
