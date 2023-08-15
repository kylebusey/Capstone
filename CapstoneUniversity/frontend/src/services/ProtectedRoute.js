import { useAuth } from "./UserContext"
import { Navigate, Outlet } from "react-router-dom";


export const ProtectedRoute = () => {
    let auth = useAuth();
  return (
      auth?.user && !auth?.loading ? <Outlet/> : <Navigate to='/login'/>
    )
  }


export const FacultyRoute = () => {
    let auth = useAuth();
  return (
      auth?.user.is_staff && !auth?.loading ? <Outlet/> : <Navigate to='/login'/>
    )
  }


