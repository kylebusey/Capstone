import React from "react";
import './form.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import capstoneLogo from '../../assets/CapLogo.png';
import CSRFToken from "../../services/CSRFToken";
import { useAuth } from "../../services/UserContext";
import axiosInstance from "../../services/axiosApi";


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const passwordReq = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const firstNameReq = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The field must be between 3 and 20 characters.
        </div>
      );
    }
  };

  const lastNameReq = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The field must be between 3 and 20 characters.
        </div>
      );
    }
  };

export default function Register() {

  const navigate = useNavigate();
  const auth = useAuth();

  const [username, setUsername] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState('');

  if(auth.user) {
    navigate('/dashboard')
   }


  const onChangeUsername = e => {
    setUsername(e.target.value);
  };
  const onChangeFirstName = e => {
    setFirstName(e.target.value);
  };
  const onChangeLastName = e => {
    setLastName(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };


  const handleRegister = async (e) => {
      e.preventDefault();

      const body = JSON.stringify({username, first_name, last_name, password});

      return await axiosInstance.post("register/", body)
        .then(() => navigate('/login').finally(() => {
          if(!auth.user) {
            setError("Registration failed. Please try again.");
          }
      }));           
    }
  
    return (
      <div className="form">
      <form onSubmit={handleRegister}>
        <CSRFToken />
          <div class="logo"><img src ={capstoneLogo}/></div>
          <div className="title"><h1>Student Sign Up</h1>
          <div className="subtitle"><h2>Your first step to your new career!</h2></div>
          </div>
          <div className="input-container">
            <label for="username" class="placeholder"><p>Username</p></label>
            <input class="input" type="text" placeholder=" " name="username"
            value={username} 
            onChange= {onChangeUsername} 
            minLength="4" required />
          </div>
          <div className="input-container">
            <label for="firstname" class="placeholder"><p>First Name</p></label>
            <input className="input" type="text" placeholder=" " name="first_name"
            value={first_name}
            onChange={onChangeFirstName}
            validations={[required, firstNameReq]}
            minLength="3" required />
      
          </div>
          <div className="input-container">
            <label for="lastname" class="placeholder"><p>Last Name</p></label>
            <input className="input" type="text" placeholder=" " name="last_name"
            value={last_name}
            onChange={onChangeLastName}
            validations={[required, lastNameReq]}
            minLength="3" required />
          </div>
          <div className="input-container">
            <label for="password" class="placeholder"><p>Password</p></label>
            <input className="input" type="password" placeholder=" " name="password" 
            value={password}
            onChange={onChangePassword}
            validations={[required, passwordReq]}
            minLength="6" required />
          </div>
          <button type="text" class="submit">Submit</button>
          <div className="error_text">{error}</div>
          <div className="subtitle"><h2>Not a student? Click <Link to='/faculty/register'>here</Link> for Faculty registration.</h2></div>
      </form>
    </div>
    );
  }