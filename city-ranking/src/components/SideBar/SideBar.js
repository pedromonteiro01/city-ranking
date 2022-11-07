import FiltersBox from '../FiltersBox/FiltersBox';
import Input from '../Input/Input';
import logo from './logo-without-bg.png';
import './SideBar.css';

const SideBar = () => {
    return (
        <div className='side-bar'>
            <div className='logo-wrapper'>
                <img src={logo} alt=''></img>
            </div>
            <div className='side-bar-items'>
                <FiltersBox />
                <Input />
            </div>
        </div>
    )
}

export default SideBar;