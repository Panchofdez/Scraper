import React from "react";
import SearchForm from "./SearchForm";
import { Row, Col } from "react-bootstrap";

const Home = ({ props }) => {
  return (
    <Row style={{ justifyContent: "center", marginTop: "50px", width: "100%" }}>
      <Col md={6}>
        <SearchForm props={props} />
      </Col>
    </Row>
  );
};

export default Home;
