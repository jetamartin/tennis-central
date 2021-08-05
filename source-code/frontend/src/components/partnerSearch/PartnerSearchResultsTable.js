import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel, FormControl, FormCheck } from "react-bootstrap";
import { Container, Col, Row, Table } from "react-bootstrap";
import PartnerSearchResultsRow from "./PartnerSearchResultsRow";
import "./PartnerSearchResultsTable.css";

const PartnerSearchResultsTable = ({ matchingPartners, updateMatchingPartners }) => {

  // const [matchingPartners, setMatchingPartners] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(true);

// Removes array element at indexValue and returns resulting array
function arrayRemove(arr, indexValue) { 
  return arr.filter(function(ele, index){ 
      return indexValue != index; 
  });
}
  // Removes the partner from partner search results when the user clicks the trashcan icon
  const removePartnerSearchResult = (e) => {
    debugger;

    // Get the id of the partner search result element to be deleted
    const partnerId = e.target.parentElement.dataset.id;

    // Using the id find the index of the array item to be removed
    const partnerArryIndex = matchingPartners.findIndex(partner => partner.id === +partnerId);

    // Remove the selected partner record for deletion from original matched partners list 
    const newPartnerMatches = arrayRemove(matchingPartners, partnerArryIndex);

    // Update the MatchingPartners list less the removed partner..this should trigger a re-render of the 
    updateMatchingPartners(newPartnerMatches);
  };

  // const searchPartners = async () => {
  //   debugger;
  //   const partnerSearchResults = matchingPartners;
  //   setMatchingPartners(partnerSearchResults);
  //   setIsSearchLoading(false);
  // };

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
                  <th scope="col">NTRP</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Availability</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {matchingPartners.map((matchingPartner) => (
                  <PartnerSearchResultsRow
                    key={matchingPartner.id}
                    partnerMatch={matchingPartner}
                    removePartnerSearchResult={removePartnerSearchResult}
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