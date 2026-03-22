
import '../../asetss/style/pack-card.css'


const Card = ({pack_id, imageUrl, price, title, chooseCard, preview_list}) => {
    const handleChooseCard = () => {
        chooseCard({pack_id, imageUrl, preview_list})
    }
    return (
        <button onClick={(handleChooseCard)} className='card panel'>
            <div className='image-price__card'>
                <img className='image__card' src={imageUrl} alt="PackImage"/>
                 <div className='price__card'>{price} ₽</div>
            </div>
            <div className='title__card'>{title}</div>
            <div className='line__card'/>
            <div className='date__card'>1 day ago</div>
        </button>
    )
}

export default Card