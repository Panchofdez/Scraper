import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Form, Container, Row, Col, Button, Card } from "react-bootstrap";
import { authenticateUser } from "../store/actions/auth";

const AuthForm = ({ type, btnMessage, history, headerMessage }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(authenticateUser(type, values));
        history.push("/");
      } catch (err) {
        return;
      }
    },
  });
  return (
    <Container style={{ height: "100%" }}>
      <Row className="justify-content-center my-5 h-100">
        <Col md={6}>
          <h3 className="mb-3" style={{ letterSpacing: 0.5, color: "#97c9c8" }}>
            {headerMessage}
          </h3>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                className="elevated"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formGridType">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="elevated"
                isInvalid={formik.touched.password && !!formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              className="my-3"
              style={{ backgroundColor: "#97c9c8", borderColor: "#97c9c8" }}
              type="submit"
              block
            >
              {btnMessage}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
