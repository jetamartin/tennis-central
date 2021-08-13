import React, { useState, useEffect, useContext } from "react";
import { Card, Container, Col, Row, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import { FormGroup, FormLabel, FormControl, FormCheck } from "react-bootstrap";
import * as Yup from "yup";
import "./PartnerCard.css";
import PartnerAvailDays from "./partnerSearch/PartnerAvailDays";
import PartnerMatchType from "./PartnerMatchType";
import TennisCentralAPI from "../TennisCentralAPI";
import UserContext from "./UserContext";
import { set } from "lodash";

const PartnerCard = ({ partner, deletePartner }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [partnerData, setPartnerData] = useState("");
  const { id, contact } = partner;

  // debugger;
  const {
    fullName,
    my_ntrp_rating,
    gender,
    match_availability,
    session_type,
    opponent_gender,
    max_travel_distance,
    match_type,
    email,
  } = partner.partner;

  const initialValues = contact;

  const validationSchema = Yup.object({
    // telNum: Yup.string().required("Required"),
    // email: Yup.string().email("Invalid email format").required("Required"),
  });

  const userInfo = useContext(UserContext);
  const userId = userInfo.userId;

  const constructContactObject = (values) => {
    return { contact: { telNum: values.telNum, email: values.email } };
  };

  // const handleSubmit = async (values, setSubmitting) => {
  const handleSubmit = async (e, { values }) => {
    const contactObj = constructContactObject(values);
    const partnerId = e.target.dataset.id;
    try {
      await TennisCentralAPI.updatePartnerTable(contactObj, userId, partnerId);
    } catch (error) {
      console.log(error);
    }
  };

  const removePartner = async (e) => {
    try {
      const partnerId = e.target.dataset.id;
      await deletePartner(partnerId);
    } catch (error) {
      console.log(error);
    }
  };

  // Supplemental feature not included:
  // User would click edit icon and that would make form editable
  const editForm = async (e) => {
    // try {
    // console.log("Edit contact info ");
    // const partnerId = e.target.parentElement.dataset.id;
    // console.log(partnerId);
    //   await TennisCentralAPI.addPartner(userInfo.userId, partnerId)
    //   updatePartnerStatus(partnerId);
    // } catch (error) {
    //   console.log("Add Partner error", error)
    // }
  };

  const transformAvailability = (match_availability) => {
    let avail = [];
    for (const day in match_availability) {
      avail.push({ day: day, times: match_availability[day] });
    }
    return avail;
  };

  const transformAvail = transformAvailability(match_availability);
  return (
    <Card className="mt-3 mb-3">
      <Card.Body>
        <div className="text-left">
          <Card.Title className="d-inline-block">{fullName}</Card.Title>
          <span className="float-right">
            <span>NTRP-</span>
            {my_ntrp_rating}
          </span>
        </div>
        {/* <hr></hr> */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          // onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            isSubmitting,
            handleChange,
            setFieldValue,
            touched,
            onSubmit,
            errors,
          }) => {
            console.log(values);
            return (
              <Form
                data-id={id}
                className="mx-auto"
                onSubmit={(e) => handleSubmit(e, { values })}
              >
                {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
                <fieldset className="mb-3">
                  <legend>Partner Contact</legend>
                  {/* <Row
                    data-id="1"
                    className="d-flex justify-content-end"
                    onClick={editForm}
                  >
                    <i class="bi bi-pencil-square active edit-icon"></i>
                  </Row> */}
                  <FormGroup className="row">
                    <FormLabel column sm="3" htmlFor="telNum">
                      Tel#
                    </FormLabel>
                    <Col sm={9}>
                      <Field
                        className="form-control"
                        id="telNum"
                        type="text"
                        name="telNum"
                        placeholder="818-222-4531"
                        // readOnly
                        // plaintext
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup className="row">
                    <FormLabel column sm="3" htmlFor="email">
                      Email
                    </FormLabel>
                    <Col sm={9}>
                      <Field
                        className="form-control"
                        id="email"
                        type="text"
                        name="email"
                        placeholder="jDoe@gmail.com"
                        // readOnly
                      />
                    </Col>
                  </FormGroup>
                  <Button
                    type="submit"
                    className="float-right"
                    variant="outline-primary"
                    size="sm"
                  >
                    Save
                  </Button>
                  {/* onClick={() => {doStuff(); submitForm() */}
                </fieldset>
              </Form>
            );
          }}
        </Formik>
        <fieldset className="mb-3">
          <legend>Partner info</legend>
          <Card.Text>
            <span className="player-info">Gender: </span>
            <span>{gender}</span>{" "}
          </Card.Text>
          <fieldset>
            <legend>Availability</legend>
            <div>
              {transformAvail.map((availability, index) => (
                <PartnerAvailDays key={id} availability={availability} />
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Partner Match Prefs</legend>
            <Card.Text>
              <span className="player-info">Opponent's Gender: </span>
              <span>{opponent_gender}</span>{" "}
            </Card.Text>
            <Card.Text>
              <span className="player-info">Match Type: </span>
              {match_type
                ? match_type.map((matchType, index) => (
                    <PartnerMatchType
                      key={id}
                      matchType={matchType}
                      index={index}
                      length={match_type.length}
                    />
                  ))
                : null}
            </Card.Text>
            <Card.Text>
              <span className="player-info">Session Types:</span>
              <span>{session_type}</span>{" "}
            </Card.Text>
          </fieldset>

          {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text> */}
        </fieldset>
        <Row>
          <Col className="d-flex justify-content-around">
                <a
                  href={`mailto:${email}`}
                  target='_blank'
                  className="btn btn-outline-primary btn-sm partner-btn"
                  data-id={id}
                >
                  <i className="bi bi-envelope partner-card-icon"></i>
                  Message
                </a>
          </Col>
          <Col className="d-flex justify-content-around">
            <div>
              <button
                className="btn btn-outline-danger btn-sm partner-btn"
                data-id={id}
                onClick={removePartner}
              >
                <i className="bi bi-person-x partner-card-icon"></i>
                Delete
              </button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PartnerCard;
