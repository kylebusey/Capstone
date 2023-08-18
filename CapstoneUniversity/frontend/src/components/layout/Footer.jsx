import { Link } from "react-router-dom";
import './Footer.css';
import Twitter from "../../assets/Twitter.png"
import Linkedin from "../../assets/Linkedin.png" 
import Instagram from "../../assets/Instagram.png" 
import Youtube from "../../assets/Youtube.png" 
import Facebook from "../../assets/Facebook.png" 

export default function Footer() {
    return (
      <div className ="footer">
        <div className="footer-links">
        <Link className="item" style={{textDecoration: 'none'}} ><p>About Us</p></Link>
        <Link className="item" style={{textDecoration: 'none'}} ><p>Privacy Notice</p></Link>
        <Link className="item" style={{textDecoration: 'none'}} ><p>Terms of Use</p></Link>
        </div>

        <div className="footer_text">
          <p>100 College Parkway | Capstone, MI 20001</p>
        </div>

        <div className="social_media_imgs">
          <img className ="img" src = {Twitter} alt = "Twitter" />
          <img className ="img" src = {Linkedin} alt = "Linkedin" />
          <img className ="img" src = {Instagram} alt = "Instagram" />
          <img className ="img" src = {Youtube} alt = "Youtube" />
          <img className ="img" src = {Facebook} alt = "Facebook" />
        </div>

      </div>
    );
  };