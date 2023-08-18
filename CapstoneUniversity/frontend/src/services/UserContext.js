import React, {createContext, useState, useContext, useEffect} from 'react'
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

    const [user, setUser] = useState(null);

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
    
        return await axiosInstance.post("register/", body, config);
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

    
        return await axiosInstance.post("faculty/register/", body, config);
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
            if(response.data.username) {
                getUserData();
            } else {
                console.log("Could not find stored username.");
            }
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
        getUserData,
        register,
        facultyRegister,
        login,
        logout,
    }

}


export default UserProvider;