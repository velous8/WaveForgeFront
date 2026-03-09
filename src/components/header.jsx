import { Link } from 'react-router-dom'
import '../asetss/style/header.css'
import logo from '../asetss/Group 266.svg'

const Header = () => {
    return (
        <header className='header'>
            <div className='wraper__header'>
                <div className='logo'>
                    <img className='logoWaveForge' src={logo} alt="LogoWaveForge" />
                    <p className='logoName'>WaveForge</p>
                </div>
            
                <nav className='nav'>         
                    <Link to="/">Main</Link>
                    <Link to="/pack">Pack</Link>
                    <Link to="/store">Store</Link>
                    <Link to="#">Relink</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header