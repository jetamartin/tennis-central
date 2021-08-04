import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Col, Row, Table } from "react-bootstrap";
import "./PartnerSearchResultsTable.css";
import PartnerAvailability from "./PartnerAvailability";
import { daysInWeek } from "date-fns";

const PartnerSearchResultsRow = ({partnerMatch}) => {

  const {id, date, name, gender, match_availability, status} = partnerMatch;
  console.log("Match Availability: ", match_availability)
  
  const deleteSearchResultItem = (e) => {
     // "e.target.parentElement.parentElement.parentElement.dataset.partneruserid"
    console.log('Delete Search Result Item');
  }

  // console.log("Match Availability: ", match_availability);
  const transformAvailability = (match_availability) => {
    let avail = []
    for (const day in match_availability) {
      console.log(`${day}: ${match_availability[day]}`);
      avail.push({day: day, times: match_availability[day]})
    }
    return avail
  }
  const transformAvail = transformAvailability(match_availability);
  // console.log(transformAvail)
  
  return (
    <>
    <tr data-partneruserid={id}>
    <td>{date}</td>
    <td>{name}</td>
    <td>{gender}</td>
    <td className="partner-avail">
      {transformAvail.map((availability, index) => (
        <PartnerAvailability key={index} availability={availability} />
      ))}
    </td>

    <td>{partnerMatch.status}</td>
    <td className="icon-group icon-norm">
      <div className="icon-spacing">
        <Link to="/messages">
          <i className="bi bi-envelope"></i>
        </Link>
      </div>
      <div className="icon-spacing">
        <Link to="/partners">
          <i className="bi bi-person-plus icon-spacing"></i>
        </Link>
      </div>
      <div className="icon-spacing">
        <i className="bi bi-trash icon-danger icon-spacing" onClick={deleteSearchResultItem}></i>
      </div>
    </td>
  </tr>
  </>
  );
}

export default PartnerSearchResultsRow;