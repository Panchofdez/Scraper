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
    <Container>
      <Row>
        <Col md={6} className="mt-5">
          <h4>Your Saved Jobs</h4>
          {savedJobs.length > 0 &&
            savedJobs.map((job) => {
              return (
                <Card
                  className="elevated mb-3"
                  style={{ borderRadius: 10 }}
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
              );
            })}
        </Col>
      </Row>
    </Container>
  );
};

export default Favorites;
