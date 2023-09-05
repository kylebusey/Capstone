import {React, useEffect, useState} from "react"
import './Dashboard.css';
import CSRFToken from "../../services/CSRFToken";
import { useAuth } from "../../services/UserContext";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";


export default function UserDashboard() {

   const [registeredCourses, setRegisteredCourses] = useState([]);
   const [loading, setLoading] = useState(true);
   const [selectedCourses, setSelectedCourses] = useState([]);
   const auth = useAuth();

    const columns = [
    { field: 'courseId', headerName: 'Course ID', minWidth: 50, headerClassName: 'super-app-theme--header', flex: 0.5},
    { field: 'courseName', headerName: 'Course Name', minWidth: 100, headerClassName: 'super-app-theme--header', flex: 1.2},
    { field: 'building', headerName: 'Building', minWidth: 75, headerClassName: 'super-app-theme--header', flex: 1},
    { field: 'startDate', headerName: 'Start Date', minWidth: 75, headerClassName: 'super-app-theme--header', flex: 1},
  ];


 
   useEffect(() => {
    auth.displayRegisteredCourses().then((res) => {
      setRegisteredCourses(res.data);
      setLoading(false);
    });
   }, [])

   const loadCourseData = (data) => {
    return data.map((course) => ({
       id: course.id,
       courseId: course.id,
       courseName: course.name,
       building: course.building,
       startDate: course.start_date  
     }))};

    const dropCourses = () => {
      console.log(selectedCourses);
      auth.dropCourse(selectedCourses);
    }
   

    return (
    <div className ="content">
        <CSRFToken />
          <div class="header">
            <div className="title">
              <h1>User Dashboard</h1>
               </div>
          </div>
            <div className="body">
              <div className="course_schedule">
              <div className="table_header"><h2>Course Schedule</h2></div> 
                <div className="table">
                  { registeredCourses.length > 0 ? <DataGrid sx={{border: 1, boxShadow: 1, borderColor: 'black'}} rows={loadCourseData(registeredCourses)} columns={columns} initialState={{
                      pagination: { paginationModel: { page: 0, pageSize: 5 }, }, }}
                      checkboxSelection
                      onRowSelectionModelChange= {(ids) => { setSelectedCourses(ids); }}
                      /> : <p>You are not registered for any courses currently!</p>}
                </div>
                {registeredCourses.length > 0 ? <button className="drop_button" onClick={dropCourses}>Drop Course</button> 
                : <p>Register <Link style={{textDecoration: 'none'}} to="/courses">here!</Link></p> }

              </div>

            <div className='feed'>
              <h2>Current News</h2>
            </div>  

            <div className='info'>
              {auth.user.is_staff ? <h2>Faculty Information</h2> : <h2>Student Information</h2>}
              <ul>
                <li>Username: {auth.user.username}</li>
                <li> First name: {auth.user.first_name}</li>
                <li>Last name: {auth.user.last_name}</li>
                <li>Current Balance: $0.00</li>
                  </ul>
            </div> 
          </div>

    </div>
    );
  
}