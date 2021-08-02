import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl, FormCheck } from "react-bootstrap";

import { Container, Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import TextError from "./TextError";
import "./Join.css";
import { mapValues } from "lodash";
import ErrorMsg from './ErrorMsg';
import UserContext from './UserContext'; 


const Join = ({registerUser}) => {

  const [ joinErrorFormMsg, setJoinErrorFormMsg] = useState([]);
  const userInfo = useContext(UserContext);
  const history = useHistory();
  const initialValues = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
    .test('match', 
      'passwords do not match', 
       function(confirmPassword) { 
         return confirmPassword === this.parent.password; 
       }),
    email: Yup.string().email("Invalid email format").required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),

  });
  
  const onSubmit = async (values, {setSubmitting, resetForm}) => {
    console.log("Form Data", values);
    try {
      await registerUser(values)
      setSubmitting(false)
      history.push("/")
      // resetForm();
    } catch (error) {
      console.log(error);
      if (Array.isArray(error)) {
        setJoinErrorFormMsg(error)
      }
    }
  };
  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-items-center mt-4 mb-4">
        <Col sm={6} className="mx-auto form-border">
          <h1>Join</h1>
          <p className="disclaimer">
            All information provided is private and will not be shared!
          </p>
          <hr></hr>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
            <Form className="mx-auto">
              <fieldset>
                <legend>Login info</legend>
                <FormGroup>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Field
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="jDoe"
                  />
                  <ErrorMessage name="username" component={TextError} />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="password123"
                  />
                  <ErrorMessage name="password" component={TextError} />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="password">Confirm Password</FormLabel>
                  <Field
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="password123"
                  />
                  <ErrorMessage name="confirmPassword" component={TextError} />
                </FormGroup>
              </fieldset>
              <fieldset>
                <legend>Contact info</legend>
                <FormGroup>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <Field
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="Jane"
                  />
                  <ErrorMessage name="firstName" component={TextError} />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <Field
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                  />
                  <ErrorMessage name="lastName" component={TextError} />
                </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Field
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="jDoe@email.com"
                  />
                  <ErrorMessage name="email" component={TextError} />
                </FormGroup>
              </fieldset>
              {joinErrorFormMsg.length !== 0 ? 
                joinErrorFormMsg.map(errorMsg => <ErrorMsg errorMsg={errorMsg} />)
               : null }
              <Button type="submit"   
                // className="mt-3 float-right">
                className="btn btn-primary btn-lg btn-block mt-3">

                Submit
              </Button>
            </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <div className="footer"></div>
    </Container>
  );
};

export default Join;
