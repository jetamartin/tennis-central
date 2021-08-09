import React, { useState } from "react";
import { Card, Container, Col, Row, Table } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import { FormGroup, FormLabel, FormControl, FormCheck } from "react-bootstrap";
import * as Yup from "yup";
import "./PartnerCard.css";
const PartnerCard = ({ partner }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [partnerData, setPartnerData] = useState("");
  const {id, fullName, my_ntrp_rating, gender, match_availability, session_type, opponent_gender, max_travel_distance} = partner.partner;

  const initialValues = {};
  const validationSchema = Yup.object({
    // telNum: Yup.string().required("Required"),
    // email: Yup.string().email("Invalid email format").required("Required"),
  });
  const onSubmit = async (values, setSubmitting) => {};

  const editForm = async (e) => {
    // try {
    debugger;
    console.log("Edit contact info ");
    const partnerId = e.target.parentElement.dataset.id;
    console.log(partnerId);

    //   await TennisCentralAPI.addPartner(userInfo.userId, partnerId)
    //   updatePartnerStatus(partnerId);
    // } catch (error) {
    //   console.log("Add Partner error", error)
    // }
  };
  debugger;
  return (
    <Card className="mt-3 mb-3">
      <Card.Body>
        <div className="text-left">
          <Card.Title className="d-inline-block">{fullName}</Card.Title>
          <span className="float-right">{my_ntrp_rating}</span>
        </div>
        <hr></hr>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({
            values,
            isSubmitting,
            handleChange,
            setFieldValue,
            touched,
            errors,
          }) => {
            return (
              <Form className="mx-auto">
                {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
                <fieldset className="mb-3">
                  <legend>Contact Info</legend>
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
                    // className="btn btn-primary btn-lg btn-block mt-3 invisible"
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
        <fieldset className="mb-3">
          <legend>Player info</legend>
          <fieldset>
            <legend>Availability</legend>
          </fieldset>
          <Card.Text>
            Gender
          </Card.Text>
          <Card.Text>Match Type</Card.Text>
          <Card.Text>Session Types</Card.Text>

          {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text> */}
        </fieldset>

      </Card.Body>
    </Card>
  );
};

export default PartnerCard;
