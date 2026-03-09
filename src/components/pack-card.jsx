import image from '../asetss/packImage.png'
import '../asetss/style/pack-card.css'


const Card = () => {
    return (
        <div className='card panel'>
            <div className='image-price__card'>
                <img className='image__card' src={image} alt="PackImage"/>
                 <div className='price__card'>$19</div>
            </div>
            <div className='title__card'>The Soulful Keys Vol.2</div>
            <div className='line__card'/>
            <div className='date__card'>1 day ago</div>
        </div>
    )
}

export default Card