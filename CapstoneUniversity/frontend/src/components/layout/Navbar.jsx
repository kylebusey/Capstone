import React from 'react';
import logo from '../../assets/CapLogo.png';
import { Link } from 'react-router-dom';
import "./navbar.css";

export default function Navbar() {

return (
    <div className="navbar">
        <div className="left_side_menu">
            <Link to="/home"></Link>
            <div className="navbar_logo"> 
                <Link  to="/home">
                    <img src={logo} alt="college logo" />                     
                </Link>
            </div>
         <div className="navbar_links_left">
             <div className="item"> <Link style={{textDecoration: 'none'}} to="/students/feed"><p>Current Students</p></Link></div>
             <div className="item"> <Link style={{textDecoration: 'none'}} to="/faculty/feed"><p>Faculty</p></Link> </div>
             <div className="item"> <Link style={{textDecoration: 'none'}} to="/courses"><p>Course Catalog</p></Link></div>
            </div> 
        </div>
        <div className="right_side_menu">
            <div className="navbar_links_right">
             <div className="item">{<Link style={{textDecoration: 'none'}} to="/login"><p>Log In</p></Link> } </div>
             <div className="item"> <Link style={{textDecoration: 'none'}} to="/register"><p>Get Started</p></Link></div>
            </div>
        </div>

        </div>
    );
}