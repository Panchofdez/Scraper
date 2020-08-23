import React, { useState } from "react";
import { Form, Button, Col, Badge, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SearchForm = () => {
  let history = useHistory();
  const [site, setSite] = useState("Indeed");
  const [type, setType] = useState("");
  const [country, setCountry] = useState("Canada");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [addTech, setAddTech] = useState("");
  const [technologies, setTechnologies] = useState([
    "Python",
    "Javascript",
    "Java",
    "C++",
    "C#",
    "C",
    "Go",
    "React",
    "Angular",
    "Vue",
    "AWS",
    "SQL",
    "Docker",
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      site,
      type,
      country,
      city,
      province,
      technologies,
    };
    console.log(data);
    history.push("/jobs");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formGridSite">
        <Form.Label>Job Site</Form.Label>
        <Form.Control
          as="select"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        >
          <option>Indeed</option>
          <option>GlassDoor</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formGridType">
        <Form.Label>Job Type</Form.Label>
        <Form.Control
          placeholder="Job Occupation"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            as="select"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>Canada</option>
            <option>United States</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridProvince">
          <Form.Label>Province/State</Form.Label>
          <Form.Control
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            placeholder="ex. ON, BC"
          />
        </Form.Group>
      </Form.Row>

      <Form.Label>Technologies/Skills</Form.Label>
      <InputGroup className="mb-1">
        <Form.Control
          placeholder="ex.Python, Javascript"
          value={addTech}
          onChange={(e) => setAddTech(e.target.value)}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setTechnologies((prevState) => {
                return [...prevState, addTech];
              });
              setAddTech("");
            }}
          >
            Add
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <div>
        {technologies.map((t) => (
          <Button
            variant="outline-secondary"
            className="mr-1 mt-2"
            onClick={() => {
              setTechnologies((prevState) => {
                return prevState.filter((tech) => tech !== t);
              });
            }}
          >
            {t}{" "}
            <Badge
              variant="light"
              style={{
                fontWeight: "bold",
                fontSize: "15px",
                backgroundColor: "white",
              }}
            >
              X
            </Badge>
          </Button>
        ))}
      </div>
      <Button className="mt-3" variant="secondary" type="submit" block>
        Find Jobs
      </Button>
    </Form>
  );
};

export default SearchForm;
