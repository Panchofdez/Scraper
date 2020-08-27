import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchHistory } from "../store/actions/searchHistory";
import { fetchJobs } from "../store/actions/jobs";

const SearchHistory = ({ history }) => {
  const dispatch = useDispatch();
  const searchHistory = useSelector((state) => state.searchHistory);
  useEffect(() => {
    dispatch(fetchSearchHistory());
  }, []);
  return (
    <Container>
      <Row>
        {searchHistory.map((query) => (
          <Col md={4}>
            <Card
              style={{ width: "100%" }}
              onClick={async () => {
                try {
                  console.log(query.id);
                  await dispatch(fetchJobs(query.id));
                  history.push({
                    pathname: "/jobs",
                    state: { query_id: query.id },
                  });
                } catch (err) {
                  return;
                }
              }}
            >
              <Card.Body>
                <Card.Title>
                  {query.job_type} - {query.site}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {query.date}
                </Card.Subtitle>
                <Card.Text>
                  {query.city}, {query.province}, {query.country}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchHistory;
