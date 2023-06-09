import React from 'react';
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
import UserProvider from './services/UserContext';


function App() {

  return (
   <UserProvider>
    <Container fluid className="App">
      <Routes>
      <Route path="/" element= { <Layout /> }>
      <Route exact path="/home" element={<HomePage />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/faculty/register" element={<FacultyRegister />} />
      <Route exact path="/students/feed" element={<StudentFeed /> }/>
      <Route exact path="/faculty/feed" element={<FacultyFeed />}/>
        </Route>
      </Routes>
   </Container>
   </UserProvider>
  );
}

export default App;
