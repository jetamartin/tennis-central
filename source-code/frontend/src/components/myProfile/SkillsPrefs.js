import React, { useState, useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Container, Col, Row, Table } from "react-bootstrap";
import {
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
} from "react-bootstrap";
import UserContext from "../UserContext";
import "./SkillsPref.css";
import TextError from "../TextError";
import ErrorMsg from "../ErrorMsg";
import TennisCentralAPI from "../../TennisCentralAPI";
import isNil from "lodash/isNil";

const SkillsPrefs = ({ updateUserRecord }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({});
  const userInfo = useContext(UserContext);
  const [updateSkillsPrefFormErrorMsg, setUpdateSkillsPrefFormErrorMsg] =
    useState([]);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        let profileInfo = await TennisCentralAPI.getUserProfile(
          userInfo.userId
        );
        let opponentNtrpRatingRange = transformNtrpRatingRange(
          profileInfo.user.opponent_ntrp_rating_range
        );
        // debugger
        // if (isNil(profileInfo.user.my_ntrp_rating) ) profileInfo.user.my_ntrp_rating = "";
        setProfileData(
          Object.assign(profileInfo.user, opponentNtrpRatingRange)
        );

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadFormData();
  }, [userInfo]);

  const transformNtrpRatingRange = (ntrpRatingRange) => {
    let ntrpValues = {};
    if (! isNil(ntrpRatingRange)) {
      ntrpValues = {
        minNtrp: ntrpRatingRange.low,
        maxNtrp: ntrpRatingRange.high,
      };
    }

    return ntrpValues;
  };
  const initialValues = profileData;

  const validationSchema = Yup.object({
    minNtrp: Yup.number().required("Please select a minimum NTRP rating"),
    maxNtrp: Yup.number()
      .required("Please select a maximum NTRP rating")
      .moreThan(
        Yup.ref("minNtrp"),
        "Max NTRP rating must be higer than Min NTRP"
      ),
  });
  const transformNtrpValues = (values) => {
    if(isNil(values.minNtrp)) return {};
    return { low: values.minNtrp, high: values.maxNtrp };
  };

  const onSubmit = async (values, { setSubmitting, setFieldValue }) => {
    console.log("Form Values: ", values);
    values.opponent_ntrp_rating_range = transformNtrpValues(values);
    try {
      debugger;
      await updateUserRecord(values, userInfo.userId);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error)) {
        setUpdateSkillsPrefFormErrorMsg(error);
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
            <p className="font-weight-bold">Skills & Preferences</p>
            <p>
              <Link exact to="/SkillsPrefs">
                Match Availability
              </Link>
            </p>
          </div>
        </Col>
        <Col sm={10} className="pt-5">
          <h3 className="form-header">Skills & Preferences</h3>
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
                <fieldset>
                  <legend>Your skill level</legend>
                  <FormGroup>
                    What is your NTRP rating?
                    <div className="external-link">
                      <Link
                        to={{
                          pathname:
                            "https://www.usta.com/content/dam/usta/pdfs/NTRP%20General%20Characteristics.pdf",
                        }}
                        target="_blank"
                      >
                        ( How to determine your NTRP rating )
                      </Link>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Field
                      type="range"
                      name="my_ntrp_rating"
                      className="form-range"
                      id="my_ntrp_rating"
                      min="1.0"
                      max="7.0"
                      step=".5"
                    />
                    <div className="ntrp-num">
                      {values.my_ntrp_rating}
                    </div>
                  </FormGroup>
                </fieldset>

                <fieldset>
                  <legend>Match Types</legend>
                  <FormGroup id="checkbox-group">
                    Types of matches you'd consider playing?
                  </FormGroup>
                  <FormGroup role="group" aria-labelledby="checkbox-group">
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
                      <FormLabel className="form-check-label">Mixed</FormLabel>
                    </FormGroup>
                  </FormGroup>
                </fieldset>
                <fieldset>
                  <legend>Tennis Sessions</legend>
                  <FormGroup id="radio-group">
                    Types of sessions you'd consider?
                  </FormGroup>
                  <FormGroup role="group" aria-labelledby="checkbox-group">
                    <FormGroup className="form-check form-check-inline">
                      <Field
                        className="form-check-input"
                        type="radio"
                        name="session_type"
                        value="matches"
                      />
                      <FormLabel className="form-check-label">
                        Match/Set Play Only
                      </FormLabel>
                    </FormGroup>

                    <FormGroup className="form-check form-check-inline">
                      <Field
                        className="form-check-input"
                        type="radio"
                        name="session_type"
                        value="practice"
                      />
                      <FormLabel className="form-check-label">
                        Rallying/Drills Only
                      </FormLabel>
                    </FormGroup>

                    <FormGroup className="form-check form-check-inline">
                      <Field
                        className="form-check-input"
                        type="radio"
                        name="session_type"
                        value="either"
                      />
                      <FormLabel className="form-check-label">Either</FormLabel>
                    </FormGroup>
                  </FormGroup>
                </fieldset>
                <fieldset>
                  <legend>Opponent's Gender</legend>
                  <FormGroup id="radio-group">
                    Preferred gender of your opponent?
                  </FormGroup>
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
                </fieldset>

                <fieldset>
                  <legend>Partner's NTRP range</legend>
                  <FormGroup>
                    Select min and max NTRP rating for an opponent
                  </FormGroup>

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
                <fieldset>
                  <legend>Match Travel Distance</legend>
                  <FormGroup>
                    Maximum distance you'd travel for a match?
                  </FormGroup>
                  <FormGroup>
                    <Field
                      as="select"
                      name="max_travel_distance"
                      className="form-control"
                      id="travelDistance"
                    >
                      <option>Select Max Match Travel Distance</option>
                      <option value="5">less than 5 miles</option>
                      <option value="10">less than 10 miles</option>
                      <option value="15">less than 15 miles</option>
                      <option value="20">less than 20 miles</option>
                      <option value="30">less than 30 miles</option>
                      <option value="1000">No Limit</option>
                    </Field>
                  </FormGroup>
                  <ErrorMessage name="travelDistance" component={TextError} />
                </fieldset>
                <Button
                  type="submit"
                  // className="btn btn-primary mt-3 float-right"
                  className="btn btn-primary btn-lg btn-block mt-3"
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default SkillsPrefs;
