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

    const[user, setUser] = useState(null)

    const register = async (username, first_name, last_name, password) => {
    
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        };
    
        const body = JSON.stringify({username, first_name, last_name, password});
        console.log(body)
    
        return await axiosInstance.post("register/", body, config).then(getUserData());
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
    
        return await axiosInstance.post("login/", body, config).then(getUserData());
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
        });  
    }

    return {
        user,
        register,
        login,
        getUserData
    }

}


export default UserProvider;