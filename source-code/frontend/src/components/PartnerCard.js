import React from 'react';
import { Card, Container, Col, Row, Table } from "react-bootstrap";
const PartnerCard = ( {partner} ) => {
  // debugger;
  return (

    <Card >
     <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
</Card>

  )

}

export default PartnerCard;