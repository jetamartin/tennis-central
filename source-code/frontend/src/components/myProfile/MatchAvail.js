import React, { useState, useEffect, useContext } from "react";
import { Formik, Field, Form } from "formik";
import { Link } from "react-router-dom";
import isNil from "lodash/isNil";

import { useHistory } from "react-router-dom";
import { FormGroup, FormLabel, FormControl, FormCheck } from "react-bootstrap";
import { Container, Col, Row, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import UserContext from "../UserContext";
import TennisCentralAPI from "../../TennisCentralAPI";

import SubmitFormApiMsgs from "../SubmitFormApiMsgs";

const MatchAvail = ({ updateUserRecord }) => {
  const [profileData, setProfileData] = useState({});
  // const [updateMatchAvailFormErrorMsg, setUpdateMatchAvailFormErrorMsg] =
  //   useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = useContext(UserContext);

  // State & vars associated with displaying and hiding API Error & Success Msgs arrising from submission of form
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [submitFormApiErrorMsg, setSubmitFormApiErrorMsg] = useState([]);
  const [submitFormApiSuccessMsg, setSubmitFormApiSuccessMsg] = useState({
    message: "",
  });
  const success = "Data was successfully updated";
  
  // Starts a timer to remove success message after some interval
  useEffect(() => {
    // Only need to set timer to automatically remove success msg submission was a success if not don't set timer
    if (submitFormApiErrorMsg.length === 0) {
      setTimeout(() => setSubmitFormApiSuccessMsg({ message: "" }), 3000);
    }
  }, [dataSubmitted]);

  useEffect(() => {
    const loadFormData = async () => {
      setSubmitFormApiErrorMsg([])
      try {
        if (userInfo.token) {
          let data = await TennisCentralAPI.getUserProfile(userInfo?.userId, userInfo?.token);
          let profileData = transformBuildMatchAvailObject(
            data.user.match_availability
          );
          setProfileData(profileData);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        if (Array.isArray(error)) {
          setSubmitFormApiErrorMsg(error);
        }
        setIsLoading(false)
      }
    };
    loadFormData();
  }, [userInfo]);

  const initialValues = profileData;

  const validationSchema = Yup.object({
    // firstName: Yup.string().required("Required"),
    // lastName: Yup.string().required("Required"),
    // email: Yup.string().email("Invalid email format").required("Required"),
    // postalCode: Yup.string().required("Required"),
    // gender: Yup.string().required("Select a gender"),
  });

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  const buildMatchAvailObject = (values) => {
    const keysArray = Object.keys(values);
    const avail = [];
    const matchAvail = [];
    keysArray.forEach((key) => {
      if (key.includes("-")) {
        matchAvail.push(key);
      }
    });

    return matchAvail.reduce(function (obj, v) {
      const avail = [];
      const keyValuePair = v.split("-");
      if (keyValuePair[0] in obj) {
        obj[keyValuePair[0]].push(keyValuePair[1]);
      } else {
        obj[keyValuePair[0]] = [keyValuePair[1]];
      }
      return obj;
    }, {});
  };

  const transformBuildMatchAvailObject = (matchAvailability) => {
    if (isNil(matchAvailability)) {
      return {};
    }
    const days = Object.keys(matchAvailability);
    const checkboxValuesObj = {};
    days.forEach((day) => {
      const timesArray = matchAvailability[day];
      timesArray.forEach((time) => {
        const dateTime = `${day}-${time}`;
        checkboxValuesObj[dateTime] = true;
      });
    });
    return checkboxValuesObj;
  };

  const onSubmit = async (values, { setSubmitting, setFieldValue }) => {
    values.match_availability = buildMatchAvailObject(values);
    console.log(values.match_availability);
    debugger;
    const throwError = false;
    try {
      // Clear out any prior api error messages on submission of the form so they don't persist
      setSubmitFormApiErrorMsg([]);
      setDataSubmitted(true);
      await updateUserRecord(values, userInfo?.userId, userInfo?.token);
      if (throwError) {
        throw ["Update Failed"];
      }
      setSubmitting(false);
      // Set submitFormApiSuccessMsg to trigger useEffect to trigger timer on success msg
      setSubmitFormApiSuccessMsg({ message: success });
    } catch (error) {
      console.log(error);
      if (Array.isArray(error)) {
        setSubmitFormApiErrorMsg(error);
      }
    }
    // Need to reset dataSubmitted state regardless of whether submission was successful or not
    setDataSubmitted(false);
  };

  if (isLoading) {
    return <p className="">Loading &hellip;</p>;
  }
  if (submitFormApiErrorMsg.length !== 0) {
    debugger
    return (     
     <SubmitFormApiMsgs
      submitFormApiErrorMsg={submitFormApiErrorMsg}
      submitFormApiSuccessMsg={submitFormApiSuccessMsg}
    />
    )
   }
  return (
    <Container fluid className="pb-5 ml-1">
      <Row>
        <Col sm={2} className="pt-5 bg-light">
          <div className="mt-3">
            <p>
              <Link exact to="/AboutMe">
                About Me
              </Link>
            </p>
            <p>
              <Link exact to="/SkillsPrefs">
                Skills & Preferences
              </Link>
            </p>
            <p className="font-weight-bold">Match Availability</p>
          </div>
        </Col>
        <Col sm={10} className="pt-5">
          <h3 className="form-header">Match Availability</h3>
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
            }) => (
              <Form className="mx-auto">
                {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
                <Table striped bordered responsive="sm">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Mon</th>
                      <th scope="col">Tue</th>
                      <th scope="col">Wed</th>
                      <th scope="col">Thu</th>
                      <th scope="col">Fri</th>
                      <th scope="col">Sat</th>
                      <th scope="col">Sun</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <div>Early Morning </div>
                        <div>(5am - 9am)</div>
                      </th>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Mon-eAM"
                            name="Mon-eAM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Tue-eAM"
                            name="Tue-eAM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Wed-eAM"
                            name="Wed-eAM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Thu-eAM"
                            name="Thu-eAM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Fri-eAM"
                            name="Fri-eAM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Sat-eAM"
                            name="Sat-eAM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Sun-eAM"
                            name="Sun-eAM"
                          />
                        </FormGroup>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div>Morning</div>
                        <div>(9am - Noon)</div>
                      </th>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Mon-AM"
                            name="Mon-AM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Tue-AM"
                            name="Tue-AM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Wed-AM"
                            name="Wed-AM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Thu-AM"
                            name="Thu-AM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Fri-AM"
                            name="Fri-AM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Sat-AM"
                            name="Sat-AM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Sun-AM"
                            name="Sun-AM"
                          />
                        </FormGroup>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div>Afternoon </div>
                        <div>(Noon - 5pm)</div>
                      </th>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Mon-PM"
                            name="Mon-PM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Tue-PM"
                            name="Tue-PM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Wed-PM"
                            name="Wed-PM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Thu-PM"
                            name="Thu-PM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Fri-PM"
                            name="Fri-PM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Sat-PM"
                            name="Sat-PM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Sun-PM"
                            name="Sun-PM"
                          />
                        </FormGroup>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div>Evening</div>
                        <div>(5pm - 10pm)</div>
                      </th>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Mon-EVE"
                            name="Mon-EVE"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Tue-EVE"
                            name="Tue-EVE"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Wed-EVE"
                            name="Wed-EVE"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Thu-EVE"
                            name="Thu-EVE"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Fri-EVE"
                            name="Fri-EVE"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Sat-EVE"
                            name="Sat-EVE"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="Sun-EVE"
                            name="Sun-EVE"
                          />
                        </FormGroup>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <SubmitFormApiMsgs submitFormApiErrorMsg={submitFormApiErrorMsg} submitFormApiSuccessMsg={submitFormApiSuccessMsg} />
                {/* <ErrorMessage name="availabilityTable" component={TextError} /> */}

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

export default MatchAvail;
