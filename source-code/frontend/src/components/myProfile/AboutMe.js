import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";

import { Container, Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import TextError from "../TextError";
// import ErrorMsg from "../ErrorMsg";
import UserContext from "../UserContext";
import TennisCentralAPI from "../../TennisCentralAPI";
import SubmitFormApiMsgs from "../SubmitFormApiMsgs";

import { format } from "date-fns";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import moment from "moment";

import "./MyProfileForms.css";

const AboutMe = ({ updateUserRecord }) => {
  const [profileData, setProfileData] = useState({});

  // State & vars associated with displaying and hiding API Error & Success Msgs arrising from submission of form
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [submitFormApiErrorMsg, setSubmitFormApiErrorMsg] = useState([]);
  const [submitFormApiSuccessMsg, setSubmitFormApiSuccessMsg] = useState({
    message: "",
  });
  const success = "Data was successfully updated";

  const [loadFormApiErrorMsg, setLoadFormApiErrorMsg] = useState([]);
  const [loadFormApiSuccessMsg, setLoadFormApiSuccessMsg] = useState({
    message: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const userInfo = useContext(UserContext);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        let res = await TennisCentralAPI.getUserProfile(
          userInfo?.userId,
          userInfo?.token
        );
        setProfileData(res.user);

        setIsLoading(false);
        // }
      } catch (error) {
        if (Array.isArray(error)) {
          setIsLoading(false);
          setLoadFormApiErrorMsg(error);
        }
      }
    };
    loadFormData();
  }, []);

  // Starts a timer to remove success message after some interval
  useEffect(() => {
    // Only need to set timer to automatically remove success msg submission was a success if not don't set timer
    if (submitFormApiErrorMsg.length === 0) {
      setTimeout(() => setSubmitFormApiSuccessMsg({ message: "" }), 3000);
    }
  }, [dataSubmitted]);

  // On load sets birthday to value in DB or leave it blank if no value previously saved (e.g., brand new user)
  const setBirthday = (birthday) => {
    if (birthday) {
      return new Date(birthday);
    }
    return "";
  };

  const initialValues = {
    ...profileData,
    birthday: setBirthday(profileData?.birthday),
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    // postalCode: Yup.string().required("Required"),
    // gender: Yup.string().required("Select a gender"),
  });

  const onSubmit = async (values, { setSubmitting, setFieldValue, errors }) => {
    const throwError = false;
    try {
      // Clear out any prior api error messages on submission of the form so they don't persist
      setSubmitFormApiErrorMsg([]);
      setDataSubmitted(true);
      if (userInfo.token) {
        await updateUserRecord(values, userInfo.userId, userInfo?.token);
        if (throwError) {
          throw ["Update Failed"];
        }
        setSubmitting(false);

        // Set submitFormApiSuccessMsg to trigger useEffect to trigger timer on success msg
        setSubmitFormApiSuccessMsg({ message: success });
      }
    } catch (error) {
      if (Array.isArray(error)) {
        setSubmitFormApiErrorMsg(error);
        // setIsLoading(false);
      }
    }
    // Need to reset dataSubmitted state regardless of whether submission was successful or not
    setDataSubmitted(false);
  };
  if (isLoading) {
    return <p className="">Loading &hellip;</p>;
  }
  if (loadFormApiErrorMsg.length > 0) {
    return (
      <SubmitFormApiMsgs
        submitFormApiErrorMsg={loadFormApiErrorMsg}
        submitFormApiSuccessMsg={loadFormApiSuccessMsg}
      />
    );
  }

  return (
    <Container fluid className="pb-5 ml-1">
      <Row>
        <Col sm={2} className="pt-5 bg-light">
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
        <Col sm={10} className="pt-5">
          <h3 className="form-header">About Me</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              handleChange,
              touched,
              errors,
            }) => {
              return (
                <Container>
                  <Form className="mx-auto mb-5">
                    {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
                    <fieldset>
                      <legend>Contact</legend>
                      <Row>
                        <Col>
                          <FormGroup>
                            <FormLabel htmlFor="firstName">
                              First Name
                            </FormLabel>
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
                            <ErrorMessage
                              name="lastName"
                              component={TextError}
                            />
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
                              type="text"
                              name="telNum"
                              placeholder="818-222-4531"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </fieldset>

                    <fieldset>
                      <legend>Location</legend>
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
                      <FormGroup>
                        <FormLabel
                          className="datePickerLabel"
                          htmlFor="dateAndTime"
                        >
                          Birthday
                        </FormLabel>
                        <DatePicker
                          maxDate={new Date()}
                          isClearable
                          className="form-control"
                          selected={values.birthday}
                          onChange={(date) => setFieldValue("birthday", date)}
                          showYearDropdown
                          dateFormatCalendar="MMMM"
                          yearDropdownItemNumber={70}
                          scrollableYearDropdown
                          dateFormat="MM/dd/yyyy"
                          type="date"
                          id="birthday"
                          name="birthday"
                        />
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
                          <FormLabel
                            className="form-check-label"
                            htmlFor="male"
                          >
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
                    <SubmitFormApiMsgs
                      submitFormApiErrorMsg={submitFormApiErrorMsg}
                      submitFormApiSuccessMsg={submitFormApiSuccessMsg}
                    />
                    <Button
                      type="submit"
                      className="btn btn-primary btn-lg btn-block mt-3"
                    >
                      Submit
                    </Button>
                  </Form>
                </Container>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutMe;
