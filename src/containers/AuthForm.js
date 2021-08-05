import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { Form, Container, Row, Col, Button, Card } from "react-bootstrap";
import { authenticateUser } from "../store/actions/auth";

const AuthForm = ({ type, btnMessage, history, headerMessage }) => {
  const initialVals =
    type == "signup"
      ? {
          email: "",
          password: "",
          password2: "",
        }
      : { email: "", password: "" };

  const schema =
    type == "signup"
      ? Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string().required("Required"),
          password2: Yup.string().required("Required"),
        })
      : Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string().required("Required"),
        });
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: initialVals,
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        await dispatch(authenticateUser(type, values));
        history.push("/");
      } catch (err) {
        return;
      }
    },
  });

  return (
    <Container style={{ height: "100%" }}>
      <Row className="justify-content-center my-5">
        <Col md={6} className="login-div mb-5">
          <h3 className="mb-3 title" style={{ letterSpacing: 0.5, color: "#97c9c8" }}>
            {headerMessage}
          </h3>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                className="input-div"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formGridType">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="input-div"
                isInvalid={formik.touched.password && !!formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </Form.Group>
            {type == "signup" && (
              <Form.Group controlId="formGridType2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password2}
                  className="input-div"
                  isInvalid={formik.touched.password2 && !!formik.errors.password2}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.password2}</Form.Control.Feedback>
              </Form.Group>
            )}

            <Button
              className="my-4 button"
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
