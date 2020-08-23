import React from "react";
import { ListGroup, Row, Col, Container, Badge, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const JobResults = () => {
  const jobs = useSelector((state) => state.jobs);
  const history = useHistory();
  if (jobs.jobs.length === 0) {
    history.push("/");
  }
  const chartData = Object.keys(jobs.count).map((k) => {
    return {
      name: k,
      count: jobs.count[k],
    };
  });

  console.log(chartData);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Card body>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#97c9c8" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col md={8} className="my-3">
          <h3>Jobs - {jobs.jobs.length} results</h3>
          <ListGroup>
            {jobs.jobs.map((job, index) => (
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
                  {job.company}{" "}
                  <small>{job.rating ? job.rating + " stars" : ""} </small>
                </h6>
                <small>{job.salary}</small>
                <div>
                  {job.technologies &&
                    Object.keys(job.technologies).map((t, idx) => (
                      <Badge key={idx} variant="secondary" className="mx-1">
                        {t}
                      </Badge>
                    ))}
                </div>
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
