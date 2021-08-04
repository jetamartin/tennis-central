import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl, FormCheck } from "react-bootstrap";
import { Container, Col, Row, Table } from "react-bootstrap";
import PartnerSearchResultsRow from "./PartnerSearchResultsRow";
import "./PartnerSearchResultsTable.css";

const PartnerSearchResultsTable = ({ partnerMatches }) => {
  const [matchingPartners, setMatchingPartners] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(true);



  const searchPartners = async () => {
    const partnerSearchResults = partnerMatches;
    setMatchingPartners(partnerSearchResults);
    setIsSearchLoading(false);
  };

  const deleteSearchResultItem = (e) => {
    debugger;
    // "e.target.parentElement.parentElement.parentElement.dataset.partneruserid"
    console.log("Delete Search Result Item");
  };

  if (isSearchLoading)
    return (
      <Container>
        <Row className="h-100 justify-content-center align-items-center">
          <Col sm={10} className="mx-auto form-border">
            <h3>Search Results</h3>
            <Table striped responsive="sm">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Availability</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {partnerMatches.map((partnerMatch) => (
                  <PartnerSearchResultsRow
                    key={partnerMatch.id}
                    partnerMatch={partnerMatch}
                  />
                ))}
 
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
};

export default PartnerSearchResultsTable;
