import React, { useState, useEffect, useContext } from "react";
import PartnerAvailHours from "./PartnerAvailHours";

const PartnerAvailDays = ({ availability }) => {
  return (
    <div>
      <span className="avail-times">{availability.day}</span>
      <span className="separator">-</span>
      {availability.times.map((timeSlot, index) => (
        <PartnerAvailHours key={index} index={index} timeSlot={timeSlot} length={availability.times.length} />
      ))}
    </div>
  );
};
export default PartnerAvailDays;
