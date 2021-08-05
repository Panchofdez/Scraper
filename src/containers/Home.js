import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "./SearchForm";

import { Row, Col, Container, Button } from "react-bootstrap";

const Home = (props) => {
  const userToken = useSelector((state) => state.auth.token);

  return (
    <Container fluid className="h-100 p-0 d-flex flex-column ">
      <Container>
        <Row
          className="m-0 p-0"
          style={{
            width: "100%",
            backgroundColor: "#fff",
          }}
        >
          <Col xs={12} md={5} className="d-flex pt-5 mt-5">
            <div style={{ display: "flex ", flexDirection: "column" }}>
              <h1 style={{ letterSpacing: 0.5, fontWeight: "bold" }}>Know which technologies are in demand</h1>
              <h4 style={{ lineHeight: 1.5, letterSpacing: 0.5 }}>
                Find jobs that match your preferred stack of technologies
              </h4>
              <Button
                className="my-1 button"
                style={{ backgroundColor: "#97c9c8", borderColor: "#97c9c8" }}
                href="#searchform"
              >
                Find Jobs
              </Button>
              {!userToken && (
                <Button variant="info" className="my-1 button" href="/signup">
                  Sign Up
                </Button>
              )}
            </div>
          </Col>
          <Col xs={12} md={7}>
            <img src={require("../images/jobs-home.jpg")} style={{ width: "100%" }}></img>
          </Col>
        </Row>
      </Container>

      <Container fluid className="m-0 p-0">
        <Container fluid className="m-0 p-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
            <path
              fill="#212121"
              fill-opacity="1"
              d="M0,0L120,26.7C240,53,480,107,720,122.7C960,139,1200,117,1320,106.7L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
            ></path>
          </svg>
        </Container>

        <Container fluid className="py-5" style={{ background: "#212121" }}>
          <Container>
            <Row>
              <Col xs={0} md={2}></Col>
              <Col xs={12} md={8}>
                <div id="searchform" className=" mb-5" style={{ color: "#fff" }}>
                  <SearchForm props={props} />
                </div>
              </Col>
              <Col xs={0} md={2}></Col>
            </Row>
          </Container>
        </Container>
        <Container fluid className="p-0 m-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
            <path
              fill="#212121"
              fill-opacity="1"
              d="M0,96L120,85.3C240,75,480,53,720,74.7C960,96,1200,160,1320,192L1440,224L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
            ></path>
          </svg>
        </Container>
      </Container>

      <Container>
        <Row className="mb-5">
          <Col xs={12} md={6} className="mb-5">
            <div className="card image-card">
              <img src={require("../images/results.png")} className="card-img-top" style={{ height: "375px" }} />
              <div className="card-body">
                <h5 class="card-title">Analyze job posts</h5>
                <p className="card-text">
                  Analyze the technologies that are being asked for the most in job descriptions and find jobs that
                  match your tech stack
                </p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} className="mb-5">
            <div className="card image-card">
              <img src={require("../images/profile2.png")} className="card-img-top" />
              <div className="card-body">
                <h5 class="card-title">Create your own profile </h5>
                <p className="card-text">
                  Save your favorite jobs and keep track of previous search results to access the analysis quickly
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
