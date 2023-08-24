import { useEffect, useState } from "react";
import { useAuth } from "./UserContext"
import { Navigate, Outlet } from "react-router-dom";



export const ProtectedRoute = () => {
   let auth = useAuth();

   if(auth.loading) {
    return <h2>Loading...</h2>;
  }

  return (
      auth?.user ? <Outlet/> : <Navigate to='/login'/>
    )
  }


export const FacultyRoute = () => {
    let auth = useAuth();

    if(auth.loading) {
      return <h2>Loading...</h2>;
    }

    if(auth.user) {
      return (
        auth?.user.is_staff ? <Outlet/> : <Navigate to='/unauthorized'/>
      );
    } else {
      return (<Navigate to='/login'/>);
    }
 
  }


