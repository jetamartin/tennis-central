import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl, FormCheck } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import TextError from "./TextError";
import "./Login.css";
import ErrorMsg from "./ErrorMsg";

const Login = ({ loginUser }) => {
  const [loginErrorFormMsg, setLoginErrorFormMsg] = useState([]);
  const history = useHistory();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Form Data", values);
    try {
      await loginUser(values);
      setSubmitting(false);
      resetForm();
      history.push("/");
      setLoginErrorFormMsg([]);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error)) {
        setLoginErrorFormMsg(error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <Row className="h-100 justify-content-center align-items-center">
        <Col sm={8} className="mx-auto form-border">
          <h1>Login</h1>
          <hr></hr>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mx-auto">
                <Col>
                  <FormGroup>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Field
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="JaneDoe"
                    />
                    <ErrorMessage name="username" component={TextError} />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password123"
                    />
                    <ErrorMessage name="password" component={TextError} />
                  </FormGroup>
                </Col>
                {loginErrorFormMsg.length !== 0
                  ? loginErrorFormMsg.map((errorMsg) => (
                      <ErrorMsg errorMsg={errorMsg} />
                    ))
                  : null}
                <Button
                  type="submit"
                  // className="btn btn-primary mt-3 float-right"
                  className="btn btn-primary btn-lg btn-block mt-3"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
