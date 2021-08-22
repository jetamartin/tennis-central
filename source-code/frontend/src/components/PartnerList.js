import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";

import UserContext from "./UserContext";
import TennisCentralAPI from "../TennisCentralAPI";
import PartnerCard from "./PartnerCard";

import NoPartnersToLoad from "./NoPartnersToLoad";
import SubmitFormApiMsgs from "./SubmitFormApiMsgs";

import toast, { Toaster } from "react-hot-toast";
const successToast = () => toast.success("Data was successfully updated");
const errorToast = () => toast.error("Failure updating data");

const PartnerList = () => {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State & vars associated with displaying and hiding API Error & Success Msgs arrising from submission of form
  // const [dataSubmitted, setDataSubmitted] = useState(false);
  // const [submitFormApiErrorMsg, setSubmitFormApiErrorMsg] = useState([]);
  // const [submitFormApiSuccessMsg, setSubmitFormApiSuccessMsg] = useState({
  //   message: "",
  // });
  // const success = "Data was successfully updated";

  const [loadFormApiErrorMsg, setLoadFormApiErrorMsg] = useState([]);
  const [loadFormApiSuccessMsg, setLoadFormApiSuccessMsg] = useState({
    message: "",
  });

  let partnerList;

  // const setSuccessMsgTimer = () => {
  //   setTimeout(() => setSubmitFormApiSuccessMsg({ message: "" }), 2000);
  // };

  // If success message was generated then this will start timer to remove it after x time
  // useEffect(() => {
  //   console.log(
  //     "****Setting Timer useEffect() - dateSubmitted: ",
  //     dataSubmitted
  //   );
  //   // Only need to set timer to automatically remove success msg submission was a success if not don't set timer
  //   // if (submitFormApiErrorMsg.length === 0) {
  //   if (submitFormApiSuccessMsg.message !== "") {
  //     setTimeout(() => setSubmitFormApiSuccessMsg({ message: "" }), 2000);
  //   }
  // }, [dataSubmitted]);

  // -------------------------------------------------------------------

  const userInfo = useContext(UserContext);
  const userId = userInfo?.userId;

  function isObjectEmpty(value) {
    return (
      Object.prototype.toString.call(value) === "[object Object]" &&
      JSON.stringify(value) === "{}"
    );
  }

  useEffect(() => {
    console.log("****GetPartner useEffect() - userInfo: ", userInfo);

    // if (!isObjectEmpty(userInfo)) {
    const getPartners = async () => {
      try {
        // setDataSubmitted(false);
        debugger;
        // if (submitFormApiErrorMsg.length > 0) {
        //   setLoadFormApiErrorMsg([]);
        // }

        // ****** Code to simulate API errors
        const throwError = false;
        debugger;
        if (throwError) {
          throw ["Failure to load partners"];
        }

        partnerList = await TennisCentralAPI.getPartners(
          userId,
          userInfo?.token
        );

 
        // partnerList = await toast.promise(
        //   TennisCentralAPI.getPartners(userId, userInfo?.token),
        //   { success: "Data was saved", error: "Data could not be saved" }
        // );
     

        debugger;
        // toast.promise(partnerList, {
        //   success: 'Got the data',
        // });

        setPartners(partnerList);
        setIsLoading(false);
        // setDataSubmitted(true)
      } catch (error) {
        // console.log(error);
        if (Array.isArray(error)) {
          debugger;
          setIsLoading(false);
          setLoadFormApiErrorMsg(error);
          // setSubmitFormApiErrorMsg(error);
        }
      }
      // setDataSubmitted(false);
    };

    getPartners();
    // }
  }, []);

  const deletePartner = async (partnerId) => {
    try {
      // setSubmitFormApiErrorMsg([]);

      const throwError = false;
      debugger;
      if (throwError) {
        throw ["Server Error Could not delete partner"];
      }

      // console.log(`Delete Partner with id of ${partnerId}`);

      await toast.promise(
        TennisCentralAPI.deletePartner(userId, partnerId, userInfo?.token),
        { success: "Deleted from Partner's List" }
      );

      const partnerList = await TennisCentralAPI.getPartners(
        userId,
        userInfo?.token
      );

      setPartners(partnerList);
      // setSubmitFormApiSuccessMsg({ message: success });
      // setDataSubmitted(true);

      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      if (Array.isArray(error)) {
        debugger;
        // setSubmitFormApiErrorMsg(error);
      }
      // setDataSubmitted(false);
    }
    // Need to reset dataSubmitted state regardless of whether submission was successful or not
    // setDataSubmitted(false);
  };

  const updatePartnerContact = async (contactObj, userId, partnerId) => {
    console.log("****UpdatePartnerContact() - userInfo: ", userInfo);

    try {
      debugger;
      //---------------------------------------------
      // if (submitFormApiErrorMsg.length > 0) {
      //   setSubmitFormApiErrorMsg([]);
      // }

      //** Instrumentation to simulate api error in debug mode by throwing error */
      const throwError = false;
      debugger;
      if (throwError) {
        throw ["Failure to save data"];
      }
      //----------------------------------------------

      // await TennisCentralAPI.updatePartnerTable(
      //   contactObj,
      //   userId,
      //   partnerId,
      //   userInfo?.token
      // );

      await toast.promise(
        TennisCentralAPI.updatePartnerTable(
          contactObj,
          userId,
          partnerId,
          userInfo?.token
        ),
        {
          // loading: 'Data is loading...',
          success: "Data was saved",
          error: "Error when saving data",
        }
      );

      // successToast();
      debugger;
      // setDataSubmitted(true);
      // Set submitFormApiSuccessMsg to trigger useEffect to trigger timer on success msg
      // setSubmitFormApiSuccessMsg({ message: success });
      // setSuccessMsgTimer();

      debugger;
      //----------------------------------------------
    } catch (error) {
      // console.log(error);
      errorToast();
      if (Array.isArray(error)) {
        debugger;
        // setSubmitFormApiErrorMsg(error);
      }
    }
    // Need to reset dataSubmitted state regardless of whether submission was successful or not
    // setDataSubmitted(false);
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
  // console.log(partners);
  debugger;
  return (
    <Container className="PartnerList">
      <Row>
        <Col sm={10} className="mx-auto">
          <h1 className="text-center mt-3">Partner's List</h1>
          <hr></hr>
          <Toaster />
          {/* {submitFormApiErrorMsg.length > 0 ||
          submitFormApiSuccessMsg.message !== "" ? (
            <SubmitFormApiMsgs
              submitFormApiErrorMsg={submitFormApiErrorMsg}
              submitFormApiSuccessMsg={submitFormApiSuccessMsg}
            />
          ) : null} */}

          {partners.length > 0 ? (
            partners.map((partner) => {
              // debugger;
              // console.log(`${partner.id}${userInfo?.userId}`);
              return (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  deletePartner={deletePartner}
                  updatePartnerContact={updatePartnerContact}
                />
              );
            })
          ) : (
            <div>
              <NoPartnersToLoad partners={partners} />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PartnerList;
