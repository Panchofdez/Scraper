import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Col, Badge, InputGroup, Spinner, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { scrapeJobs } from "../store/actions/jobs";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingModal from "../components/LoadingModal";
import AddTechForm from "../components/AddTechForm";

const SearchForm = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [technologies, setTechnologies] = useState([
    "HTML",
    "CSS",
    "Python",
    "Javascript",
    "Java",
    "C++",
    "C#",
    "C",
    "PHP",
    "AWS",
    "SQL",
  ]);
  const formik = useFormik({
    initialValues: {
      site: "Stack Overflow",
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
      province: Yup.string().required("Province is required").max(2, "Must be 2 characters in length"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      console.log(technologies);
      if (technologies.length === 0) {
        return;
      }
      const data = {
        ...values,
        technologies,
      };
      try {
        setVisible(true);
        const new_query = await dispatch(scrapeJobs(data));

        history.push({
          pathname: "/jobs",
          state: { query: { ...data, ...new_query } },
        });
      } catch (err) {
        console.log(err);
        setVisible(false);
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
          isInvalid={formik.touched.site && !!formik.errors.site}
          className="elevated"
        >
          <option>Stack Overflow</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">Please enter a job site</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formGridType">
        <Form.Label>Job Type</Form.Label>
        <Form.Control
          placeholder="Job Occupation"
          name="type"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.type}
          isInvalid={formik.touched.type && formik.errors.type}
          className="elevated"
        />
        <Form.Control.Feedback type="invalid">{formik.errors.type}</Form.Control.Feedback>
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
            isInvalid={formik.touched.country && formik.errors.country}
            className="elevated"
          >
            <option>Canada</option>
            <option>United States</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">{formik.errors.country}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            isInvalid={formik.touched.city && formik.errors.city}
            className="elevated"
          />
          <Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridProvince">
          <Form.Label>Province/State</Form.Label>
          <Form.Control
            name="province"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.province}
            isInvalid={formik.touched.province && formik.errors.province}
            placeholder="ex. ON, BC"
            className="elevated"
          />
          <Form.Control.Feedback type="invalid">{formik.errors.province}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <AddTechForm technologies={technologies} setTechnologies={setTechnologies} />
      <Button
        className="my-3 elevated"
        style={{ backgroundColor: "#97c9c8", borderColor: "#97c9c8" }}
        type="submit"
        block
      >
        Find Jobs
      </Button>
      <LoadingModal visible={visible} setVisible={setVisible} />
    </Form>
  );
};

export default SearchForm;
