import React, { useEffect, useState } from 'react';
import '../../asetss/style/carousel.css';
import Card from './card';

const Carousel = ({chooseCard}) => {
  const [isHovering, setIsHovering] = useState(false);
   const [cardData, setCardData] = useState([]);

  const styleLeftButton = {
    opacity: isHovering ? 1 : 0,
    visibility: isHovering ? 'visible' : 'hidden',
    transform: isHovering ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'all 0.3s ease'
  };

  const styleRightButton = {
    opacity: isHovering ? 1 : 0,
    visibility: isHovering ? 'visible' : 'hidden',
    transform: isHovering ? 'translateX(0)' : 'translateX(100%)',
    transition: 'all 0.3s ease'
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWeight = 218.6;

  useEffect(() => {
    fetch('http://localhost:3000/pack') 
    .then(response => response.json()) 
    .then(data => {
      setCardData(data)
        if (data && data.length > 0) {
        chooseCard({
          pack_id: data[0].pack_id,
          imageUrl: data[0].pack_img_url,
          preview_list: data[0].preview_list
        });
        console.log(data)
      }
    }) 
    .catch(error => console.error('Ошибка:', error))
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 <= cardData.length - 5 ? prevIndex + 1 : prevIndex
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <div className="carousel-container">
      
      <div  onMouseEnter={() =>  setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}  className="carousel-wrapper">
        <div className='prev' style={styleLeftButton}>
        <button 
          className="carousel-button" 
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          ←
        </button>
        </div>

        <div className="carousel-viewport">
          <div 
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * cardWeight}px)`
            }}
          >
            {cardData.map((card) => (
                <Card pack_id={card.pack_id} imageUrl={card.pack_img_url} price={card.pack_price} title={card.pack_title} chooseCard={chooseCard} preview_list={card.preview_list}/>
            ))}
          </div>
        </div>
        <div className='next'  style={styleRightButton}>
        <button 
          className="carousel-button" 
          onClick={nextSlide}
          disabled={currentIndex >= cardData.length - 5}
        >
          →
        </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;