import {React} from "react"
import './form.css';
import capstoneLogo from '../../assets/CapLogo.png';
import CSRFToken from "../../services/CSRFToken";
import { useAuth } from "../../services/UserContext";


export default function UserDashboard() {

   const auth = useAuth();

    return (
      <div className="main_container">
        <CSRFToken />
          <div class="logo"><img src ={capstoneLogo}/></div>
          <div className="title"><h1>User Dashboard</h1></div>
          
      </div>
    );
  
}