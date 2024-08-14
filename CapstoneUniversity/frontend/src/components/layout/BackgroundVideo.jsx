import React from "react";
import "./BackgroundVideo.css";

export default function BackgroundVideo(props) {
    return ( 
    <div className="video-contain">
        <video autoPlay muted loop className="background-video">
        <source src={props.video} type="video/mp4"/>
        </video> 
    </div>
      );
};


