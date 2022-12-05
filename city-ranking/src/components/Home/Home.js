import './Home.css';
import {
    faLinkedin,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pedro from './profile.jpeg';

const Home = (props) => {
    return (
        <div className='home'>
            <div className='home-header'>
                CityRanking
            </div>
            <div className='button-home-wrapper'>
                <button className='home-button' onClick={() => setTimeout(props.onClick, 1000)}>Discover</button>
            </div>
            <div className='home-about'>
                <h3>About</h3>
                <p>Project developed within the Data Visualization course. It consists of in the
                    conceptualization and implementation
                    of a prototype of a simple application for visual exploration.
                </p>
            </div>
            <div className='authors'>
                <div className='authors-wrapper'>
                    <div className='author-image-wrapper'>
                        <img src={pedro} />
                    </div>
                    <div className='author-info'>
                        <p className='author-name'>Pedro Monteiro</p>
                        <p className='author-email'>pmapm@ua.pt</p>
                    </div>
                    <div className='author-social'>
                        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon className="social-icon" icon={faLinkedin} />
                        </a>
                        <a href="https://github.com/pedromonteiro01" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon className="social-icon" icon={faGithub} />
                        </a>
                    </div>
                </div>
                <div className='authors-wrapper'>
                    <div className='author-image-wrapper'>
                        <img src={pedro} />
                    </div>
                    <div className='author-info'>
                        <p className='author-name'>Eduardo Fernandes</p>
                        <p className='author-email'>eduardofernandes@ua.pt</p>
                    </div>
                    <div className='author-social'>
                        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon className="social-icon" icon={faLinkedin} />
                        </a>
                        <a href="https://github.com/pedromonteiro01" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon className="social-icon" icon={faGithub} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;