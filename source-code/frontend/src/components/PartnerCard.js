import React, { useState, useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { Button } from "react-bootstrap";
import { FormGroup, FormLabel } from "react-bootstrap";
import * as Yup from "yup";
import "./PartnerCard.css";
import PartnerAvailDays from "./partnerSearch/PartnerAvailDays";
import PartnerMatchType from "./PartnerMatchType";
import UserContext from "./UserContext";

const validationSchema = Yup.object({
  // telNum: Yup.string().required("Required"),
  // email: Yup.string().email("Invalid email format").required("Required"),
});

const constructContactObject = (values) => {
  return { contact: { telNum: values.telNum, email: values.email } };
};

const PartnerCard = ({ partner, deletePartner, updatePartnerContact }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [partnerData, setPartnerData] = useState("");
  const { id: partnerId, contact } = partner;

  const [profileData, setProfileData] = useState({});
  const [startDate, setStartDate] = useState();

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
  const userInfo = useContext(UserContext);
  const userId = userInfo.userId;

  const handleSubmit = async (values, setSubmitting) => {
    const contactObj = constructContactObject(values);
    try {
      await updatePartnerContact(contactObj, userId, partnerId);
    } catch (error) {}
  };

  const removePartner = async (e) => {
    try {
      // const partnerId = id;
      await deletePartner(partnerId);
    } catch (error) {}
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
          onSubmit={handleSubmit}
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
            return (
              <Form className="mx-auto">
                {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
                <fieldset className="mb-3 reset-this redo-fieldset col-md-11">
                  <legend className="reset-this redo-legend">
                    Partner Contact
                  </legend>
                  <FormGroup className="row">
                    <FormLabel column sm="3" htmlFor="telNum">
                      Tel#
                    </FormLabel>
                    <Col sm={9}>
                      <Field
                        type="tel"
                        className="form-control"
                        id="telNum"
                        type="text"
                        name="telNum"
                        placeholder="818-222-4531"
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
                </fieldset>
              </Form>
            );
          }}
        </Formik>
        <fieldset className="mb-3 reset-this redo-fieldset col-md-11">
          <legend className="reset-this redo-legend">Partner info</legend>
          <Card.Text>
            <span className="player-info">Gender: </span>
            <span>{gender}</span>{" "}
          </Card.Text>
          <fieldset className="reset-this redo-fieldset col-md-11">
            <legend className="reset-this redo-legend">Availability</legend>
            <div>
              {transformAvail.map((availability, index) => (
                <PartnerAvailDays key={index} availability={availability} />
              ))}
            </div>
          </fieldset>
          <fieldset className="reset-this redo-fieldset col-md-11">
            <legend className="reset-this redo-legend">
              Partner Match Prefs
            </legend>
            <Card.Text>
              <span className="player-info">Opponent's Gender: </span>
              <span>{opponent_gender}</span>{" "}
            </Card.Text>
            <Card.Text>
              <span className="player-info">Match Type: </span>
              {match_type
                ? match_type.map((matchType, index) => (
                    <PartnerMatchType
                      key={index}
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
        </fieldset>
        <Row>
          <Col className="d-flex justify-content-around">
            <a
              href={`mailto:${email}`}
              target="_blank"
              className="btn btn-outline-primary btn-sm partner-btn"
              // data-id={id}
            >
              <i className="bi bi-envelope partner-card-icon"></i>
              Message
            </a>
          </Col>
          <Col className="d-flex justify-content-around">
            <div>
              <button
                className="btn btn-outline-danger btn-sm partner-btn"
                // data-id={id}
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
