import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './HomePage.css'
import { useAuth } from "../services/UserContext";
import BackgroundVideo from "./layout/BackgroundVideo";
import video from "../assets/college-stock.mp4";



export default function HomePage() {

    const navigate = useNavigate();
    const auth = useAuth();

  return (
    <div className="main-container">
      <div className="hero-text">
          <h1>Capstone University</h1>
          <h2>Established in 2023</h2>
       </div>   

       <div className="hero-video">
        <BackgroundVideo video={video}/>
        </div>
    </div>      
  );
}