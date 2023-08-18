import { useAuth } from "./UserContext"
import { Navigate, Outlet } from "react-router-dom";



export const ProtectedRoute = () => {
   let auth = useAuth();

  return (
      auth?.user ? <Outlet/> : <Navigate to='/login'/>
    )
  }


export const FacultyRoute = () => {
    let auth = useAuth();

    if(auth.user) {
      return (
        auth?.user.is_staff ? <Outlet/> : <Navigate to='/unauthorized'/>
      );
    } else {
      return (<Navigate to='/login'/>);
    }
 
  }


