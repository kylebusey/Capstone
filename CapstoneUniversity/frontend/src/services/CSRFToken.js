import React, { useState, useEffect } from 'react';
import axiosInstance from "../services/axiosApi";

const CSRFToken = () => {

    const [csrftoken, setcsrftoken] = useState('');

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    useEffect(() => {
        UpdateCSRF();
    }, []);

    const UpdateCSRF = () => {
        const fetchData = async () => {
            try {
                await axiosInstance.get('auth/token/');
                console.log("Token has been retrieved");
            } catch (err) {
                console.log("Unable to retrieve token", err);
            }
        };
        
        fetchData();
        setcsrftoken(getCookie('csrftoken'));
    }

    return (
        <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken} />
    );
};

export default CSRFToken;
