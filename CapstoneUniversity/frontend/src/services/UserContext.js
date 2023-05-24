import React, {createContext, useState, useContext} from 'react'
import { useEffect } from 'react';
import axiosInstance from './axiosApi';
import Cookies from 'js-cookie';


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

    useEffect(() => {
        getUserData()
      }, []);

    const [user, setUser] = useState(null)
    const [isFaculty, setIsFaculty] = useState(false)

    const register = async (username, first_name, last_name, password) => {
    
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        };
    
        const body = JSON.stringify({username, first_name, last_name, password});
    
        return await axiosInstance.post("register/", body, config).then(getUserData());
    }


    const facultyRegister = async (username, first_name, last_name, password) => {
    
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        };
    
        const body = JSON.stringify({username, first_name, last_name, password});
    
        return await axiosInstance.post("faculty/register/", body, config).then(getUserData());
    }
    
    const login = async (username, password) => {
    
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        };
    
        const body = JSON.stringify({username, password});
    
        return await axiosInstance.post("login/", body, config).then((response) => {
            setUser(response.data);
            setIsFaculty(response.data.is_staff);
        });
      }

    const logout = async () => {
    
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        };

        return await axiosInstance.post("logout/", config).then(
            setUser(null));
            setIsFaculty(false);
      }
    
    const getUserData = async () => {
            
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
                withCredentials: true,
            }
        };
    
        return axiosInstance.get("userinfo/", config).then((response) => {
            setUser(response.data);
            setIsFaculty(response.data.is_staff);
        });  
    }

    return {
        user,
        isFaculty,
        register,
        facultyRegister,
        login,
        logout,
        getUserData
    }

}


export default UserProvider;