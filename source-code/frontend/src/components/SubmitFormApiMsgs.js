import React, { useState, useEffect, useContext } from "react";
import ErrorMsg from "./ErrorMsg";

const SubmitFormApiMsgs = ({submitFormApiErrorMsg, submitFormApiSuccessMsg }) => {
  return (
    <>
      {submitFormApiErrorMsg.length !== 0
        ? submitFormApiErrorMsg.map((errorMsg) => (
            <ErrorMsg errorMsg={errorMsg} />
          ))
        : null}
      {submitFormApiSuccessMsg.message !== "" ? (
        <div className="success-msg">{submitFormApiSuccessMsg.message}</div>
      ) :
        null
      }
    </>
  );
};

export default SubmitFormApiMsgs;