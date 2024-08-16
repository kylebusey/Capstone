import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './HomePage.css'
import { useAuth } from "../services/UserContext";
import BackgroundVideo from "./layout/BackgroundVideo";
import video from "../assets/college-stock.mp4";
import pic1 from "../assets/homepage/pic1.jpg";
import pic2 from "../assets/homepage/pic2.jpg";
import pic3 from "../assets/homepage/pic3.jpg";
import pic4 from "../assets/homepage/pic4.webp";
import pic5 from "../assets/homepage/pic5.jpg";
import pic6 from "../assets/homepage/pic6.jpg";




export default function HomePage() {

    const navigate = useNavigate();
    const auth = useAuth();

  return (
    <>
    <div className="main-container">
      <div className="hero-text">
        <h1>Capstone University</h1>
        <h2>Established in 2023</h2>
      </div>

      <div className="hero-video">
        <BackgroundVideo video={video} />
      </div>

    </div>
    
    <div className="banner-section">
        <div className="banner">
          <h3>Find Your True Potential</h3>
        </div>

        <div className="image-section">
          <img className='home-pic' alt = "" src={pic1}/>
          <img className='home-pic' alt = "" src={pic2}/>
          <img className='home-pic' alt = "" src={pic3}/>
          <img className='home-pic' alt = "" src={pic4}/>
          <img className='home-pic' alt = "" src={pic5}/>
          <img className='home-pic' alt = "" src={pic6}/>
        </div>

      </div>
      
      </>

    
  
  );
}