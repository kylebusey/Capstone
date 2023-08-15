import React, {createContext, useState, useContext} from 'react'
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

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);

 
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
      });
    }

    
    const register = async (username, first_name, last_name, password) => {
    
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        };
    
        const body = JSON.stringify({username, first_name, last_name, password});
    
        return await axiosInstance.post("register/", body, config).then((response) => {
            setUser(response.data);
        })
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

        setLoading(true);
    
        return await axiosInstance.post("faculty/register/", body, config).then((response) => {
            setUser(response.data);
            setLoading(false);
        });
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

        setLoading(true);
    
        return await axiosInstance.post("login/", body, config).then((response) => {
            setUser(response.data);
            setLoading(false);
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
      }
    
    
    return {
        user,
        loading,
        getUserData,
        register,
        facultyRegister,
        login,
        logout,
    }

}


export default UserProvider;