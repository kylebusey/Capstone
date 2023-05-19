import axios from 'axios'
import Cookies from 'js-cookie';


export const axiosInstance = axios.create({
    baseURL: '/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
    }
    
});


export const register = async (username, first_name, last_name, password) => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({username, first_name, last_name, password});
    console.log(body)

    return await axiosInstance.post("register/", body, config);
}

export const login = async (username, password) => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({username, password});
    console.log(body)

    return axiosInstance.post("login/", body, config);
  }

  export const getUserData = async () => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
            withCredentials: true,
        }
    };

    return axiosInstance.get("userinfo/", config).then(response => {
        console.log(response.data);
        console.log(response.data.username);
        console.log(response.data.first_name);
        console.log(response.data.last_name);
        console.log(response.data.is_staff);
    });
  }





export default axiosInstance