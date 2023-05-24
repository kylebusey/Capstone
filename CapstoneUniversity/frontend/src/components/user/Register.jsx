import React from "react";
import Form from 'react-bootstrap/Form';
import './form.css';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import capstoneLogo from '../../assets/CapLogo.png';
import CSRFToken from "../../services/CSRFToken";
import { useAuth } from "../../services/UserContext";


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
  const path = "/students/feed";
  const auth = useAuth();

  const [username, setUsername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();

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


  const handleRegister = (e) => {
    e.preventDefault();
      auth.register(username, firstName, lastName, password).then(() => {
     navigate(path, {replace: true})
      });
  }
  
    return (
      <div className="form">
      <Form onSubmit={handleRegister}>
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
            validations={[required]}  />
          </div>
          <div className="input-container">
            <label for="firstname" class="placeholder"><p>First Name</p></label>
            <input className="input" type="text" placeholder=" " name="first_name"
            value={firstName}
            onChange={onChangeFirstName}
            validations={[required, firstNameReq]} />
      
          </div>
          <div className="input-container">
            <label for="lastname" class="placeholder"><p>Last Name</p></label>
            <input className="input" type="text" placeholder=" " name="last_name"
            value={lastName}
            onChange={onChangeLastName}
            validations={[required, lastNameReq]} />
          </div>
          <div className="input-container">
            <label for="password" class="placeholder"><p>Password</p></label>
            <input className="input" type="password" placeholder=" " name="password" 
            value={password}
            onChange={onChangePassword}
            validations={[required, passwordReq]}/>
          </div>
          <button type="text" class="submit">Submit</button>
          <div className="subtitle"><h2>Not a Student? Click <Link to='/faculty/register'>here</Link> for Faculty Registration</h2></div>
      </Form>
    </div>
    );
  }