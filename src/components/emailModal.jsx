import { useEffect, useState } from 'react';
import '../asetss/style/modal.css'

const EmailModal = ({ show, onCloseButtonClick, openOtpModal, emailConfirm }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  if (!show) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-wrapper')) {
      onCloseButtonClick();
    }
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const emailValue = formData.get('email');
    setIsLoading(true);
    await emailConfirm(emailValue)
    setEmail('')
    setIsLoading(false);
  }

  return (
    <div className="modal-wrapper" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal__text">Enter the email address to which the download link should be sent.</div>
        <form onSubmit={handleSubmit}>
          
          <div class="group">      
            <input name="email"
              onChange={(e) => {setEmail(e.target.value)}}
              required autoComplete="one-time-code"/>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Email</label>
          </div>
          <button className='confirm-button'  disabled={!isValidEmail(email) || isLoading} type="submit">СONFIRM</button>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;