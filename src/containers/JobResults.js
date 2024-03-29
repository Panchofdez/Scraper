import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card, Spinner, Button, ButtonToolbar } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { analyseJobs, baseTechnologies, updateSearchQuery } from "../store/actions/jobs";
import { deleteSearchQuery } from "../store/actions/searchHistory";
import { saveJob } from "../store/actions/favorites";
import AddTechModal from "../components/AddTechModal";
import Chart from "../components/Chart";
import LoadingModal from "../components/LoadingModal";
import JobResultsList from "../components/JobResultsList";
import { addToast } from "../store/actions/toasts";

const JobResults = ({ location, history }) => {
  const dispatch = useDispatch();
  const { jobs, counter, query } = useSelector((state) => state.jobs);
  const userToken = useSelector((state) => state.auth.token);
  console.log(query);
  const [modalShow, setModalShow] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);

  const locationState = location.state;
  useEffect(() => {
    let isReady = true;
    console.log("useeffect");

    const setUp = () => {
      if (isReady) {
        if (Object.keys(query).length > 0) {
          const techlist = query.technologies.split(" ");
          console.log("Technologies", techlist);
          setTechnologies(techlist);
        } else if (jobs.length === 0) {
          history.push("/");
        }
        setLoading(false);
      }
    };
    setUp();
    return () => {
      isReady = false;
    };
  }, []);

  const chartData = Object.keys(counter).map((k) => {
    return {
      name: k,
      count: counter[k],
    };
  });

  const addTechnologies = () => {
    if (!userToken) {
      dispatch(
        addToast({
          type: "Error",
          message: "Must be signed in to access this feature",
        })
      );
      setModalShow(false);
      return;
    }
    console.log(technologies);
    dispatch(analyseJobs(query.id, technologies));
    setModalShow(false);
  };

  const saveJobs = (jobData) => {
    if (Object.keys(query).length === 0) {
      dispatch(
        addToast({
          type: "Error",
          message: "Must be signed in to access this feature",
        })
      );
      return;
    }
    console.log(jobData);
    dispatch(saveJob(jobData));
  };

  const filterJobs = (jobs) => {
    if (search === "") {
      return jobs;
    } else {
      return jobs.filter((job) => {
        let searchTerm = search.toLowerCase().replace(/ +/g, "");

        return (
          job.title.toLowerCase().replace(/ +/g, "").indexOf(searchTerm) !== -1 ||
          job.company.toLowerCase().replace(/ +/g, "").indexOf(searchTerm) !== -1 ||
          checkSubstring(search, job)
        );
      });
    }
  };

  const checkSubstring = (searchTerm, job) => {
    let searchArr = searchTerm.split(" ");
    for (let term of searchArr) {
      term = term.trim(" ");
      if (term !== "") {
        if (!(term.toLowerCase() in job.technologies)) {
          return false;
        }
      }
    }
    return true;
  };

  if (loading || jobs.length == 0) {
    return <Spinner animation="grow" />;
  } else {
    const filteredJobs = filterJobs(jobs);
    return (
      <Container className="mt-5">
        <Row>
          {Object.keys(query).length > 0 && <Col md={12}></Col>}

          <Col md={12}>
            <Card style={{ borderRadius: 20 }} className="elevated">
              <Card.Body>
                <Row className="d-flex justify-content-between flex-1">
                  <Col md={9} className="d-flex flex-row justify-content-between">
                    <h5 className="mr-3">{locationState.query.job_type || locationState.query.type}</h5>
                    <p className="mr-3 mb-1">{locationState.query.site}</p>
                    <p className="mr-3">
                      {locationState.query.city}, {locationState.query.province} {locationState.query.country}
                    </p>
                    <p className="mr-3">
                      {"date" in locationState.query && locationState.query.date.split(" ").slice(0, 4).join(" ")}
                    </p>
                  </Col>
                  <Col md={3}>
                    <ButtonToolbar className="mb-3 float-right">
                      <Button
                        variant="outline-secondary mr-3"
                        onClick={async () => {
                          try {
                            setVisible(true);
                            const new_query = await dispatch(updateSearchQuery(query.id, technologies));
                            console.log(new_query);
                            setVisible(false);
                            history.push({
                              pathname: "/jobs",
                              state: { query: new_query },
                            });
                          } catch (err) {
                            setVisible(false);
                            return;
                          }
                        }}
                      >
                        Refresh
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={async () => {
                          try {
                            await dispatch(deleteSearchQuery(query.id));
                            history.push("/");
                          } catch (err) {
                            return;
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <Chart chartData={chartData} />
                <Row>
                  <Col md={12}>
                    <ButtonToolbar className="mb-3 float-right">
                      <Button variant="outline-secondary" onClick={() => setModalShow(true)}>
                        Add technologies/skills
                      </Button>
                    </ButtonToolbar>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12} className="my-3">
            <JobResultsList filteredJobs={filteredJobs} setSearch={setSearch} saveJobs={saveJobs} />
          </Col>
          <Col md={4}></Col>
        </Row>
        <AddTechModal
          technologies={technologies}
          setTechnologies={setTechnologies}
          modalShow={modalShow}
          setModalShow={setModalShow}
          addTechnologies={addTechnologies}
        />
        <LoadingModal visible={visible} setVisible={setVisible} />
      </Container>
    );
  }
};

export default JobResults;
