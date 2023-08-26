import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useAuth } from "../../services/UserContext";
import { DataGrid, GridRowModes, useGridApiContext } from '@mui/x-data-grid';
import "./CourseDisplay.css";
import { Link } from "react-router-dom";



export default function CourseDisplay() {

  const auth = useAuth();
  const apiRef = useGridApiContext();

  const [selectedCourses, setSelectedCourses] = useState();

  const rows = [
    { id: 1, courseId: '1', courseName: 'Accounting 101', building: 'ACA252', startDate: '2023-09-05', endDate: '2023-12-11', availableSeats: '30'},
    { id: 2, courseId: '2', courseName: 'Chemistry 121', building: 'CHEM100', startDate: '2023-09-05', endDate: '2023-12-11', availableSeats: '30'},
    { id: 3, courseId: '3', courseName: 'Biology 250', building: 'BIO522', startDate: '2023-09-05', endDate: '2023-12-11', availableSeats: '30'},
    { id: 4, courseId: '3', courseName: 'Biology 250', building: 'BIO522', startDate: '2023-09-05', endDate: '2023-12-11', availableSeats: '30'},
    { id: 5, courseId: '3', courseName: 'Biology 250', building: 'BIO522', startDate: '2023-09-05', endDate: '2023-12-11', availableSeats: '30'},
    { id: 6, courseId: '3', courseName: 'Biology 250', building: 'BIO522', startDate: '2023-09-05', endDate: '2023-12-11', availableSeats: '30'},
    { id: 7, courseId: '3', courseName: 'Biology 250', building: 'BIO522', startDate: '2023-09-05', endDate: '2023-12-11', availableSeats: '30'},
    { id: 8, courseId: '3', courseName: 'Biology 250', building: 'BIO522', startDate: '2023-09-05', endDate: '2023-12-11', availableSeats: '30'},
  ];

  const columns = [
    { field: 'courseId', headerName: 'Course ID', minWidth: 75, headerClassName: 'super-app-theme--header', flex: 0.2},
    { field: 'courseName', headerName: 'Course Name', minWidth: 200, headerClassName: 'super-app-theme--header', flex: 0.5},
    { field: 'building', headerName: 'Building', minWidth: 100, headerClassName: 'super-app-theme--header', flex: 0.2},
    { field: 'startDate', headerName: 'Start Date', minWidth: 100, headerClassName: 'super-app-theme--header', flex: 0.2},
    { field: 'endDate', headerName: 'End Date', minWidth: 100, headerClassName: 'super-app-theme--header', flex: 0.2},
    { field: 'availableSeats', headerName: 'Seats Left', minWidth: 75, headerClassName: 'super-app-theme--header', flex: 0.2},
  ];

  const handleCourseRegistration = (e) => {
  
  };


  return (
    <Container fluid className="content">
    
    <div className='catalog_title'><p>Course Catalog</p></div>

    <div className='courses_table'>
     
      <DataGrid sx={{border: 1, boxShadow: 1, borderColor: 'black'}} rows={rows} columns={columns} initialState={{
    pagination: {
      paginationModel: { page: 0, pageSize: 10 },
    },
  }}
    pageSizeOptions={[10, 20]}
    checkboxSelection
    onRowSelectionModelChange= {}
    />

    </div>

    <div className='button_section'>
     {auth.user.is_staff ? <Link style={{textDecoration: 'none'}} to="/courses/create">
    <Button variant='primary' className='create_course_button'>Create Course</Button> </Link> : 
     <Button variant='primary' className='register_button'>Add Course</Button> }
    </div>
        
        
    </Container>      
  );
}