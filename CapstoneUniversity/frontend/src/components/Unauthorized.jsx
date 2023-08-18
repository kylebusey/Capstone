import React from "react";
import { Container } from "react-bootstrap";
import college from '../assets/college.jpeg';
import './HomePage.css'


export default function Unauthorized() {

  return (
    <Container fluid className="content">
        <h1>Error 403: Unauthorized.</h1>
    </Container>      
  );
}