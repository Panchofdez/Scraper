import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Form,
  Button,
  Col,
  Badge,
  InputGroup,
  Spinner,
  Modal,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { fetchJobs } from "../store/actions/jobs";
import { useFormik } from "formik";
import * as Yup from "yup";

const SearchForm = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [addTech, setAddTech] = useState("");
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
  const formik = useFormik({
    initialValues: {
      site: "Indeed",
      type: "",
      city: "",
      province: "",
      country: "Canada",
    },
    validationSchema: Yup.object({
      site: Yup.string().required("Job site is required"),
      type: Yup.string().required("Job type is required"),
      country: Yup.string().required("Country is required"),
      city: Yup.string().required("City is required"),
      province: Yup.string()
        .required("Province is required")
        .max(2, "Must be 2 characters in length"),
    }),
    onSubmit: async (values) => {
      if (technologies.length === 0) {
        setError(true);
        return;
      }
      const data = {
        ...values,
        technologies,
      };
      console.log(data);
      try {
        setVisible(true);
        await dispatch(fetchJobs(data));
        history.push("/jobs");
      } catch (err) {
        console.log(err);
        return;
      }
    },
  });
  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group controlId="formGridSite">
        <Form.Label>Job Site</Form.Label>
        <Form.Control
          as="select"
          name="site"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.site}
          isInvalid={!!formik.errors.site}
        >
          <option>Indeed</option>
          <option>GlassDoor</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          Please enter a job site
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formGridType">
        <Form.Label>Job Type</Form.Label>
        <Form.Control
          placeholder="Job Occupation"
          name="type"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.type}
          isInvalid={!!formik.errors.type}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.type}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            as="select"
            name="country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
            isInvalid={!!formik.errors.country}
          >
            <option>Canada</option>
            <option>United States</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {formik.errors.country}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            isInvalid={!!formik.errors.city}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.city}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridProvince">
          <Form.Label>Province/State</Form.Label>
          <Form.Control
            name="province"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.province}
            isInvalid={!!formik.errors.province}
            placeholder="ex. ON, BC"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.province}
          </Form.Control.Feedback>
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
              if (addTech === "") {
                return;
              }
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
      {error && (
        <div className="ml-2" style={{ color: "#d9534f", fontSize: "14px" }}>
          Must add at least 1 technology/skill
        </div>
      )}
      <div>
        {technologies.map((t, idx) => (
          <Button
            key={idx}
            variant="outline-secondary"
            className="mr-2 mt-2"
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
      <Button
        className="my-3"
        style={{ backgroundColor: "#97c9c8", borderColor: "#97c9c8" }}
        type="submit"
        block
      >
        Find Jobs
      </Button>
      <Modal
        show={visible}
        onHide={() => setVisible(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <div className="justify-content-center p-5">
            <Spinner animation="grow" className="mr-5" />
            This might take a while...
          </div>
        </Modal.Body>
      </Modal>
    </Form>
  );
};

export default SearchForm;
