import image from '../../asetss/packImage.png'
import '../../asetss/style/preview.css'
import Player from './player'

const Preview = () => {

    
    return (
        <div className='preview'>        
            <img className='image__preview' src={image} alt="imagePack" />
            <Player/>
            <div className='info__preview'>
                <div className='name__preview'>(switchup) cammino lento 140 a#minor.wav</div>
                <div className='dop-info__preview'>
                    <div className='type__preview'>drill</div>
                    <div className='bpm__preview'>130bpm</div>
                    <div className='key__preview'>D minor</div>
                </div>
            </div>
        </div>
    )
}

export default Preview