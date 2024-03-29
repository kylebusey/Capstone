import React, { useEffect, useState } from 'react';
import logo from '../../assets/CapLogo.png';
import { Link } from 'react-router-dom';
import "./navbar.css";
import {LoginButton, LogoutButton, ProfileButton, RegisterButton} from "./Buttons";
import { useAuth } from '../../services/UserContext';

export default function Navbar() {

    const auth = useAuth();
    const [authorized, setAuthorized] = useState();

    useEffect(() => {
        const authorize = async () => {
          try {
            await auth.getUserData();
            setAuthorized(true);
          } catch (err) {
            setAuthorized(false);
          }
        }
        authorize();
       }, [])

    if(authorized === undefined) {
        return <h2>Loading...</h2>;
    } 


return (
    <div className="navbar">
        <div className="left_side_menu">
            <Link to="/home"></Link>
            <div className="navbar_logo"> 
                <Link to="/home">
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
            {auth.user && authorized ? 
            [<div className='header_text'> <p>Welcome {auth.user.username}!</p> </div>,
            <div className='profile_link'><ProfileButton/></div>,
            <div className="logout_button"> <LogoutButton logout={auth.logout}/> </div>] :
             [<div className='item'> <LoginButton/> </div>,  <div className='item'> <RegisterButton/> </div>]}
             </div>
        </div>

        </div>
    );
}