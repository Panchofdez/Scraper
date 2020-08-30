import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "./SearchForm";
import SearchHistory from "./SearchHistory";
import { Row, Col } from "react-bootstrap";
import { fetchSearchHistory } from "../store/actions/searchHistory";
import { fetchJobs } from "../store/actions/jobs";

const Home = (props) => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.token);
  const searchHistory = useSelector((state) => state.searchHistory);
  useEffect(() => {
    if (userToken) {
      dispatch(fetchSearchHistory());
    }
  }, []);
  return (
    <>
      <Row
        style={{
          justifyContent: "center",
          marginTop: "50px",
          width: "100%",
          marginRight: 0,
          marginLeft: 0,
        }}
      >
        <Col xs={12} md={6} className="mb-5">
          <SearchForm props={props} />
        </Col>
      </Row>
      {userToken && (
        <Row style={{ justifyContent: "center", width: "100%" }}>
          <Col xs={12} md={8}>
            <SearchHistory
              searchHistory={searchHistory}
              fetchJobs={fetchJobs}
              {...props}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default Home;
