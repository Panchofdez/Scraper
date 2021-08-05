import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteFavorite, fetchFavorites } from "../store/actions/favorites";
import SearchHistory from "./SearchHistory";

const Profile = (props) => {
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.favorites);
  useEffect(() => {
    dispatch(fetchFavorites());
  }, []);
  return (
    <Container fluid className="p-0">
      <Row style={{ width: "100%" }}>
        <Container>
          <Col xs={12}>
            <Row>
              <Col md={3}>
                <div className="d-flex h-100 align-items-center justify-content-center">
                  <div>
                    <h1 className="my-3" style={{ letterSpacing: 0.5 }}>
                      Your Profile
                    </h1>
                  </div>
                </div>
              </Col>
              <Col md={9}>
                <img src={require("../images/favoritespic.jpg")} style={{ width: "100%" }} />
              </Col>
            </Row>
          </Col>
        </Container>
      </Row>

      <Row style={{ backgroundColor: "#f8f9fa", width: "100%" }} className="mb-0 mx-0 flex-grow-1">
        <Col xs={12}>
          <Container className="mt-5">
            <h2 className="my-3">Your Saved Jobs</h2>
            <Row className="mt-5">
              {savedJobs.length > 0 &&
                savedJobs.map((job) => {
                  return (
                    <Col md={4} className="h-100">
                      <Card className="elevated mb-3" style={{ borderRadius: 10, minHeight: "180px" }} href={job.link}>
                        <Card.Body>
                          <Card.Title>{job.title}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                          <Card.Text className="mb-1">{job.rating}</Card.Text>
                          <Card.Text>{job.salary}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Card.Link className="btn btn-outline-info" href={job.link} target="_blank">
                            View Job Posting
                          </Card.Link>
                          <Card.Link
                            className="btn btn-outline-danger"
                            onClick={async () => {
                              try {
                                await dispatch(deleteFavorite(job.id));
                                window.location.reload();
                              } catch (err) {
                                return;
                              }
                            }}
                          >
                            Remove
                          </Card.Link>
                        </Card.Footer>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </Container>
        </Col>
      </Row>

      <Row
        style={{
          justifyContent: "center",
          width: "100%",
          backgroundColor: "#f8f9fa",
        }}
        className="py-5 mx-0 flex-grow-1"
      >
        <Container>
          <h2 className="my-5 ml-5 ml-md-0" style={{ letterSpacing: 0.5 }}>
            Search History
          </h2>

          <SearchHistory {...props} />
        </Container>
      </Row>
    </Container>
  );
};

export default Profile;
