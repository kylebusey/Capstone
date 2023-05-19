import React, {useState}  from "react";
import Form from 'react-bootstrap/Form';
import './form.css';
import { useNavigate } from "react-router-dom";
import capstoneLogo from '../../assets/CapLogo.png';


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
  const path = "faculty/feed/";

  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [staffID, setStaffID] = useState();

  const onChangeEmail = e => {
    setEmail(e.target.value);
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
  const onChangeStaffID = e => {
    setStaffID(e.target.value);
  };

  
  const handleFacultyRegister = (e) => {
    e.preventDefault();
    //auth.facultyRegister(email, firstName, lastName, password, staffID).then(() =>
    // {
     // navigate(path, {replace: true})
   // });
  } 

    return (
      <div class="form">
      <Form onSubmit={handleFacultyRegister} >
      <div class="logo"><img src ={capstoneLogo}/></div>
      <div class="title"><h1>Faculty Sign Up</h1> 
      <div class ="subtitle"><h2>The next step for joining Capstone University!</h2></div>
      </div>
      <div class="input-container">
        <label for="email" class="placeholder"><p>Email</p></label>
        <input class="input" type="text" placeholder=" " name="email"
        value={email} 
        onChange= {onChangeEmail} 
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
      <div class="input-container ic2">
        <label for="staff_id" class="placeholder"><p>Staff ID</p></label>
        <input class="input" type="staff_id" placeholder=" " name="staff_id" 
        value={staffID}
        onChange={onChangeStaffID}
        validations={[required]}/>
      </div>
      <button type="text" class="submit">Submit</button>
      </Form>
    </div>
    )
  }