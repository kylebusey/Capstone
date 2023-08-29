import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useAuth } from "../../services/UserContext";
import { DataGrid } from '@mui/x-data-grid';
import "./CourseDisplay.css";
import { Link } from "react-router-dom";



export default function CourseDisplay() {

  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courseData, setCourseData] = useState();


  useEffect(() => {
    auth.displayCourses().then((response) => {
      setCourseData(response.data);
      setLoading(false);
     });
  }, [])

  

  const columns = [
    { field: 'courseId', headerName: 'Course ID', minWidth: 75, headerClassName: 'super-app-theme--header', flex: 0.2},
    { field: 'courseName', headerName: 'Course Name', minWidth: 200, headerClassName: 'super-app-theme--header', flex: 0.5},
    { field: 'building', headerName: 'Building', minWidth: 100, headerClassName: 'super-app-theme--header', flex: 0.2},
    { field: 'startDate', headerName: 'Start Date', minWidth: 100, headerClassName: 'super-app-theme--header', flex: 0.2},
    { field: 'endDate', headerName: 'End Date', minWidth: 100, headerClassName: 'super-app-theme--header', flex: 0.2},
    { field: 'availableSeats', headerName: 'Seats Left', minWidth: 75, headerClassName: 'super-app-theme--header', flex: 0.2},
  ];



  const handleCourseRegister = () => {
    if(selectedCourses.length < 3 && selectedCourses.length >= 1) {
      alert("You can have successfully registered.");
      auth.addCourse(selectedCourses);
    } else {
      alert("You can only register for two courses at a time. Please try again.");
    }
  }

  const loadCourseData = (data) => {
   return data.map((course, index) => ({
      id: index + 1,
      courseId: index + 1,
      courseName: course.name,
      building: course.building,
      startDate: course.start_date,
      endDate: course.end_date,
      availableSeats: course.available   
    }))};
    
  

  return (
    <Container fluid className="content">
    
    <div className='catalog_title'><p>Course Catalog</p></div>

    <div className='courses_table'>

    {loading ? <h2>Loading...</h2> : 
      <DataGrid sx={{border: 1, boxShadow: 1, borderColor: 'black'}} rows={loadCourseData(courseData)} columns={columns} initialState={{
    pagination: {
      paginationModel: { page: 0, pageSize: 10 },
    },
  }}
    pageSizeOptions={[10, 20]}
    checkboxSelection
    onRowSelectionModelChange= {(ids) => { setSelectedCourses(ids); }}
    /> }

    </div>
  

    <div className='button_section'>
     {auth.user.is_staff ? <Link style={{textDecoration: 'none'}} to="/courses/create">
    <Button variant='primary' className='create_course_button'>Create Course</Button> </Link> : 
     <Button variant='primary' className='register_button' onClick={handleCourseRegister}>Register</Button> }
    </div>
        
        
    </Container>      
  );
}