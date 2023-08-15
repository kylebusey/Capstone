import React, {useState}  from "react";
import Form from 'react-bootstrap/Form';
import './form.css';
import { useNavigate } from "react-router-dom";
import capstoneLogo from '../../assets/CapLogo.png';
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


const firstNameValidation = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The field must be between 3 and 20 characters.
        </div>
      );
    }
  };

  const lastNameValidation = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The field must be between 3 and 20 characters.
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

export default function FacultyRegister() {
  const navigate = useNavigate();
  const auth = useAuth();
  const path = "/home";

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


  
  const handleFacultyRegister = (e) => {
    e.preventDefault();
      auth.facultyRegister(username, firstName, lastName, password).then(() => {
          navigate(path);
      });
  } 

    return (
      <div class="form">
      <Form onSubmit={handleFacultyRegister} >
      <div class="logo"><img src ={capstoneLogo}/></div>
      <div class="title"><h1>Faculty Sign Up</h1> 
      <div class ="subtitle"><h2>The next step for joining Capstone University!</h2></div>
      </div>
      <div class="input-container">
        <label for="username" class="placeholder"><p>Username</p></label>
        <input class="input" type="text" placeholder=" " name="username"
        value={username} 
        onChange= {onChangeUsername} 
        validations={[required]}  />
      </div>
      <div class="input-container">
        <label for="password" class="placeholder"><p>Password</p></label>
        <input class="input" type="password" placeholder=" " name="password" 
        value={password}
        onChange={onChangePassword}
        validations={[required, passwordValidation]}/>
      </div>
      <div class="input-container">
        <label for="firstname" class="placeholder"><p>First Name</p></label>
        <input class="input" type="text" placeholder=" " name="first_name"
        value={firstName}
        onChange={onChangeFirstName}
        validations={[required, firstNameValidation]} />
      </div>
      <div class="input-container">
        <label for="lastname" class="placeholder"><p>Last Name</p></label>
        <input class="input" type="text" placeholder=" " name="last_name"
        value={lastName}
        onChange={onChangeLastName}
        validations={[required, lastNameValidation]} />
      </div>
      <button type="text" class="submit">Submit</button>
      </Form>
    </div>
    )
  }