import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl, FormCheck } from "react-bootstrap";

import { Container, Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import TextError from "../TextError";

import "./MyProfileForms.css";

const initialValues = {
  test: "",
  firstName: "",
  lastName: "",
  email: "",
  telNum: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  month: "",
  day: "",
  year: "",
  gender: "",
};

const validationSchema = Yup.object({
  test: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  postalCode: Yup.string().required("Required"),
  gender: Yup.string().required("Select a gender"),
});

const onSubmit = values => {
  console.log('Form Data', values);
};

const AboutMeTest = () => {
  return (
    <Container fluid className="pb-5 ml-1">
      <Row>
        <Col sm={4} className="pt-5 bg-light">
          <div className="mt-3">
            <p className="font-weight-bold">About Me</p>
            <p>
              <Link exact to="/SkillsPrefs">
                Skills & Preferences
              </Link>
            </p>
            <p>
              <Link exact to="/MatchAvail">
                Match Availability
              </Link>
            </p>
          </div>
        </Col>
        <Col sm={8} className="pt-5">
          <h3 className="form-header">About Me</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <Container>
                <Form className="mx-auto mb-5">
                  <pre>{JSON.stringify(values, null, 4)}</pre>
                  <fieldset>
                    <legend>Contact</legend>
                    <hr></hr>
                    <Row>
                      <Col>
                        <FormGroup>
                          <FormLabel htmlFor="firstName">First Name</FormLabel>
                          <Field
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            placeholder="Jane"
                          />
                          <ErrorMessage
                            name="firstName"
                            component={TextError}
                          />
                        </FormGroup>
                      </Col>

                      <Col>
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
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <Field
                            className="form-control"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="jDoe@email.com"
                          />
                          <ErrorMessage name="email" component={TextError} />
                        </FormGroup>
                      </Col>

                      <Col>
                        <FormGroup>
                          <FormLabel htmlFor="telNum">Telephone#</FormLabel>
                          <Field
                            className="form-control"
                            id="telNum"
                            name="telNum"
                            placeholder="818-222-4531"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </fieldset>

                  <fieldset>
                    <legend>Location</legend>
                    <hr></hr>
                    <Row>
                      <Col>
                        <FormGroup>
                          <FormLabel htmlFor="streetAddress">
                            Street Address
                          </FormLabel>
                          <Field
                            className="form-control"
                            id="streetAddress"
                            name="streetAddress"
                            placeholder="123 Easy Street"
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <FormLabel htmlFor="city">City</FormLabel>
                          <Field
                            className="form-control"
                            id="city"
                            name="city"
                            placeholder="Los Angeles"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
                    <Field
                      className="form-control"
                      id="postalCode"
                      name="postalCode"
                      placeholder="92120"
                    />
                    <ErrorMessage name="postalCode" component={TextError} />
                  </fieldset>

                  <fieldset>
                    <legend>Demographics</legend>
                    {/* <p>Demographics</p> */}

                    <hr></hr>
                    <FormGroup>
                      <FormLabel>Birthday</FormLabel>
                      <Row>
                        <Col>
                          <FormControl as="select" name="month">
                            <option value="">Month</option>
                            <option value="1">Jan</option>
                            <option value="2">Feb</option>
                            <option value="3">Mar</option>
                          </FormControl>
                        </Col>
                        <Col>
                          <FormControl as="select" name="month">
                            <option value="">Day</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </FormControl>
                        </Col>
                        <Col>
                          <FormControl as="select" name="year">
                            <option value="">Year</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                          </FormControl>
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup className="form-group">
                      <div className="custom-form-label">Gender</div>
                      <FormGroup className="form-check form-check-inline">
                        <Field
                          className="form-check-input"
                          type="radio"
                          id="male"
                          name="gender"
                          value="Male"
                        />
                        <FormLabel className="form-check-label" htmlFor="male">
                          Male
                        </FormLabel>
                      </FormGroup>

                      <FormGroup className="form-check form-check-inline">
                        <Field
                          className="form-check-input"
                          type="radio"
                          id="female"
                          name="gender"
                          value="Female"
                        />
                        <FormLabel
                          className="form-check-label"
                          htmlFor="female"
                        >
                          Female
                        </FormLabel>
                      </FormGroup>
                      <div>
                        <ErrorMessage name="gender" component={TextError} />
                      </div>
                    </FormGroup>
                  </fieldset>

                  <Button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Submit
                  </Button>
                </Form>
              </Container>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutMeTest;
