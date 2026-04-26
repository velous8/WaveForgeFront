import { useParams,  Link  } from 'react-router-dom';
import '../asetss/style/pack.css';
import countLogo from '../asetss/CountLogo.svg'
import styleLogo from '../asetss/StyleLogo.svg'
import { useEffect, useState } from 'react';
import PreviewList from '../components/previewList/previewList';
import EmailModal from '../components/emailModal'
import OtpModal from '../components/otpModal';

const Pack = () => {
    const [packData, setPackData] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [email, setEmail] = useState('');

    const { packId } = useParams(); 

    useEffect(() => {
        setLoading(true);    
        fetch(`${process.env.REACT_APP_API_URL}pack/${packId}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                return response.json();
            }) 
            .then(data => {   
                console.log(data)      
                setPackData(data);
                setLoading(false);
            }) 
            .catch(error => {
                console.error('Ошибка:', error);
                setLoading(false);
            });
    }, []);

    // Показываем загрузку
    if (loading) {
        return <main className='pack'>Загрузка...</main>;
    }

    // Проверяем, что данные существуют
    if (!packData) {
        return <main className='pack'>Данные не найдены</main>;
    }


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
              packId: packId
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
        })
        const data = await response.json();
        if(!data.send) {
            alert('Ошибка при генерации кода. Возможно данный пак уже зарегестрирован на этот email.')  
        }
        await openOtpModal(data.send, email);    
    }
    const otpConfirm = async (code) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}buy`, {
                method: "POST",
                body: JSON.stringify({
                  email: email,
                  packId: packId,
                  code: code
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                }
            })
            const data = await response.json();
            if(!data.confirmation_url){
                alert('Код неподтвержден')
                throw new Error('Код неподтвержден')
            }
            window.open(data.confirmation_url, '_blank', 'noopener,noreferrer');
        } catch (error) {
            return error
        }
        
    }

    return (
        <main className='pack'>
            <EmailModal show={showEmailModal} onCloseButtonClick={clouseModal} openOtpModal={openOtpModal}  emailConfirm = {emailConfirm} />
            <OtpModal show={showOtpModal} onCloseButtonClick={clouseModal} otpConfirm = {otpConfirm}/>
            <div className='pack__info'>
                
                <img 
                    className='pack__image' 
                    src={packData.pack_img_url} 
                    alt={packData.pack_title} 
                />
                
                <div className='pack__dop-imfo'>
                    <h1 className='pack__name'>
                        {packData.pack_title}
                    </h1>
                    
                    <div className='pack__count-and-style'>
                        <div className='pack__count'>
                            <img src={countLogo} alt="count" /> {packData.previews_count} Samples
                        </div>
                        <div className='pack__style'>
                            <img src={styleLogo} alt="count" /> {packData.pack_style}
                        </div>
                    </div>
                    
                    <div className='pack__description'>
                        {packData.pack_description || 'Sorrows. is a collection of shoegaze and grunge inspired samples built for dark, guitar beats. live played guitars, vocals, and deep bass come together to create a heavy, washed sound. drawing from the atmosphere of don toliver, yeat, bnyx, and homixide gang.'}
                        <br/><br/>
                        {packData.pack_description || 'Posted on January 19, 2026'}
                    </div>
                    
                    <div className='pack__buy'>
                        <p className='pack__price'>
                            {`${packData.pack_price} ₽`}
                        </p>
                        <button className='pack__button-buy' onClick={openEmailModal}>
                            BUY NOW
                        </button>
                    </div>
                </div>
                
                <div className='pack__license'>
                    <div className='license__title'>Royalty-Free License</div>
                    <ul className='license__paragraphs'>
                        <li>Use in commercial & non-commercial projects</li>
                        <li>No atribution required</li>
                        
                    </ul>
                    <Link className='license_link' to='/'>View full license</Link>
                </div>
            </div>
            <PreviewList  
                imageUrl={packData.pack_img_url}
                previews = {packData.preview_list}
            />
        </main>
    );
};

export default Pack;