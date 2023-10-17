import { useEffect, useState } from "react";
import { useAuth } from "./UserContext"
import { Navigate, Outlet } from "react-router-dom";



export const ProtectedRoute = () => {

  const [authorized, setAuthorized] = useState();

   let auth = useAuth();

   useEffect(() => {
    const authorize = async () => {
      try {
      await auth.getUserData();
      setAuthorized(true);
      } catch (err) {
        setAuthorized(false);
      }
    }

    authorize();
    
   }, [])

   if(authorized === undefined) {
    return <h2>Loading...</h2>;
  } 

  return (
      auth.user && authorized ? <Outlet/> : <Navigate to='/login'/>
    );
  }


export const FacultyRoute = () => {

  const [authorized, setAuthorized] = useState();

  let auth = useAuth();

    useEffect(() => {
      const authorize = async () => {
        try {
        await auth.getUserData();
        setAuthorized(true);
        } catch (err) {
          setAuthorized(false);
        }
      }
  
      authorize();
      
     }, [])
  
     if(authorized === undefined) {
      return <h2>Loading...</h2>;
    }

    if(auth.user) {
      return (
        auth?.user.is_staff && authorized ? <Outlet/> : <Navigate to='/unauthorized'/>
      );
    } else {
      return (<Navigate to='/login'/>);
    }
 
  }


