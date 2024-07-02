import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import college from '../assets/college.jpeg';
import './HomePage.css'
import { useAuth } from "../services/UserContext";



export default function HomePage() {

  
    const navigate = useNavigate();
    const auth = useAuth();

  return (
    <Container fluid className="main-container">
      
      
          <div className="hero_text">
              <h1>Capstone University</h1>
              <h2>Established in 2023</h2>
          </div>
          

          <div className="home_buttons">

          
          <Button className="button" variant="primary" size="lg"><span>About Us</span></Button> 
        

          <Link to="/register">
            <Button className="button" variant="primary" size="lg"><span>Enroll Now</span></Button>
          </Link>


          <Button className="button" variant="primary" size="lg"><span>Success Stories</span></Button>


          </div>

          <div className="third_section">
            <h1>Test</h1>
            
          </div>

          
              
          
        
    </Container>      
  );
}