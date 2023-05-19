import feedpic1 from '../../assets/feedpic1.jpeg';
import feedpic2 from '../../assets/feedpic2.png';
import feedpic3 from '../../assets/feedpic3.png';
import './FeedPage.css';

export default function FeedPage() {
  return (
    <div className='main_container'>
      <div className='main_title'>
      <h1>School News</h1>
      </div>


      
    <div className='news-container'>
      <div className='picture-one'>
        <img className='feedpic' alt = "School News 1" src={feedpic1}/>
      </div>
    
      <div className='picture-two'>
      <img className='feedpic' alt = "School News 2" src={feedpic2}/>
      </div>

      <div className='picture-three'>
      <img className='feedpic' alt = "School News 3" src={feedpic3}/>
      </div>

      </div>
    </div>
  );
}