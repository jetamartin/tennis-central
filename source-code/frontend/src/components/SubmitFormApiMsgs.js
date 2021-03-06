import React, { useState, useEffect, useContext } from "react";
import ErrorMsg from "./ErrorMsg";

const SubmitFormApiMsgs = ({submitFormApiErrorMsg, submitFormApiSuccessMsg=undefined }) => {
  return (
    <div>
      {submitFormApiErrorMsg.length !== 0
        ? submitFormApiErrorMsg.map((errorMsg, index) => (
            <ErrorMsg key={index} errorMsg={errorMsg} />
          ))
        : null}
      {(submitFormApiSuccessMsg !== undefined && submitFormApiSuccessMsg?.message !== "" ) ? (
        <div className="success-msg">{submitFormApiSuccessMsg.message}</div>
      ) :
        null
      }
    </div>
  );
};

export default SubmitFormApiMsgs;