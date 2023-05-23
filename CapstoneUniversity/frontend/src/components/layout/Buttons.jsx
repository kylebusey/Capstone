import { Link } from "react-router-dom"
import { useAuth } from "../../services/UserContext"


export function ConditionalButton() {

    const auth = useAuth();

    if(auth.user && auth.user.username) {
        return (<LogoutButton />);
    } else {
        return (<LoginButton />);
    }

}

export function LoginButton() {
    return (<Link style={{textDecoration: 'none'}} to="/login"><p>Log In</p></Link>);
 }

export function LogoutButton() {
   return (<Link style={{textDecoration: 'none'}} to="/logout"><p>Logout</p></Link>);
}


