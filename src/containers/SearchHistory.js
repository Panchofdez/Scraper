import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";

const SearchHistory = ({ searchHistory, history, fetchJobs }) => {
  const dispatch = useDispatch();
  return (
    <Row>
      {searchHistory.map((query) => (
        <Col xs={10} md={4}>
          <Card
            className="mb-3 elevated queryCard"
            style={{ width: "100%", borderRadius: 20 }}
            onClick={async () => {
              try {
                console.log("clicked");
                await dispatch(fetchJobs(query.id));
                console.log(history);
                history.push({
                  pathname: "/jobs",
                  state: { query },
                });
              } catch (err) {
                return;
              }
            }}
          >
            <Card.Body>
              <Card.Title>{query.job_type}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {query.site}
              </Card.Subtitle>
              <Card.Text className="mb-1">
                {query.city}, {query.province}, {query.country}
              </Card.Text>
              <Card.Text>
                {query.date.split(" ").slice(0, 4).join(" ")}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SearchHistory;
