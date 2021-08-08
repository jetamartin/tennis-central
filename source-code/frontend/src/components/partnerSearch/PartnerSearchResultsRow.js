import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Col, Row, Table } from "react-bootstrap";
import "./PartnerSearchResultsTable.css";
import PartnerAvailDays from "./PartnerAvailDays";
import { daysInWeek } from "date-fns";
import UserContext from "../UserContext";
import TennisCentralAPI from "../../TennisCentralAPI";

const PartnerSearchResultsRow = ({partnerMatch, removePartnerSearchResult, updatePartnerStatus}) => {

  const {id, date, fullName, my_ntrp_rating, gender, match_availability, status} = partnerMatch;
  const userInfo = useContext(UserContext);   


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

  const addPartner = async (e) => {
    try {
      const partnerId = e.target.parentElement.dataset.id; 
      await TennisCentralAPI.addPartner(userInfo.userId, partnerId)
      updatePartnerStatus(partnerId);   
    } catch (error) {
      console.log("Add Partner error", error)
    }
  }
    
  return (
    <>
    <tr data-id={id}>
    <td>{createDate()}</td>
    {status === "Current" ?
      <td><Link to="/partners">{fullName}</Link></td>
    : <td>{fullName}</td>
    }
  
    <td>{my_ntrp_rating}</td>
    <td>{gender}</td>
    <td className="partner-avail1">
      <div >
      {transformAvail.map((availability, index) => (
        <PartnerAvailDays key={index} availability={availability} />
      ))}
      </div>
    </td>

    <td>{status}</td>
    <td className="icon-group icon-norm">
      <div  className="icon-spacing" data-id={id}>
        <Link to="/messages">
          <i className="bi bi-envelope"></i>
        </Link>
      </div>
      <div  className="icon-spacing" data-id={id} >
        {status === "Current" ? 
          <i className="bi bi-person-plus icon-spacing inactive" ></i>
        : 
        <i className="bi bi-person-plus icon-spacing active"  onClick={addPartner} ></i>
        }
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