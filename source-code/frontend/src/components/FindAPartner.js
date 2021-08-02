import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl, FormCheck } from "react-bootstrap";
import { Container, Col, Row, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as Yup from "yup";

import isNil from "lodash/isNil";
import TextError from "./TextError";
import ErrorMsg from "./ErrorMsg";
import "./FindAPartner.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { propTypes } from "react-bootstrap/esm/Image";
import TennisCentralAPI from "../TennisCentralAPI";
import UserContext from "./UserContext";

const FindAPartner = () => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [loadFromProfile, setLoadFromProfile] = useState(false);
  const [generalMatchPlay, setGeneralMatchPlay] = useState(false);
  const userInfo = useContext(UserContext);
  const initialValues = profileData;

  const validationSchema = Yup.object({
    partnerMatchType: Yup.string().required("Select a partner match type"),
    partnerGender: Yup.string().required("Please select a gender type"),
    matchType: Yup.string().required("Select the type of match"),
    // minNtrp: Yup.number().required("Please select a minimum NTRP rating"),
    // maxNtrp: Yup.number().required("Please select a maximum NTRP rating"),
    minNtrp: Yup.number().required("Please select a minimum NTRP rating"),
    maxNtrp: Yup.number()
      .required("Please select a maximum NTRP rating")
      .moreThan(
        Yup.ref("minNtrp"),
        "Max NTRP rating must be higer than Min NTRP"
      ),
  });

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

  const transformNtrpRatingRange = (ntrpRatingRange) => {
    let ntrpValues = {};
    ntrpValues = {
      minNtrp: ntrpRatingRange.low,
      maxNtrp: ntrpRatingRange.high,
    };
    return ntrpValues;
  };

  const loadfromProfile = async (e, value, setFieldValue) => {
    let data = await TennisCentralAPI.getUserProfile(userInfo.userId);
    let profileInfo = transformBuildMatchAvailObject(
      data.user.match_availability
    );
    let opponentNtrpRatingRange = transformNtrpRatingRange(
      data.user.opponent_ntrp_rating_range
    );
    setProfileData(
      Object.assign(
        data.user,
        profileInfo,
        opponentNtrpRatingRange,
        { partnerMatchType: "generalTime" },
        { loadProfileData: true }
      )
    );
  };

  const onSubmit = async (values, { setSubmitting }) => {
    values.dateAndTime = startDate;
    values.match_availability = buildMatchAvailObject(values);
    console.log(values.match_availability);
    // debugger;
    console.log("Form values:", values);
    setSubmitting(false);
  };
  if (isLoading) {
    return <p className="">Loading &hellip;</p>;
  }
  return (
    <Container className="h-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col sm={8} className="mx-auto form-border">
          <h1>Find-A-Partner</h1>
          <hr></hr>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ values, isSubmitting, handleChange, setFieldValue }) => (
              <Form className="mx-auto">
                {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
                <Col>
                  <fieldset>
                    <legend>Partner Match</legend>
                    <FormGroup className="form-group">
                      <FormGroup className="form-check form-check-inline">
                        <Field
                          className="form-check-input"
                          type="radio"
                          id="specificTime"
                          name="partnerMatchType"
                          value="specificTime"
                        />
                        <FormLabel className="form-check-label" htmlFor="male">
                          For a specific date and time
                        </FormLabel>
                      </FormGroup>
                      <FormGroup className="form-check form-check-inline">
                        <Field
                          className="form-check-input"
                          type="radio"
                          id="generalTime"
                          name="partnerMatchType"
                          value="generalTime"
                          onChange={(e) => {
                            handleChange(e);
                            // setGeneralMatchPlayValue(e);
                          }}
                        />
                        <FormLabel
                          className="form-check-label"
                          htmlFor="generalTime"
                        >
                          For general match play
                        </FormLabel>
                      </FormGroup>
                      <ErrorMessage
                        name="partnerMatchType"
                        component={TextError}
                      />
                    </FormGroup>
                  </fieldset>

                  {values.partnerMatchType === "specificTime" ? (
                    <fieldset>
                      <legend>Specific Date and Time Search</legend>
                      <FormGroup>
                        <FormLabel
                          className="datePickerLabel"
                          htmlFor="dateAndTime"
                        >
                          Match Date/Time
                        </FormLabel>
                        <DatePicker
                          // <Field
                          className="form-control"
                          type="datetime-local"
                          id="dateAndTime"
                          name="dateAndTime"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          // values={values.startDate}
                          showTimeSelect
                          dateFormat="MMMM d, yyyy h:mm aa"
                        />
                        <ErrorMessage
                          name="dateAndTime"
                          component={TextError}
                        />
                      </FormGroup>
                      {/* <FormGroup>
                        <FormLabel>Match Type</FormLabel>
                        <Field
                          as="select"
                          name="matchType"
                          className="form-control"
                          id="matchType"
                        >
                          <option>Select Match Type</option>
                          <option value="singles">Singles</option>
                          <option value="doubles">Doubles</option>
                          <option value="mixed">Mixed Doubles</option>
                        </Field>
                      </FormGroup>
                      <ErrorMessage name="matchType" component={TextError} /> */}

                      {/* <FormGroup className="form-group">
                        <div className="custom-form-label">Partner Gender</div>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="radio"
                            id="male"
                            name="partnerGender"
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
                            name="partnerGender"
                            value="Female"
                          />
                          <FormLabel
                            className="form-check-label"
                            htmlFor="female"
                          >
                            Female
                          </FormLabel>
                        </FormGroup>
                        <FormGroup className="form-check form-check-inline">
                          <Field
                            className="form-check-input"
                            type="radio"
                            id="eitherGender"
                            name="partnerGender"
                            value="eitherGender"
                          />
                          <FormLabel
                            className="form-check-label"
                            htmlFor="eitherGender"
                          >
                            Either Gender
                          </FormLabel>
                        </FormGroup>
                        <ErrorMessage
                          name="partnerGender"
                          component={TextError}
                        />
                      </FormGroup> */}
                      <fieldset>
                        <legend>Match Type</legend>
                        <FormGroup
                          role="group"
                          aria-labelledby="checkbox-group"
                        >
                          <FormGroup className="form-check form-check-inline">
                            <Field
                              className="form-check-input"
                              type="checkbox"
                              name="match_type"
                              value="singles"
                            />
                            <FormLabel className="form-check-label">
                              Singles
                            </FormLabel>
                          </FormGroup>

                          <FormGroup className="form-check form-check-inline">
                            <Field
                              className="form-check-input"
                              type="checkbox"
                              name="match_type"
                              value="doubles"
                            />
                            <FormLabel className="form-check-label">
                              Doubles
                            </FormLabel>
                          </FormGroup>

                          <FormGroup className="form-check form-check-inline">
                            <Field
                              className="form-check-input"
                              type="checkbox"
                              name="match_type"
                              value="mixed"
                            />
                            <FormLabel className="form-check-label">
                              Mixed
                            </FormLabel>
                          </FormGroup>
                        </FormGroup>
                      </fieldset>
                      <ErrorMessage name="matchType" component={TextError} />

                      <fieldset>
                        <legend>Opponent's Gender</legend>
                        <FormGroup id="radio-group">
                          {/* <FormLabel>Preffered Gender of Opponent</FormLabel> */}
                          <FormGroup role="group" aria-labelledby="radio-group">
                            <FormGroup className="form-check form-check-inline">
                              <Field
                                className="form-check-input"
                                type="radio"
                                name="opponent_gender"
                                value="Male only"
                              />
                              <FormLabel className="form-check-label">
                                Male only
                              </FormLabel>
                            </FormGroup>

                            <FormGroup className="form-check form-check-inline">
                              <Field
                                className="form-check-input"
                                type="radio"
                                name="opponent_gender"
                                value="Female only"
                              />
                              <FormLabel className="form-check-label">
                                Female only
                              </FormLabel>
                            </FormGroup>

                            <FormGroup className="form-check form-check-inline">
                              <Field
                                className="form-check-input"
                                type="radio"
                                name="opponent_gender"
                                value="Either gender"
                              />
                              <FormLabel className="form-check-label">
                                Either gender
                              </FormLabel>
                            </FormGroup>
                          </FormGroup>
                          <ErrorMessage
                            name="partnerGender"
                            component={TextError}
                          />
                        </FormGroup>
                      </fieldset>
                      <fieldset>
                        <legend>Partner's NTRP range</legend>
                        <FormGroup>
                          <FormLabel className="ntrpLabel" htmlFor="minNtrp">
                            Min NTRP rating
                          </FormLabel>
                          <Field
                            type="range"
                            name="minNtrp"
                            className="form-range"
                            id="minNtrp"
                            min="1.0"
                            max="7.0"
                            step=".5"
                          />
                          {JSON.stringify(values.minNtrp)}
                        </FormGroup>
                        <ErrorMessage name="minNtrp" component={TextError} />
                        <FormGroup>
                          <FormLabel className="ntrpLabel" htmlFor="maxNtrp">
                            Max NTRP rating
                          </FormLabel>

                          <Field
                            type="range"
                            name="maxNtrp"
                            className="form-range"
                            id="maxNtrp"
                            min="1.0"
                            max="7.0"
                            step=".5"
                          />
                          {JSON.stringify(values.maxNtrp)}
                        </FormGroup>
                        <ErrorMessage name="maxNtrp" component={TextError} />
                      </fieldset>
                    </fieldset>
                  ) : null}
                  {/* {(!isLoading) ?  */}
                  {values.partnerMatchType === "generalTime" ? (
                    <fieldset>
                      <legend>General Match Availability</legend>
                      <FormGroup className="form-check form-check-inline">
                        <Field
                          className="form-check-input"
                          type="checkbox"
                          id="loadProfileData"
                          name="loadProfileData"
                          onChange={(e) => {
                            handleChange(e);
                            loadfromProfile(e, "generalTime", setFieldValue);
                          }}
                        />
                        <FormLabel
                          className="form-check-label"
                          htmlFor="loadProfileData"
                        >
                          Load using current Profile Match Availability data
                        </FormLabel>
                      </FormGroup>
                      <FormGroup>
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
                        <ErrorMessage
                          name="availabilityTable"
                          component={TextError}
                        />
                      </FormGroup>

                      {/****************************************************************/}

                      <fieldset>
                        <legend>Match Type</legend>
                        <FormGroup
                          role="group"
                          aria-labelledby="checkbox-group"
                        >
                          <FormGroup className="form-check form-check-inline">
                            <Field
                              className="form-check-input"
                              type="checkbox"
                              name="match_type"
                              value="singles"
                            />
                            <FormLabel className="form-check-label">
                              Singles
                            </FormLabel>
                          </FormGroup>

                          <FormGroup className="form-check form-check-inline">
                            <Field
                              className="form-check-input"
                              type="checkbox"
                              name="match_type"
                              value="doubles"
                            />
                            <FormLabel className="form-check-label">
                              Doubles
                            </FormLabel>
                          </FormGroup>

                          <FormGroup className="form-check form-check-inline">
                            <Field
                              className="form-check-input"
                              type="checkbox"
                              name="match_type"
                              value="mixed"
                            />
                            <FormLabel className="form-check-label">
                              Mixed
                            </FormLabel>
                          </FormGroup>
                        </FormGroup>
                      </fieldset>
                      <ErrorMessage name="matchType" component={TextError} />

                      <fieldset>
                        <legend>Opponent's Gender</legend>
                        <FormGroup id="radio-group">
                          {/* <FormLabel>Preffered Gender of Opponent</FormLabel> */}
                          <FormGroup role="group" aria-labelledby="radio-group">
                            <FormGroup className="form-check form-check-inline">
                              <Field
                                className="form-check-input"
                                type="radio"
                                name="opponent_gender"
                                value="Male only"
                              />
                              <FormLabel className="form-check-label">
                                Male only
                              </FormLabel>
                            </FormGroup>

                            <FormGroup className="form-check form-check-inline">
                              <Field
                                className="form-check-input"
                                type="radio"
                                name="opponent_gender"
                                value="Female only"
                              />
                              <FormLabel className="form-check-label">
                                Female only
                              </FormLabel>
                            </FormGroup>

                            <FormGroup className="form-check form-check-inline">
                              <Field
                                className="form-check-input"
                                type="radio"
                                name="opponent_gender"
                                value="Either gender"
                              />
                              <FormLabel className="form-check-label">
                                Either gender
                              </FormLabel>
                            </FormGroup>
                          </FormGroup>
                          <ErrorMessage
                            name="partnerGender"
                            component={TextError}
                          />
                        </FormGroup>
                      </fieldset>
                      <fieldset>
                        <legend>Partner's NTRP range</legend>
                        <FormGroup>
                          <FormLabel className="ntrpLabel" htmlFor="minNtrp">
                            Min NTRP rating
                          </FormLabel>
                          <Field
                            type="range"
                            name="minNtrp"
                            className="form-range"
                            id="minNtrp"
                            min="1.0"
                            max="7.0"
                            step=".5"
                          ></Field>
                          {JSON.stringify(values.minNtrp)}
                        </FormGroup>
                        <ErrorMessage name="minNtrp" component={TextError} />

                        <FormGroup>
                          <FormLabel className="ntrpLabel" htmlFor="maxNtrp">
                            Max NTRP rating
                          </FormLabel>

                          <Field
                            type="range"
                            name="maxNtrp"
                            className="form-range"
                            id="maxNtrp"
                            min="1.0"
                            max="7.0"
                            step=".5"
                          ></Field>
                          {JSON.stringify(values.maxNtrp)}
                        </FormGroup>
                        <ErrorMessage name="maxNtrp" component={TextError} />
                      </fieldset>
                    </fieldset>
                  ) : null}
                  {/* // ) : null} */}
                </Col>

                {/* {loginErrorFormMsg.length !== 0 ? 
                loginErrorFormMsg.map(errorMsg => <ErrorMsg errorMsg={errorMsg} />)
               : null } */}
                <Button
                  type="submit"
                  // className="btn btn-primary mt-3 float-right"
                  className="btn btn-primary btn-lg btn-block mt-3"
                >
                  Search
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default FindAPartner;
