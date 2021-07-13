import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl, FormCheck } from "react-bootstrap";

import { Container, Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as Yup from "yup";

import "./MyProfileForms.css";

const initialValues = {
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
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  postalCode: Yup.string().required("Required"),
  genderGroup: Yup.string().required("Please select your gender"),
  // validationSchema={Yup.object().shape({
  //   radioGroup: Yup.string().required("A radio option is required"),
});

const onSubmit = (values) => {
  console.log(values);
};

const AboutMe = () => {
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
            <Container>
              <Form className="mx-auto mb-5">
                {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
                <fieldset>
                  <legend>Contact</legend>
                  <hr></hr>
                  <Row>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor="firstName">First Name</FormLabel>
                        <FormControl
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="Jane"
                        />
                        <ErrorMessage name="firstName" />
                      </FormGroup>
                    </Col>

                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor="lastName">Last Name</FormLabel>
                        <FormControl
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                        />
                        <ErrorMessage name="lastName" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl
                          type="email"
                          id="email"
                          name="email"
                          placeholder="jDoe@email.com"
                        />
                        <ErrorMessage name="email" />
                      </FormGroup>
                    </Col>

                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor="telNum">Telephone#</FormLabel>
                        <FormControl
                          type="text"
                          id="telNum"
                          name="telNum"
                          placeholder="818-222-4531"
                        />
                        <ErrorMessage name="telNum" />
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
                        <FormControl
                          type="text"
                          id="streetAddress"
                          name="streetAddress"
                          placeholder="123 Easy Street"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor="city">City</FormLabel>
                        <FormControl
                          type="text"
                          id="city"
                          name="city"
                          placeholder="Los Angeles"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
                  <FormControl
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    placeholder="92120"
                  />
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
                  <div id="genderGroup">Gender</div>
                  <FormGroup role="group" aria-labelledby="gender-group">
                    <FormLabel>
                      <FormCheck
                        inline
                        label="Male"
                        type="radio"
                        name="gender"
                        value="male"
                        id="inline-radio-1"
                      />
                    </FormLabel>

                    <FormLabel>
                      <FormCheck
                        inline
                        label="Female"
                        type="radio"
                        name="gender"
                        value="female"
                        id="inline-radio-2"
                      />
                    </FormLabel>
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
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutMe;
