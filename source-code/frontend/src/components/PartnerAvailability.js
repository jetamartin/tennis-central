import React, { useState, useEffect, useContext } from "react";
import PartnerAvailTimes from "./PartnerAvailTimes";

const PartnerAvailability = ({ availability }) => {
  console.log("AVAIL ====> ", availability);
  debugger;
  return (
    <div>
      <span className="avail-times">{availability.day}</span>
      <span className="separator">-</span>
      {availability.times.map((timeSlot, index) => (
        <PartnerAvailTimes key={index} timeSlot={timeSlot} />
      ))}
    </div>
  );
};
export default PartnerAvailability;
