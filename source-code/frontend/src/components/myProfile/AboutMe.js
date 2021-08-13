import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";

import { Container, Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import TextError from "../TextError";
import ErrorMsg from "../ErrorMsg";
import UserContext from "../UserContext";
import TennisCentralAPI from "../../TennisCentralAPI";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import moment from "moment";

import "./MyProfileForms.css";

const AboutMe = ({ updateUserRecord }) => {
  const [profileData, setProfileData] = useState({});
  const [startDate, setStartDate] = useState();
  const [updateAboutMeErrorFormMsg, setUpdateAboutMeErrorFormMsg] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = useContext(UserContext);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        let profileData = await TennisCentralAPI.getUserProfile(
          userInfo.userId
        );
        debugger;
        setProfileData(profileData.user);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadFormData();
  }, [userInfo]);
  console.log(profileData.birthday);

  const initialValues = { ...profileData, birthday: moment(profileData.birthday).format("MM/DD/YYYY") }

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    postalCode: Yup.string().required("Required"),
    gender: Yup.string().required("Select a gender"),
  });

  const onSubmit = async (values, { setSubmitting, setFieldValue, errors }) => {
    console.log("Form Data", values);
    values.birthday = startDate;
    try {
      await updateUserRecord(values, userInfo.userId);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error)) {
        setUpdateAboutMeErrorFormMsg(error);
      }
    }
  };
  if (isLoading) {
    return <p className="">Loading &hellip;</p>;
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
              console.log(errors )

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
                          // filterDate={d => {
                          //   return new Date() > d;
                          // }}
                          maxDate={new Date()}
                          isClearable
                          className="form-control"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          showYearDropdown
                          dateFormatCalendar="MMMM"
                          yearDropdownItemNumber={70}
                          scrollableYearDropdown
                          // dateFormat="yyyy/MM/dd"
                          dateFormat="MM/dd/yyyy"
                          type="date"
                          id="birthday"
                          name="birthday"
                          value={values.birthday}
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
                    {updateAboutMeErrorFormMsg.length !== 0
                      ? updateAboutMeErrorFormMsg.map((errorMsg) => (
                          <ErrorMsg errorMsg={errorMsg} />
                        ))
                      : null}

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
