import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
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


export default function CourseCreate() {

  const auth = useAuth();

  const [courseName, setCourseName] = useState("");
  const [building, setBuilding] = useState("");
  const [time, setTime] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [available, setAvailable] = useState("");


  const onChangeCourseName = e => {
    setCourseName(e.target.value);
  };

  const onChangeBuilding = e => {
    setBuilding(e.target.value);
  };

  const onChangeTime = e => {
    setTime(e.target.value);
  };

  const onChangeStartDate = e => {
    setStartDate(e.target.value);
  };

  const onChangeEndDate = e => {
    setEndDate(e.target.value);
  };

  const onChangeAvailable = e => {
    setAvailable(e.target.value);
  };

  const createCourse = (e) => {
      e.preventDefault()

      auth.createCourse(courseName, building, time, start_date, end_date, available);

  }

  return (
    <Container fluid className="content">

    <Form onSubmit = {createCourse}>
      <label for="courseName" class="placeholder"><p>Course Name</p></label>
          <input className="input" type="text" placeholder="" name="courseName"
            value={courseName} 
            onChange = {onChangeCourseName}
            validations={[required]} />

      <label for="building" class="placeholder"><p>Building</p></label>
          <input className="input" type="text" placeholder="" name="building"
            value={building} 
            onChange = {onChangeBuilding}
            validations={[required]} />

      <label for="time" class="placeholder"><p>Class Time</p></label>
          <input className="input" type="text" placeholder="" name="time"
            value={time} 
            onChange = {onChangeTime}
            validations={[required]} />


      <label for="startDate" class="placeholder"><p>Start Date</p></label>
          <input className="input" type="text" placeholder="" name="startDate"
            value={start_date} 
            onChange = {onChangeStartDate}
            validations={[required]} />


      <label for="endDate" class="placeholder"><p>End Date</p></label>
          <input className="input" type="text" placeholder="" name="endDate"
            value={end_date} 
            onChange = {onChangeEndDate}
            validations={[required]} />

      <label for="available" class="placeholder"><p>Available Seats</p></label>
          <input className="input" type="text" placeholder="" name="available"
            value={available} 
            onChange = {onChangeAvailable}
            validations={[required]} />
        
        <button type="text" className="submit">Create Course</button>
        </Form>
        <div className='course_table'><h1>Course Display</h1></div>
        
        
    </Container>      
  );
}