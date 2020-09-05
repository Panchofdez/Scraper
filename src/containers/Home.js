import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "./SearchForm";
import SearchHistory from "./SearchHistory";
import { Row, Col, Container } from "react-bootstrap";
import { fetchSearchHistory } from "../store/actions/searchHistory";
import { fetchJobs } from "../store/actions/jobs";
import headerImage from "../images/jobs-home.jpg";

const Home = (props) => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.token);
  const searchHistory = useSelector((state) => state.searchHistory);
  useEffect(() => {
    console.log("HOME");
    if (userToken) {
      dispatch(fetchSearchHistory());
    }
  }, []);
  return (
    <Container fluid className="h-100 p-0 d-flex flex-column">
      <Container className="mb-5">
        <Row
          className="mx-2  mb-3"
          style={{
            justifyContent: "center",
            marginTop: "50px",
            width: "100%",
          }}
        >
          <Col xs={12} md={6}>
            <img
              src={require("../images/jobs-home.jpg")}
              style={{ width: "100%" }}
            ></img>
          </Col>
          <Col xs={12} md={6} className="align-items-center">
            <h4 style={{ lineHeight: 1.5, letterSpacing: 0.5 }}>
              Find jobs that match your preferred stack of technologies and know
              which technologies are in demand
            </h4>
            <div className="mt-3">
              <SearchForm props={props} />
            </div>
          </Col>
        </Row>
      </Container>

      {userToken && (
        <Row
          style={{
            justifyContent: "center",
            width: "100%",
            backgroundColor: "#f8f9fa",
          }}
          className="py-5 mx-0 flex-grow-1"
        >
          <Container>
            {searchHistory.length > 0 && (
              <h3 className="my-3 ml-5 ml-md-0" style={{ letterSpacing: 0.5 }}>
                Search History
              </h3>
            )}
            <SearchHistory
              searchHistory={searchHistory}
              fetchJobs={fetchJobs}
              {...props}
            />
          </Container>
        </Row>
      )}
    </Container>
  );
};

export default Home;
