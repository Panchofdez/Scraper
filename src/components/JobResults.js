import React, { useEffect, useState } from "react";
import {
  ListGroup,
  Row,
  Col,
  Container,
  Badge,
  Card,
  Spinner,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import { analyseJobs } from "../store/actions/jobs";
const JobResults = ({ location }) => {
  const dispatch = useDispatch();
  const [technologies, setTechnologies] = useState([
    "HTML",
    "CSS",
    "Python",
    "Javascript",
    "Java",
    "C++",
    "C#",
    "C",
    "Go",
    "PHP",
    "React",
    "Angular",
    "Vue",
    "AWS",
    "SQL",
    "Docker",
  ]);
  const [loading, setLoading] = useState(true);
  const jobs = useSelector((state) => state.jobs.jobs);
  const counter = useSelector((state) => state.jobs.counter);
  const history = useHistory();
  console.log(location);
  const query_id = location.state.query_id;
  useEffect(() => {
    if (query_id) {
      dispatch(analyseJobs(query_id, technologies));
    }

    setLoading(false);
  }, []);

  const chartData = Object.keys(counter).map((k) => {
    return {
      name: k,
      count: counter[k],
    };
  });
  if (loading) {
    return <Spinner animation="grow" />;
  } else {
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
            <h3>Jobs - {jobs.length} results</h3>
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
  }
};

export default JobResults;
