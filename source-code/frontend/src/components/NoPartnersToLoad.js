import React, { useContext } from "react";
import SubmitFormApiMsgs from "./SubmitFormApiMsgs";
import UserContext from "./UserContext";

const NoPartnersToLoad = ({ partners }) => {
  const userInfo = useContext(UserContext);
  // console.log("NoPartnersToLoad: ", userInfo?.token);

  function isObjectEmpty(value) {
    return (
      Object.prototype.toString.call(value) === "[object Object]" &&
      JSON.stringify(value) === "{}"
    );
  }
  // debugger
  return (
    <div>
      {/* Added this check to see if I could prevent message below from flashing up
          before partners are displayed...not working...will remove this check
       */}
      {isObjectEmpty(userInfo) && userInfo !== undefined ? null : (
        <div className="text-center">
          <p>Currently you have no players on your Partner's List.</p>
          <p>To add a partner go to Find-A-Partner and search for one</p>
        </div>
      )}
    </div>
  );
};

export default NoPartnersToLoad;
