import { useEffect, useState, useRef } from 'react';
import '../asetss/style/modal.css'

const OtpModal = ({ show, onCloseButtonClick, otpConfirm}) => {
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const allFilled = otpCode.every(value => value !== '');
    setIsButtonActive(allFilled);
  }, [otpCode]);

  if (!show) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-wrapper')) {
      onCloseButtonClick();
    }
  };

  
  const handleKeyDown = (e, index) => {
    const input = e.target;
    const next = input.nextElementSibling;
    const prev = input.previousElementSibling;
    e.preventDefault();
    if (e.key === 'Backspace') { 
      if (input.value === '' && prev) {
        prev.focus();
      } else {
        input.value = '';
      }
      const newOtpCode = [...otpCode];
      newOtpCode[index] = input.value;
      setOtpCode(newOtpCode);
    }
    if (e.key >= '0' && e.key <= '9') {
      input.value = e.key; // Устанавливаем цифру сами
      const newOtpCode = [...otpCode];
      newOtpCode[index] = input.value;
      setOtpCode(newOtpCode);
    
      if (next) {
        next.focus();
      }
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await otpConfirm(otpCode.join(''))
      
    onCloseButtonClick();
    setOtpCode(['', '', '', '', '', ''])
  }

  return (
    <div className="modal-wrapper" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal__text">The access code was sent to the email "{}"</div>
        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otpCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className="otp-input"
                type="text"
                inputMode="numeric"
                maxLength="1"
                autoComplete="one-time-code"
                value={digit}
                onKeyDown={(e) => handleKeyDown(e, index)}
                autoFocus={index === 0}
              />
            ))}
          </div>
          <button className='confirm-button' type="submit"  disabled={!isButtonActive}>CONFIRM</button>
        </form>
      </div>
    </div>
  );
};

export default OtpModal;