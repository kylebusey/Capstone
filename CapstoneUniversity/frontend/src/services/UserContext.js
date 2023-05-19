import React, {createContext, useState, useContext} from 'react'


export const UserContext = createContext();


export const useAuth = () => {
    return useContext(UserContext);
}

const UserProvider = (props) => {

    const[user, setUser] = useState(null)

    const value = {
        user,
        setUser,
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
    

}

export default UserProvider;