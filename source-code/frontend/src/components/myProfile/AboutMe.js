import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl} from "react-bootstrap";

import { Container, Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import TextError from "../TextError";
import ErrorMsg from '../ErrorMsg';
import UserContext from '../UserContext';
import TennisCentralAPI from "../../TennisCentralAPI";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import "./MyProfileForms.css";

const AboutMe = ({updateUserRecord}) => {
  const [ profileData, setProfileData ] = useState({});
  const [ startDate, setStartDate ] = useState()
  const [ updateAboutMeErrorFormMsg, setUpdateAboutMeErrorFormMsg] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true)
  const userInfo = useContext(UserContext);

  // const loadDBValuesIntoForm = ({setFieldValue}) => {
  //   if (userInfo) {
  //     // get user and set form fields
  //       const fields = ['firstName', 'lastName', 'email', 
  //         'telNum', 'streetAddress', 'city', 'postalCode', 'gender'];
  //       fields.forEach(field => setFieldValue(field, profileData.user[field], false));
  //   }
  // }

  useEffect(() => {
    const loadFormData = async () => {
      debugger;
      try {
        let profileData = await TennisCentralAPI.getUserProfile(userInfo.userId);
        debugger;
        setProfileData(profileData.user);
        // loadDBValuesIntoForm();
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
     }
    loadFormData()
  }, [userInfo])

  // useEffect(() => {
  //   console.log("====UserInfo value: ", userInfo)
  //   if (userInfo) {
  //     // get user and set form fields
  //       const fields = ['firstName', 'lastName', 'email', 
  //         'telNum', 'streetAddress', 'city', 'postalCode', 'gender'];
  //       fields.forEach(field => setFieldValue(field, profileData[field], false));
  //   }
  // }, [userInfo]);

  const initialValues = profileData;


 
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    postalCode: Yup.string().required("Required"),
    gender: Yup.string().required("Select a gender"),
  });


  
  const onSubmit = async (values, {setSubmitting, setFieldValue}) => {
    console.log("Form Data", values);
    values.birthday = startDate;
    try {
      debugger;
      await updateUserRecord(values, userInfo.userId)
      setSubmitting(false)
      
    } catch (error) {
      console.log(error);
      if (Array.isArray(error)) {
        setUpdateAboutMeErrorFormMsg(error)
      }
    }
  };
  if (isLoading) {
    return <p className="">Loading &hellip;</p>;
  } 
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
            {({ values, handleSubmit, isSubmitting, setFieldValue, handleChange, touched, errors }) => (
              <Container>
                <Form className="mx-auto mb-5">
                  {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
                  <fieldset>
                    <legend>Contact</legend>
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
                        className="form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        yearDropdownItemNumber={70}
                        scrollableYearDropdown
                      />
                      {/* <Row>
                        <Col>
                          <Field as="select" name="month" id="month" className="form-control">
                            <option value="">Month</option>
                            <option value="1">Jan</option>
                            <option value="2">Feb</option>
                            <option value="3">Mar</option>
                          </Field>
                        </Col>
                        <Col>
                          <FormControl as="select" name="day" id="day">
                            <option value="">Day</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </FormControl>
                        </Col>
                        <Col>
                          <FormControl as="select" name="year" id="year">
                            <option value="">Year</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                          </FormControl>
                        </Col>
                      </Row> */}
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
                  {updateAboutMeErrorFormMsg.length !== 0 ? 
                    updateAboutMeErrorFormMsg.map(errorMsg => <ErrorMsg errorMsg={errorMsg} />)
                    : null }

                  <Button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block mt-3"
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

export default AboutMe;
