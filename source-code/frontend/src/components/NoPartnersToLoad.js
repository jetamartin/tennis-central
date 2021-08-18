import React from "react";
import SubmitFormApiMsgs from "./SubmitFormApiMsgs";

const NoPartnersToLoad = ({ submitFormApiErrorMsg, submitFormApiSuccessMsg}) => {
  debugger
  return (
    <>
      <div className="text-center">
        <p>Currently you have no players on your Partner's List.</p>
        <p>To add a partner go to Find-A-Partner and search for one</p>
      </div>
      {/* {submitFormApiErrorMsg.length > 0 ? (
        <SubmitFormApiMsgs
          submitFormApiErrorMsg={submitFormApiErrorMsg}
          // submitFormApiSuccessMsg={submitFormApiSuccessMsg}
        />
      ) : 
        <div>
          <p>You don't have any partners at this momement.</p>
          <p>To add a partner go to Find-A-Partner and search for one</p>
        </div>
      } */}
    </>
  );
};

export default NoPartnersToLoad;
