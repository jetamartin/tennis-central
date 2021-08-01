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

const MatchAvail = ({ updateUserRecord }) => {
  const [profileData, setProfileData] = useState({});
  const [updateMatchAvailFormErrorMsg, setUpdateMatchAvailFormErrorMsg] =
    useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = useContext(UserContext);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        let data = await TennisCentralAPI.getUserProfile(userInfo.userId);
        let profileData = transformBuildMatchAvailObject(
          data.user.match_availability
        );
        setProfileData(profileData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
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
    // debugger;
    try {
      // debugger;
      await updateUserRecord(values, userInfo.userId);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error)) {
        setUpdateMatchAvailFormErrorMsg(error);
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
                <pre>{JSON.stringify(values, null, 4)}</pre>
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
                            id="mon-EAM"
                            name="mon-EAM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="tue-EAM"
                            name="tue-EAM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="wed-EAM"
                            name="wed-EAM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="thu-EAM"
                            name="thu-EAM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="fri-EAM"
                            name="fri-EAM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="sat-EAM"
                            name="sat-EAM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="sun-EAM"
                            name="sun-EAM"
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
                            id="mon-AM"
                            name="mon-AM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="tue-AM"
                            name="tue-AM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="wed-AM"
                            name="wed-AM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="thu-AM"
                            name="thu-AM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="fri-AM"
                            name="fri-AM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="sat-AM"
                            name="sat-AM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="sun-AM"
                            name="sun-AM"
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
                            id="mon-PM"
                            name="mon-PM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="tue-PM"
                            name="tue-PM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="wed-PM"
                            name="wed-PM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="thu-PM"
                            name="thu-PM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="fri-PM"
                            name="fri-PM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="sat-PM"
                            name="sat-PM"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="sun-PM"
                            name="sun-PM"
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
                            id="mon-EVE"
                            name="mon-EVE"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="tue-EVE"
                            name="tue-EVE"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="wed-EVE"
                            name="wed-EVE"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="thu-EVE"
                            name="thu-EVE"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="fri-EVE"
                            name="fri-EVE"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="sat-EVE"
                            name="sat-EVE"
                          />
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            id="sun-EVE"
                            name="sun-EVE"
                          />
                        </FormGroup>
                      </td>
                    </tr>
                  </tbody>
                </Table>
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
