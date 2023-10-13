import React from "react";
import { Container } from "react-bootstrap";
import error from "../assets/surprised.webp";
import "./Unauthorized.css";


export default function Unauthorized() {

  return (
      <div className="page">

      <div className="error_title">
        <h1>Error 403: Unauthorized.</h1>
        <p>In order to access this page, please login to an account with the correct permissions.</p>
      </div>

      <div className="main_img">
        <img src = {error} alt="Capstone University" /> 
      </div>

    </div>

     
  );
}