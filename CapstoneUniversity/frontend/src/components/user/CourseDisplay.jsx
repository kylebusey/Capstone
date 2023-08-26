import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../../services/UserContext";
import { DataGrid } from '@mui/x-data-grid';


export default function CourseDisplay() {

  const auth = useAuth();

  const rows = [
    { id: 1, col1: '1', col2: 'Accounting 101', col3: 'ACA252', col4: '2023-09-05', col5: '2023-12-11', col6: '30'},
    { id: 2, col1: '2', col2: 'Chemistry 121', col3: 'CHEM100', col4: '2023-09-05', col5: '2023-12-11', col6: '30'},
    { id: 3, col1: '3', col2: 'Biology 250', col3: 'BIO522', col4: '2023-09-05', col5: '2023-12-11', col6: '30'},
  ];

  const columns = [
    { field: 'col1', headerName: 'Course ID', width: 75 },
    { field: 'col2', headerName: 'Course Name', width: 200 },
    { field: 'col3', headerName: 'Building', width: 100 },
    { field: 'col4', headerName: 'Start Date', width: 100 },
    { field: 'col5', headerName: 'End Date', width: 100 },
    { field: 'col6', headerName: 'Seats Left', width: 75 },
  ];

  return (
    <Container fluid className="content">
    
    <div className='course_table'><h1>Course Display</h1></div>

    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} initialState={{
    pagination: {
      paginationModel: { page: 0, pageSize: 5 },
    },
  }}
    pageSizeOptions={[5, 10]}
    checkboxSelection />
    </div>
        
        
    </Container>      
  );
}