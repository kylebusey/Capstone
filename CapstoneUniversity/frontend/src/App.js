import React, { useEffect } from 'react';
import './App.css';
import Container from "react-bootstrap/Container";
import { Route, Routes} from 'react-router-dom';
import Layout from './components/layout/Layouts';
import HomePage from './components/HomePage';
import Login from './components/user/Login';
import Register from './components/user/Register';
import FacultyRegister from './components/user/FacultyRegister';
import StudentFeed from './components/feed/StudentFeed';
import FacultyFeed from './components/feed/FacultyFeed';
import Unauthorized from './components/unauthorized';
import CourseDisplay from './components/user/CourseDisplay';
import UserProvider from './services/UserContext';
import { FacultyRoute, ProtectedRoute } from './services/ProtectedRoute';
import icon from './assets/favicon.ico';
import CourseCreate from './components/user/CourseCreate';
import UserDashboard from './components/user/Dashboard';



function App() {

  useEffect(() => {
      const favicon = document.getElementById('favicon');
      favicon.setAttribute('href', icon);
  }, []);

  return (
   <UserProvider>
    <Container fluid className="App">
      <Routes>
      <Route path="/" element= { <Layout /> }>
      <Route exact path="/home" element={<HomePage />} />
      <Route exact path="/unauthorized" element={<Unauthorized />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/faculty/register" element={<FacultyRegister />} />
      <Route element={<ProtectedRoute />}>
      <Route exact path="/courses" element={<CourseDisplay /> }/>
      </Route>
      <Route element={<ProtectedRoute />}>
      <Route exact path="/dashboard" element={<UserDashboard /> }/>
      </Route>
      <Route element={<ProtectedRoute />}>
      <Route exact path="/students/feed" element={<StudentFeed /> }/>
      </Route>
      <Route element={<FacultyRoute />}>
      <Route exact path="/faculty/feed" element={<FacultyFeed />}/>
      </Route>
      <Route element={<FacultyRoute />}>
      <Route exact path="/courses/create" element={<CourseCreate />}/>
      </Route>
        </Route>
      </Routes>
   </Container>
   </UserProvider>
  );
}

export default App;
