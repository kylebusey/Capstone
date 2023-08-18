import { Link } from "react-router-dom"
import { useAuth } from "../../services/UserContext"
import { Button } from "react-bootstrap";

export function LoginComponent() {

    const auth = useAuth();

    return (
        <div className='conditional_item'>
            {auth.user && auth.user.username ? [<UserGreetings username={auth.user.username}/>, <LogoutButton logout={auth.logout} />] : [<LoginButton/>, <RegisterButton/>]}
        </div>
    );
}

export function LoginButton() {
    return (<Link style={{textDecoration: 'none'}} to="/login"><p>Log In</p></Link>);
 }

 export function RegisterButton() {
    return (<Link style={{textDecoration: 'none'}} to="/register"><p>Get Started</p></Link>);
 }


export function LogoutButton(props) {
   return (<Button onClick={props.logout}>Logout</Button>);
}

export function UserGreetings(props) {
    return <p>Hello {props.username}!</p>;
}


    


