import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Col, Row, Table } from "react-bootstrap";
import "./PartnerSearchResultsTable.css";
import PartnerAvailDays from "./PartnerAvailDays";
import { daysInWeek } from "date-fns";

const PartnerSearchResultsRow = ({partnerMatch, removePartnerSearchResult}) => {

  const {id, date, fullName, my_ntrp_rating, gender, match_availability, status} = partnerMatch;
    
  // const deleteSearchResultItem = (e) => {
  //   debugger
  //    // "e.target.parentElement.parentElement.parentElement.dataset.partneruserid"
  //   console.log('Delete Search Result Item');
  // }

  const createDate = () => {
    const date = new Date();
    return (new Intl.DateTimeFormat().format(date));
  }
  
  const transformAvailability = (match_availability) => {
    let avail = []
    for (const day in match_availability) {
      avail.push({day: day, times: match_availability[day]})
    }
    return avail
  }
  const transformAvail = transformAvailability(match_availability);
    
  return (
    <>
    <tr data-id={id}>
    <td>{createDate()}</td>
    <td>{fullName}</td>
    <td>{my_ntrp_rating}</td>
    <td>{gender}</td>
    <td className="partner-avail1">
      <div >
      {transformAvail.map((availability, index) => (
        <PartnerAvailDays key={index} availability={availability} />
      ))}
      </div>
    </td>

    <td>New</td>
    <td className="icon-group icon-norm">
      <div  className="icon-spacing" data-id={id}>
        <Link to="/messages">
          <i className="bi bi-envelope"></i>
        </Link>
      </div>
      <div  className="icon-spacing" data-id={id}>
        <Link to="/partners">
          <i className="bi bi-person-plus icon-spacing"></i>
        </Link>
      </div>
      <div  className="icon-spacing" data-id={id}>
        <i className="bi bi-trash icon-danger icon-spacing" onClick={removePartnerSearchResult}></i>
      </div>
    </td>
  </tr>
  </>
  );
}

export default PartnerSearchResultsRow;