import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../store/actions/favorites";

const Favorites = () => {
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.favorites);
  useEffect(() => {
    dispatch(fetchFavorites());
  }, []);
  return (
    <Container fluid className="h-100 p-0 d-flex flex-column">
      <Row style={{ width: "100%" }}>
        <Container>
          <Col xs={12}>
            <Row>
              <Col md={4}>
                <div className="d-flex h-100 align-items-center justify-content-center">
                  <div>
                    <h2 className="my-3" style={{ letterSpacing: 0.5 }}>
                      {" "}
                      Your Saved Jobs
                    </h2>
                  </div>
                </div>
              </Col>
              <Col md={8}>
                <img
                  src={require("../images/favoritespic.jpg")}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </Col>
        </Container>
      </Row>

      <Row
        style={{ backgroundColor: "#f8f9fa", width: "100%" }}
        className="mb-0 pb-5 mx-0 flex-grow-1"
      >
        <Col xs={12}>
          <Container>
            <Row className="mt-5">
              {savedJobs.length > 0 &&
                savedJobs.map((job) => {
                  return (
                    <Col md={4} className="h-100">
                      <Card
                        className="elevated mb-3"
                        style={{ borderRadius: 10, minHeight: "180px" }}
                        href={job.link}
                      >
                        <Card.Body>
                          <Card.Title>{job.title}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {job.company}
                          </Card.Subtitle>
                          <Card.Text className="mb-1">{job.rating}</Card.Text>
                          <Card.Text>{job.salary}</Card.Text>
                          <Card.Link
                            href={job.link}
                            className="stretched-link"
                            target="_blank"
                          >
                            View Job Posting
                          </Card.Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Favorites;
