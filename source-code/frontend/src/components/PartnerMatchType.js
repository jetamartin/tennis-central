import React from "react";
import { capitalize } from "lodash";

const PartnerMatchType = ({ matchType, index, length }) => {
  return (
    <span>
      <span className="match-type">{capitalize(matchType)}</span>
      <span>{(index + 1 < length) ? ", " : null}</span>
    </span>
  );
};

export default PartnerMatchType;
