import React, { useState } from "react";
import {
  Card,
  InputGroup,
  ButtonToolbar,
  Button,
  ListGroup,
  FormControl,
  Badge,
  Row,
  Col,
  Form,
} from "react-bootstrap";

const JobResultsList = ({ filteredJobs, setSearch, saveJobs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Card style={{ borderRadius: 20 }} className="elevated">
      <div className="d-flex justify-content-between p-3">
        <h6>{filteredJobs.length} job results</h6>
        <ButtonToolbar className="mb-3">
          <InputGroup>
            <FormControl
              type="text"
              style={{ width: "500px" }}
              className="elevated"
              placeholder="Search by job title, company name or preferred technologies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  if (searchTerm === "") {
                    return;
                  }
                  setSearch(searchTerm);
                }}
              >
                Search
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setSearch("");
                  setSearchTerm("");
                }}
              >
                Reset
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </ButtonToolbar>
      </div>

      <ListGroup>
        {filteredJobs.map((job, index) => (
          <ListGroup.Item key={index} action href={job.link} target="_blank">
            <Row>
              <Col md={5}>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{job.title}</h5>
                </div>
                <h6 className="mb-1">{job.company}</h6>
                <div className="d-flex h-100">
                  {job.salary && <span className="mr-5">{job.salary}</span>}
                  {job.rating && (
                    <span>{job.rating ? job.rating + " stars" : ""}</span>
                  )}
                </div>
              </Col>
              <Col md={5}>
                <div>
                  {job.technologies &&
                    Object.keys(job.technologies).map((t, idx) => (
                      <Badge
                        key={idx}
                        style={{
                          backgroundColor: "#97c9c8",
                          color: "white",
                        }}
                        className="mx-1"
                      >
                        {t}
                      </Badge>
                    ))}
                </div>
              </Col>
              <Col md={2}>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveJobs(job);
                  }}
                >
                  <Button
                    className="btn btn-sm float-right"
                    variant="outline-secondary"
                    type="submit"
                  >
                    Save Job
                  </Button>
                </Form>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default JobResultsList;
