import {React, useState } from "react"
import './form.css';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../services/UserContext";
import axiosInstance from "../../services/axiosApi";
import capstoneLogo from '../../assets/CapLogo.png';
import CSRFToken from "../../services/CSRFToken";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        <p>This field is required!</p>
      </div>
    );
  }
};


const passwordValidation = password => {
  if (password.length < 6 || password.length > 40) {
    return (
      <div className="password-fail" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default function LoginForm() {
  
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const auth = useAuth();
  
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from || "/home";

   if(auth.user) {
    navigate('/dashboard')
   }



   const handleLoginSubmit = async (e) => {
       e.preventDefault();
       setError("");

       const body = JSON.stringify({username, password});

          await axiosInstance.post("login/", body)
          .then(() => auth.getUserData()).finally(() => {
            if(!auth.user) {
              setError("Login failed. Check Username and Password.");
            }
          });            
  };

    const onChangeUsername = e => {
      setUsername(e.target.value);
    };

    const onChangePassword = e => {
      setPassword(e.target.value);
    };


    return (
      <div className="form">
      <form onSubmit={handleLoginSubmit}>
        <CSRFToken />
          <div class="logo"><img src ={capstoneLogo}/></div>
          <div className="title"><h1>Sign In</h1></div>
          <div className="subtitle"><h2>Not registered? Get started <Link to='/register/'>here</Link></h2></div>
          <div className="input-container">
          <label for="username" class="placeholder"><p>Username</p></label>
          <input className="input" type="text" placeholder="" name="username"
            value={username} 
            onChange = {onChangeUsername}
            validations={required}
            minLength="4" required/>
          </div>
          <div className="input-container">
          <label for="password" className="placeholder"><p>Password</p></label>
          <input className="input" type="password" placeholder="" name="password" 
            value={password}
            onChange={onChangePassword}
            validations={[required, passwordValidation]}
            minLength="6" required />
          </div>
          <button type="text" className="submit">Sign In</button>
          <div className="error_text">{error}</div>
      </form>
      </div>
    );
  
}