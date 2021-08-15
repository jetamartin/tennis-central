import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";

import UserContext from "./UserContext";
import TennisCentralAPI from "../TennisCentralAPI";
import isNil from "lodash/isNil";
import PartnerCard from "./PartnerCard";
import { isEmpty, set } from "lodash";

import NoPartnersToLoad from "./NoPartnersToLoad";
import SubmitFormApiMsgs from "./SubmitFormApiMsgs";

const PartnerList = () => {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // State & vars associated with displaying and hiding API Error & Success Msgs arrising from submission of form
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [submitFormApiErrorMsg, setSubmitFormApiErrorMsg] = useState([]);
  const [submitFormApiSuccessMsg, setSubmitFormApiSuccessMsg] = useState({
    message: "",
  });
  const success = "Data was successfully updated";

  const [loadFormApiErrorMsg, setLoadFormApiErrorMsg] = useState([]);
  const [loadFormApiSuccessMsg, setLoadFormApiSuccessMsg] = useState({
    message: "",
  });

  useEffect(() => {
    // Only need to set timer to automatically remove success msg submission was a success if not don't set timer
    if (submitFormApiErrorMsg.length === 0) {
      setTimeout(() => setSubmitFormApiSuccessMsg({ message: "" }), 3000);
    }
  }, [dataSubmitted]);

  // -------------------------------------------------------------------

  const userInfo = useContext(UserContext);
  const userId = userInfo.userId;
  console.log(userInfo);

  function isObjectEmpty(value) {
    return (
      Object.prototype.toString.call(value) === "[object Object]" &&
      JSON.stringify(value) === "{}"
    );
  }

  useEffect(() => {
    if (!isObjectEmpty(userInfo)) {
          // Only need to set timer to automatically remove success msg submission was a success if not don't set timer
      if (submitFormApiErrorMsg.length === 0) {
        setTimeout(() => setSubmitFormApiSuccessMsg({ message: "" }), 3000);
      }
      const getPartners = async () => {
        try {
          debugger;
          setLoadFormApiErrorMsg([]);
          // setSubmitFormApiErrorMsg([]);
          setDataSubmitted(true);

          const throwError = false;
          debugger;
          if (throwError) {
            throw ["Failure to load partners"];
          }

          let partnerList = await TennisCentralAPI.getPartners(userId);

          setPartners(partnerList);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          if (Array.isArray(error)) {
            debugger;
            setLoadFormApiErrorMsg(error);
            // setSubmitFormApiErrorMsg(error);
          }
        }
        // setDataSubmitted(false);
      };
      getPartners();
    }
  }, [userInfo]);

  const deletePartner = async (partnerId) => {
    try {
      setSubmitFormApiErrorMsg([]);
      setDataSubmitted(true);

      const throwError = false;
      debugger;
      if (throwError) {
        throw ["Server Error Could not delete partner"];
      }

      console.log(`Delete Partner with id of ${partnerId}`);

      await TennisCentralAPI.deletePartner(userId, partnerId);
      const partnerList = await TennisCentralAPI.getPartners(userId);
      setPartners(partnerList);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (Array.isArray(error)) {
        debugger;
        setSubmitFormApiErrorMsg(error);
      }
    }
    // Need to reset dataSubmitted state regardless of whether submission was successful or not
    setDataSubmitted(false);
  };

  const updatePartnerContact = async (contactObj, userId, partnerId) => {
    console.log("Update Partner Contact");
    try {
      //---------------------------------------------
      setSubmitFormApiErrorMsg([]);
      setDataSubmitted(true);

      const throwError = false;
      debugger;
      if (throwError) {
        throw ["Failure to save data"];
      }
      //----------------------------------------------
      await TennisCentralAPI.updatePartnerTable(contactObj, userId, partnerId);

      //----------------------------------------------
      // Set submitFormApiSuccessMsg to trigger useEffect to trigger timer on success msg
      setSubmitFormApiSuccessMsg({ message: success });
      debugger;
      //----------------------------------------------
    } catch (error) {
      console.log(error);
      if (Array.isArray(error)) {
        debugger;
        setSubmitFormApiErrorMsg(error);
      }
    }
    // Need to reset dataSubmitted state regardless of whether submission was successful or not
    setDataSubmitted(false);
  };

  if (isLoading) {
    return <p className="Partners-loading">Loading &hellip;</p>;
  }
  if (loadFormApiErrorMsg.length > 0) {
    return (
      <SubmitFormApiMsgs
        submitFormApiErrorMsg={loadFormApiErrorMsg}
        submitFormApiSuccessMsg={loadFormApiSuccessMsg}
      />
    );
  } 
  return (
    <Container className="PartnerList">
      <Row>
        <Col sm={10} className="mx-auto">
          {(submitFormApiErrorMsg > 0 || submitFormApiSuccessMsg > 0) ?
            <SubmitFormApiMsgs
              submitFormApiErrorMsg={submitFormApiErrorMsg}
              submitFormApiSuccessMsg={submitFormApiSuccessMsg}
            />
          : null
          }
          <SubmitFormApiMsgs
            submitFormApiErrorMsg={submitFormApiErrorMsg}
            submitFormApiSuccessMsg={submitFormApiSuccessMsg}
          />
          {partners.length > 0 ? (
            partners.map((partner) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                deletePartner={deletePartner}
                updatePartnerContact={updatePartnerContact}
                // submitFormApiErrorMsg={submitFormApiErrorMsg}
                // submitFormApiSuccessMsg={submitFormApiSuccessMsg}
              />
            ))
          ) : (
            <NoPartnersToLoad />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PartnerList;
