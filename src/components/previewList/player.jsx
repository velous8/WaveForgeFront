

import '../../asetss/style/player.css'
import React, { useState, useRef, useEffect } from 'react';
import { AudioVisualizer } from 'react-audio-visualize';

const Player = () => {
    const [blob, setBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    
    // Загрузка тестового аудио
    useEffect(() => {
        const loadTestAudio = async () => {
            try {
                const response = await fetch('https://d2wxqn8zvcy925.cloudfront.net/mp3/V3FAqvbrQtP7VHDjReH6e9lzQlpc7fpOWxeAJFHU246732WLfnJ.mp3');
                const audioBlob = await response.blob();
                setBlob(audioBlob);
                
                const url = URL.createObjectURL(audioBlob);
                setAudioUrl(url);
            } catch (error) {
                console.error('Ошибка загрузки:', error);
            }
        };
        
        loadTestAudio();
        
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, []);
    
    // Установка длительности при загрузке метаданных
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };
    
    // Обновление текущего времени
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };
    
    // Play/Pause
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    
    // Перемотка по клику на визуализатор
    const handleVisualizerClick = (event) => {
        if (audioRef.current && canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const percentage = clickX / rect.width;
            const newTime = percentage * duration;
            
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };
    
    // Форматирование времени
    const formatTime = (seconds) => {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    
    // Обработка окончания трека
    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };
    
    
    return (
        <div className='player'>
            {/* Скрытый аудио элемент */}
            {audioUrl && (
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                />
            )}

            {/* Кнопка Play/Pause */}
            <button className='player__button'
                onClick={togglePlay}
                disabled={!audioUrl}
                style={{
        backgroundColor: isPlaying ? '#1CE8AB' : '#202020'
    }}
            >
                {isPlaying ? '⏸' : '▶'}
            </button>

            {/* Визуализатор как слайдер */}
            {blob && (
                <div 
                    ref={canvasRef}
                    onClick={handleVisualizerClick}
                >
                    <AudioVisualizer
                        blob={blob}
                        width={340}
                        height={49}
                        barWidth={2}
                        gap={1}
                        barColor="#202020"
                        barPlayedColor="#1CE8AB"
                        currentTime={currentTime}
                    />
                </div>
            )}
            {/* Время */}
            <div className='player__time'>
                {formatTime(currentTime)} / {formatTime(duration)}
            </div>    
        </div>
    );
};

export default Player ;