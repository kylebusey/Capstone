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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
            
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
                withCredentials: true,
            }
        };
   

      return await axiosInstance.get("userinfo/", config).then((response) => {
        setUser(response.data);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
    
    const login = async (username, password) => {

        const body = JSON.stringify({username, password});

        return await axiosInstance.post("login/", body).then((response) => {
            if(response.data.username) {
                getUserData();
            } 
        }).catch((error) => {
            alert(error);
        })
    };

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


      const createCourse = async (name, building, time, start_date, end_date, available) => {

        <CSRFToken/>

        const body = JSON.stringify({name, building, time, start_date, end_date, available});

        return await axiosInstance.post("courses/create", body);
      }

      const addCourse = async (courseID) => {

        <CSRFToken/>

        return await axiosInstance.post("courses/register", courseID);
      }
    
    return {
        user,
        loading,
        error,
        getUserData,
        register,
        facultyRegister,
        login,
        logout,
        displayCourses,
        createCourse,
        addCourse
    }
}


export default UserProvider;