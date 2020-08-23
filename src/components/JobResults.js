import React from "react";
import { ListGroup, Row, Col, Container, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const JobResults = () => {
  const jobs = useSelector((state) => state.jobs);
  if (!jobs) {
    return <Spinner animation="grow" />;
  }
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <ListGroup>
            {jobs.map((job, index) => (
              <ListGroup.Item
                key={index}
                action
                href={job.link}
                target="_blank"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{job.title}</h5>
                </div>
                <h6 className="mb-1">
                  {job.company}
                  <small>{job.rating ? job.rating + " stars" : ""} </small>
                </h6>
                <small>{job.salary}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  );
};

export default JobResults;
