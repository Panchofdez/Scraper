import React, { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchHistory, deleteSearchQuery } from "../store/actions/searchHistory";
import { fetchJobs } from "../store/actions/jobs";

const SearchHistory = ({ history }) => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.auth.token);
  const searchHistory = useSelector((state) => state.searchHistory);

  useEffect(() => {
    console.log("HOME");
    if (userToken) {
      dispatch(fetchSearchHistory());
    }
  }, []);
  return (
    <Row className="d-flex justify-content-center justify-content-md-start ">
      {searchHistory.map((query) => (
        <Col xs={10} md={4} className="h-100">
          <Card className="mb-3 elevated queryCard" style={{ width: "100%", borderRadius: 20 }}>
            <Card.Body>
              <Card.Title>{query.job_type}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{query.site}</Card.Subtitle>
              <Card.Text className="mb-1">
                {query.city}, {query.province}, {query.country}
              </Card.Text>
              <Card.Text>{query.date.split(" ").slice(0, 4).join(" ")}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Card.Link
                className="btn btn-outline-info"
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
                target="_blank"
              >
                View Job Posting
              </Card.Link>
              <Card.Link
                onClick={async () => {
                  try {
                    await dispatch(deleteSearchQuery(query.id));
                    window.location.reload();
                  } catch (err) {
                    return;
                  }
                }}
                className="btn btn-outline-danger"
              >
                Remove
              </Card.Link>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SearchHistory;
