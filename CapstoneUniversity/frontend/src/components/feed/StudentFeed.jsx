import feedpic1 from '../../assets/feedpic1.jpeg';
import theatre from '../../assets/theatre.jpeg';
import ncaa from '../../assets/collegebasketball.webp';
import { Link } from "react-router-dom";
import './FeedPage.css';

export default function FeedPage() {
  return (
    <div className='main_container'>


        <div className='title'>
          <h1>STUDENT FEED</h1>
        </div>


        <div className='flex-container'>

        <div className='side_panel'>
          <div className='top-descriptor'>
            <h2>Overview</h2>
            <p>
            Use your feed page to see current information, upcoming events, and school resources to make your school experience as smooth as possible.
            </p>
          </div>

          <div className='other-resources'>
              <h2>Other Resources</h2>
                <ul>
                  <Link to='/dashboard'><li>View Course Schedule</li></Link>
                  <Link to='/counseling'><li>Counseling Center</li></Link>
                  <Link to='/library'><li>Library Hours</li></Link>
                  <Link to='/advising'><li>Contact an Advisor</li></Link>
                </ul>
          </div>

        </div>
      
        <div className='news-container'>
          <div className='picture-one'>
            <img className='feedpic' alt = "School News 1" src={feedpic1}/>
            <div className='date-header'><h2>October 2nd</h2></div>
            <hr/>
            <div className='date-subheader'><h3>Library Career Session</h3></div>
            <div className='event-description'><p>Join our career coordinator for an information session at 4:00 PM to go over tips and tricks for finding a job that works for you.
               The Q&A session starts at 5:30 PM. You won't want to miss this!</p></div>
          </div>
    
            <div className='picture-two'>
              <img className='feedpic' alt = "School News 2" src={theatre}/>
              <div className='date-header'><h2>October 25th</h2></div>
              <hr/>
              <div className='date-subheader'><h3>School Theatre Night</h3></div>
              <div className='event-description'><p>Come see our Theatre group perform a play with showtimes at 6:00 PM and 8:00 PM. Tickets start at $19.99 and can be purchased at the door.</p></div>
            </div>

            <div className='picture-three'>
              <img className='feedpic' alt = "School News 3" src={ncaa}/>
              <div className='date-header'><h2>November 4th</h2></div>
              <hr/>
              <div className='date-subheader'><h3>Basketball Game State Championship</h3></div>
              <div className='event-description'><p>Our basketball team is in the state championship and will play at home at 5:30 PM. </p></div>
            </div>
        </div>

        </div>
    </div>
  );
}