import {React, useState } from "react"
import Form from 'react-bootstrap/Form';
import './form.css';
import { useNavigate, useLocation, Link } from "react-router-dom";
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


const passwordValidation = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default function LoginForm() {
  
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const auth = useAuth();
   
   const navigate = useNavigate();
   const location = useLocation();

   const from = location.state?.from || "/home";
    
  const handleLoginSubmit = (e) => {
    e.preventDefault();
      auth.login(username, password).then(() => {
          navigate(from, {replace: true})
      })
  };

  const onChangeUsername = e => {
    setUsername(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

    return (
      <div className="form">
      <Form onSubmit={handleLoginSubmit}>
        <CSRFToken />
          <div class="logo"><img src ={capstoneLogo}/></div>
          <div className="title"><h1>Sign In</h1></div>
          <div className="subtitle"><h2>Not Registered? Click <Link to='/register/'>here</Link></h2></div>
          <div className="input-container">
          <label for="username" class="placeholder"><p>Username</p></label>
          <input className="input" type="text" placeholder="" name="username"
            value={username} 
            onChange = {onChangeUsername}
            validations={[required]} />
          </div>
          <div className="input-container">
          <label for="password" className="placeholder"><p>Password</p></label>
          <input className="input" type="password" placeholder="" name="password" 
            value={password}
            onChange={onChangePassword}
            validations={[required, passwordValidation]} />
          </div>
          <button type="text" className="submit">Sign In</button>
      </Form>
      </div>
    );
  
}