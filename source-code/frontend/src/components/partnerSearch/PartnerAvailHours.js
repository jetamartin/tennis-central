import React from "react";

const PartnerAvailHours = ({timeSlot, index, length}) => {
return (
  <>
    <span className="time-slots">
      {timeSlot}
    </span>
    <span>
    {(index + 1 < length ? ", " : null)}
    </span>
  </>
)
}
export default PartnerAvailHours;