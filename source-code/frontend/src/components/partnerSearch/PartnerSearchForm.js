import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl, FormCheck } from "react-bootstrap";
import { Container, Col, Row, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as Yup from "yup";

import isNil from "lodash/isNil";
import inRange from "lodash/inRange";

import TextError from "../TextError";
import ErrorMsg from "../ErrorMsg";
import "./PartnerSearchForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { propTypes } from "react-bootstrap/esm/Image";
import TennisCentralAPI from "../../TennisCentralAPI";
import UserContext from "../UserContext";
import PartnerSearchResultsTable from "./PartnerSearchResultsTable";

const FindAPartner = () => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const [generalMatchPlay, setGeneralMatchPlay] = useState(false);
  const [displaySearchResults, setDisplaySearchResults] = useState(false);
  const [matchingPartners, setMatchingPartners] = useState([]);
  const userInfo = useContext(UserContext);
  

  // const partnerMatches = [
  //   {
  //     id: "1",
  //     date: "08/03/2021",
  //     fullName: "Jason Davis",
  //     my_ntrp_rating: "4.5",
  //     gender: "male",
  //     match_availability: {
  //       Mon: ["eAM", "PM", "EVE"],
  //       Tue: ["PM", "EVE"],
  //       Sat: ["AM", "PM", "EVE"],
  //       Sun: ["AM", "PM"],
  //     },
  //     status: "New",
  //   },
  //   {
  //     id: "2",
  //     date: "08/03/2021",
  //     fullName: "Rich Bronson",
  //     my_ntrp_rating: "4.5",
  //     gender: "male",
  //     match_availability: {
  //       Sat: ["AM", "PM", "EVE"],
  //       Sun: ["AM", "PM"],
  //     },
  //     status: "New",
  //   },
  // ];

  const initialValues = profileData;

  // Some problem with validation rule
  const validationSchema = Yup.object({
    // partnerMatchType: Yup.string().required("Select a partner match type"),
    // partnerGender: Yup.string().required("Please select a gender type"),
    // matchType: Yup.string().required("Select the type of match"),
    // // minNtrp: Yup.number().required("Please select a minimum NTRP rating"),
    // // maxNtrp: Yup.number().required("Please select a maximum NTRP rating"),
    // minNtrp: Yup.number().required("Please select a minimum NTRP rating"),
    // maxNtrp: Yup.number()
    //   .required("Please select a maximum NTRP rating")
    //   .moreThan(
    //     Yup.ref("minNtrp"),
    //     "Max NTRP rating must be higer than Min NTRP"
    //   ),
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
    debugger;
    let ntrpValues = {};
    if (ntrpRatingRange) {
      ntrpValues = {
        minNtrp: ntrpRatingRange.low,
        maxNtrp: ntrpRatingRange.high,
      };
    }
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

  const fallsWithinRange = (currUserNtrpRating, opponentNtrpRating, ntrpRange) => {
    const withinRangeCriteria = .5;
    const highNtrpRange = ntrpRange.high + 5

    // if no ntrpRange provided then we check to see if user ntrp rating is within an acceptable range of opponents ntrp range 
    if (!ntrpRange) {
      if (Math.abs(currUserNtrpRating - opponentNtrpRating) <= withinRangeCriteria ) return true
    }  else {  // user provided a ntrp range for their opponent..check to see if opponents ntrp rating falls within range
      return inRange(opponentNtrpRating, ntrpRange.low, highNtrpRange); 
    }
  }

  const ntrpRatingCompatible = (currUser, potentialPartner) => {
    const matchCriteria = .5
    let match = false;
    /* Compatibility rules: NOTE these rules below are currently single sided (validation done from currUser's perspective)
      1 - if user didn't provide their rating OR potential partner didn't provide their rating then MATCH = FALSE;
      2 - if user didn't provide an opponent rating range and potential partner didn't provide a opponent rating range
          AND if users & partners rating within .5 NTRP points then MATCH = TRUE; 
      3 - if user did provide a rating range AND potential partner's rating falls within the range then MATCH = TRUE;
    */ 
    // Rule #1
    if (isNil(currUser.my_ntrp_rating) || isNil(currUser.my_ntrp_rating )) return false;

    // Rule #2
    if (isNil(currUser.opponent_ntrp_rating_range) && isNil(potentialPartner.opponent_ntrp_rating_range)) {
      return fallsWithinRange(currUser.my_ntrp_rating, potentialPartner.my_ntrp_rating, null);
    }

    if (currUser.opponent_ntrp_rating_range && fallsWithinRange(currUser.my_ntrp_rating, potentialPartner.my_ntrp_rating, currUser.opponent_ntrp_rating_range)) {
      return true;
    } 
    return false;
  }

  const matchPartners = (currUser, potentialPartners) => {
    return potentialPartners.map((potentialPartner) => {
      if ( ntrpRatingCompatible(currUser, potentialPartner) ) {
        return potentialPartner;
      }

    })
  }
  const idPotentialPartners = (users) => {
    const potentialPartners = users.filter(user => user.id !== userInfo.userId)
    const currUser = users.filter(user => user.id === userInfo.userId )[0];
    debugger; 
    return matchPartners(currUser, potentialPartners);
  
  }

  const updateMatchingPartners = (partners) => {
    setMatchingPartners(partners); 
  }

  const onSubmit = async (values, { setSubmitting }) => {
    values.dateAndTime = startDate;
    values.match_availability = buildMatchAvailObject(values);

    // Retrieve all users from DB
    const allUsers = await TennisCentralAPI.getAllUsers();

    // Determine which users are potential partner matches and set them 
    setMatchingPartners(idPotentialPartners(allUsers.users));

    // Set state variable to display results table with results
    setDisplaySearchResults(true);
    
    setSubmitting(false);
  };

  if (isLoading) {
    return <p className="">Loading &hellip;</p>;
  }
  return (
    <>
      <Container className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <Col sm={10} className="mx-auto form-border">
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
                          <FormLabel
                            className="form-check-label"
                            htmlFor="male"
                          >
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
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                          />
                          <ErrorMessage
                            name="dateAndTime"
                            component={TextError}
                          />
                        </FormGroup>

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
                            <FormGroup
                              role="group"
                              aria-labelledby="radio-group"
                            >
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
                            <FormGroup
                              role="group"
                              aria-labelledby="radio-group"
                            >
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
          {console.log('Partner Matches: ', matchingPartners)}
          {displaySearchResults ? (

            <PartnerSearchResultsTable matchingPartners={matchingPartners} updateMatchingPartners={updateMatchingPartners} />
          ) : null}
        </Row>
      </Container>
    </>
  );
};

export default FindAPartner;
