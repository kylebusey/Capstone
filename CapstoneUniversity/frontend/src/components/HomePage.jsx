import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import college from '../assets/college.jpeg';
import './HomePage.css'

export default function HomePage() {

    const navigate = useNavigate();

  return (
    <Container fluid className="content">

        <div className="hero_text">
            <h1>Capstone University: Established in 2022</h1>
            <h2>Imagine the Unimaginable</h2>
        </div>

        <div className="home_buttons">

        <Link to ="/aboutus">
          <Button className="button" variant="primary" size="lg"><span>About Us</span></Button> 
        </Link>

        <Link to="/students/register">
          <Button className="button" variant="primary" size="lg"><span>Enroll Now</span></Button>
        </Link>

        <Link to="/capstonesuccess">
          <Button className="button" variant="primary" size="lg"><span>Success Stories</span></Button>
        </Link>

        </div>

        <div className="hero_pic">
            <img src = {college} alt="Capstone University" /> 
        </div>
        
    </Container>      
  );
}