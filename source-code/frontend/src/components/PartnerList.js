import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";

import UserContext from "./UserContext";
import TennisCentralAPI from "../TennisCentralAPI";
import PartnerCard from "./PartnerCard";

import NoPartnersToLoad from "./NoPartnersToLoad";
import SubmitFormApiMsgs from "./SubmitFormApiMsgs";

import toast, { Toaster } from "react-hot-toast";
const successToast = (successMsg) => toast.success(successMsg);
const errorToast = (errorMsg) => toast.error(errorMsg);

const PartnerList = () => {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [loadFormApiErrorMsg, setLoadFormApiErrorMsg] = useState([]);
  const [loadFormApiSuccessMsg, setLoadFormApiSuccessMsg] = useState({
    message: "",
  });

  const userInfo = useContext(UserContext);
  const userId = userInfo?.userId;

  function isObjectEmpty(value) {
    return (
      Object.prototype.toString.call(value) === "[object Object]" &&
      JSON.stringify(value) === "{}"
    );
  }

  useEffect(() => {
    const getPartners = async () => {
      try {
        let partnerList = await TennisCentralAPI.getPartners(
          userId,
          userInfo?.token
        );

        setPartners(partnerList);
        setIsLoading(false);
      } catch (error) {
        if (Array.isArray(error)) {
          setIsLoading(false);
          errorToast(error);
          // setLoadFormApiErrorMsg(error);
        }
      }
    };

    getPartners();
  }, []);

  const deletePartner = async (partnerId) => {
    try {
      await toast.promise(
        TennisCentralAPI.deletePartner(userId, partnerId, userInfo?.token),
        {
          success: "Deleted from Partner List",
          error: "Delete failed, try again",
        }
      );

      const partnerList = await TennisCentralAPI.getPartners(
        userId,
        userInfo?.token
      );
      setPartners(partnerList);
      setIsLoading(false);
    } catch (error) {
      if (Array.isArray(error)) {
      }
    }
  };

  const updatePartnerContact = async (contactObj, userId, partnerId) => {

    try {
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
          error: "Error occurred while saving data, try again",
        }
      );

      let partnerList = await TennisCentralAPI.getPartners(
        userId,
        userInfo?.token
      );

      setPartners(partnerList);

      setIsLoading(false);
    } catch (error) {
      if (Array.isArray(error)) {
        // errorToast(error);
      }
    }
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
          <h1 className="text-center mt-3">Partner List</h1>
          <hr></hr>
          <Toaster />
          {partners.length > 0 ? (
            partners.map((partner) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                deletePartner={deletePartner}
                updatePartnerContact={updatePartnerContact}
              />
            ))
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
