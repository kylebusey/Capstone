import { Link } from "react-router-dom"
import { useAuth } from "../../services/UserContext"
import { Button } from "react-bootstrap";

export function ConditionalButton() {

    const auth = useAuth();

    if(auth.user && auth.user.username) {
        return (<LogoutButton logout={auth.logout} />);
    } else {
        return (<LoginButton />);
    }
}

export function LoginButton() {
    return (<Link style={{textDecoration: 'none'}} to="/login"><p>Log In</p></Link>);
 }

export function LogoutButton(props) {
   return (<Button onClick={props.logout}>Logout</Button>);
}


