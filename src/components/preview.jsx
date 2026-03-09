import image from '../asetss/packImage.png'
import '../asetss/style/preview.css'


const Preview = () => {
    return (
        <div className='preview'>
            <img className='img__preview' src={image} alt="trackImage" />
            <div className='player__preview'></div>
            <div className='slider__preview'>
                <div className='visualize__preview'></div>
                <div className='timer__preview'></div>
            </div>
            <div className='info__preview'>
                <div className='name__preview'></div>
                <div className='dop-info__preview'>
                    <div className='type__preview'></div>
                    <div className='bpm__preview'></div>
                    <div className='key__preview'></div>
                </div>
            </div>
        </div>
    )
}

export default Preview