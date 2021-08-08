import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";

import UserContext from "./UserContext";
import TennisCentralAPI from "../TennisCentralAPI";
import isNil from "lodash/isNil";
import PartnerCard from "./PartnerCard";


const PartnerList = () => {
  const [ partners, setPartners ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const userInfo = useContext(UserContext);
  const userId = userInfo.userId;
  console.log(userInfo);

  useEffect(() => {
    const getPartners = async () => {
      try {
        debugger;
        let partnerList = await TennisCentralAPI.getPartners(userId);
        debugger;
        setPartners(partnerList.partners);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    getPartners();
  }, [userInfo])

  if (isLoading) {
    return <p className="Partners-loading">Loading &hellip;</p>;
  }
  return (
    <Container className="PartnerList">
      <Row>
        <Col sm={8}>
          {partners.map(partner => (<PartnerCard key={partner.id} partner={partner} />))}
        </Col>
      </Row>
      
    </Container>
  )
}

export default PartnerList; 