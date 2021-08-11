import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";

import UserContext from "./UserContext";
import TennisCentralAPI from "../TennisCentralAPI";
import isNil from "lodash/isNil";
import PartnerCard from "./PartnerCard";
import { set } from "lodash";

const PartnerList = () => {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = useContext(UserContext);
  const userId = userInfo.userId;
  console.log(userInfo);

  useEffect(() => {
    const getPartners = async () => {
      try {
        let partnerList = await TennisCentralAPI.getPartners(userId);
        setPartners(partnerList);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPartners();
  }, [userInfo]);

  const deletePartner = async (partnerId) => {
    console.log(`Delete Partner with id of ${partnerId}`);
    debugger;
    await TennisCentralAPI.deletePartner(userId, partnerId);
    const partnerList = await TennisCentralAPI.getPartners(userId);
    setPartners(partnerList);
    setIsLoading(false);
  };

  if (isLoading) {
    return <p className="Partners-loading">Loading &hellip;</p>;
  }
  return (
    <Container className="PartnerList">
      <Row>
        <Col sm={10} className="mx-auto">
          {partners.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              deletePartner={deletePartner}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default PartnerList;
