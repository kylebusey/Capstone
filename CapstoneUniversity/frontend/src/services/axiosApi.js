import axios from 'axios'
import Cookies from 'js-cookie';
import { useAuth } from './UserContext';


export const axiosInstance = axios.create({
    baseURL: '/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
    }
    
});


export default axiosInstance