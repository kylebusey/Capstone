import React, {createContext, useState, useContext, useEffect} from 'react'
import axiosInstance from './axiosApi';
import Cookies from 'js-cookie';
import CSRFToken from "./CSRFToken";

export const UserContext = createContext();

export const useAuth = () => {
    return useContext(UserContext);
}

const UserProvider = ({ children }) => {
    const auth = useProvideAuth();
    return (
        <UserContext.Provider value={auth}>
            {children}
        </UserContext.Provider>
    )
}

const useProvideAuth = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState();
    const [error, setError] = useState(false);

    const getUserData = async () => {
      setLoading(true);

      return await axiosInstance.get("userinfo/").then((response) => setUser(response.data))
      .catch((err) => {
            setError(true);
      }).finally(() => setLoading(false));
    }
    
    const register = async (username, first_name, last_name, password) => {

        const body = JSON.stringify({username, first_name, last_name, password});
    
        return await axiosInstance.post("register/", body).catch((error) => {
            alert(error);
        });
    }

    const facultyRegister = async (username, first_name, last_name, password) => {
    
        const body = JSON.stringify({username, first_name, last_name, password});

        return await axiosInstance.post("faculty/register/", body).catch((error) => {
            alert(error);
        });
    }
    
    const logout = async () => {

        <CSRFToken/>

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
                withCredentials: true,
            }
        };

        return await axiosInstance.post("logout/", config).then(
            setUser(null));
      }

      const displayCourses = async () => {
        return await axiosInstance.get("courses/display");
      }

      const displayRegisteredCourses = async () => {
        return await axiosInstance.get("courseinfo/");
      }

      const displayTaughtCourses = async () => {
        return await axiosInstance.get("coursestaught/");
      }

      const createCourse = async (name, building, time, start_date, end_date, available) => {

        <CSRFToken/>

        const body = JSON.stringify({name, building, time, start_date, end_date, available});

        return await axiosInstance.post("courses/create", body);
      }

      const addCourse = async (courseID) => {

        <CSRFToken/>

        return await axiosInstance.post("courses/register", courseID);
      }

      const dropCourse = async (courseID) => {
        <CSRFToken/>
        await axiosInstance.post("courses/drop", courseID);
      }

      const deleteCourse = async (courseID) => {
        <CSRFToken/>
        await axiosInstance.post("courses/delete", courseID);
      }
    
    return {
        user,
        loading,
        error,
        getUserData,
        register,
        facultyRegister,
        logout,
        displayCourses,
        displayRegisteredCourses,
        displayTaughtCourses,
        createCourse,
        addCourse,
        dropCourse,
        deleteCourse
    }
}


export default UserProvider;