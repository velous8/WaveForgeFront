import React, { useState } from 'react';
import '../../asetss/style/carousel.css';
import Card from './card';

const Carousel = () => {
  const [isHovering, setIsHovering] = useState(false);

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
  
  // Пример данных для карточек
  const cards = [
    { id: 1, title: 'Карточка 1', content: 'Содержимое карточки 1', color: '#ff6b6b' },
    { id: 2, title: 'Карточка 2', content: 'Содержимое карточки 2', color: '#4ecdc4' },
    { id: 3, title: 'Карточка 3', content: 'Содержимое карточки 3', color: '#45b7d1' },
    { id: 4, title: 'Карточка 4', content: 'Содержимое карточки 4', color: '#96ceb4' },
    { id: 5, title: 'Карточка 5', content: 'Содержимое карточки 5', color: '#ffeaa7' },
    { id: 6, title: 'Карточка 6', content: 'Содержимое карточки 6', color: '#dfe6e9' },
    { id: 7, title: 'Карточка 7', content: 'Содержимое карточки 7', color: '#fab1a0' },
    { id: 8, title: 'Карточка 8', content: 'Содержимое карточки 8', color: '#a29bfe' },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 <= cards.length - 5 ? prevIndex + 1 : prevIndex
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
            {cards.map((card) => (
                <Card></Card>
            ))}
          </div>
        </div>
        <div className='next'  style={styleRightButton}>
        <button 
          className="carousel-button" 
          onClick={nextSlide}
          disabled={currentIndex >= cards.length - 5}
        >
          →
        </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;