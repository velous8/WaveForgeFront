import { Link } from 'react-router-dom'
import '../asetss/style/header.css'
import logo from '../asetss/Group 266.svg'
import EmailModal from './emailModal'
import OtpModal from './otpModal'
import { useState } from 'react'

const Header = () => {
        const [showEmailModal, setShowEmailModal] = useState(false);
        const [showOtpModal, setShowOtpModal] = useState(false);
        const [email, setEmail] = useState('')

    const openEmailModal = () => {
        setShowEmailModal(true)
    }
    const openOtpModal = (isEmailSend, userEmail) => {       
        if(isEmailSend){
            setShowOtpModal(true)
            setEmail(userEmail)
            setShowEmailModal(false)        
        }
    }
    const clouseModal = () => {
        setShowEmailModal(false)
        setShowOtpModal(false)
    }

    const emailConfirm = async (email) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}auth/code-generate`, {
            method: "POST",
            body: JSON.stringify({
              email: email ,
              packId: '00000000-0000-0000-0000-000000000000'
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        })
        const data = await response.json();
        if(!data.send) {
            alert(data.message)
        }
        await openOtpModal(data.send, email);    
    }
    const otpConfirm = async (code) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}relink`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          code: code
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
    }
    return (
        <header className='header'>
            <EmailModal show={showEmailModal} onCloseButtonClick={clouseModal} openOtpModal={openOtpModal}  emailConfirm = {emailConfirm} />
            <OtpModal show={showOtpModal} onCloseButtonClick={clouseModal} otpConfirm = {otpConfirm}/>
            <div className='wraper__header'>
                <div className='logo'>
                    <img className='logoWaveForge' src={logo} alt="LogoWaveForge" />
                    <p className='logoName'>WaveForge</p>
                </div>
            
                <nav className='nav'>         
                    <Link to="/">Main</Link>
                    <Link to="/store">Store</Link>
                    <Link onClick={openEmailModal} to="#">Relink</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header