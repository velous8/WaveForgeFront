
import '../../asetss/style/preview.css'
import { useState, useRef, useEffect } from 'react';
import { AudioVisualizer } from 'react-audio-visualize';

const Preview = ({imageUrl, link, title, style, bpm, tonality, isPlaying, onPlay, offPlay}) => {
    const [blob, setBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    
    // Загрузка тестового аудио
    useEffect(() => {
        const loadTestAudio = async () => {
            try {
                offPlay()
                const response = await fetch(link);
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
    }, [link]);
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();      
            } else {
                audioRef.current.pause();
                audioRef.current.currentTime = 0
            }  
        }
    }, [isPlaying]);

    const handlePlay = () => {
        if(!isPlaying){
            onPlay()
        } else {
            offPlay()
        }
        
    }

    
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
        audioRef.current.pause();
        offPlay()
    };

    return (
        <div className='preview'>        
            <img className='image__preview' src={imageUrl} alt="imagePack" />
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
                    onClick={handlePlay}
                    disabled={!audioUrl}
                    style={{backgroundColor: isPlaying ? '#1CE8AB' : '#202020'}}
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
            <div className='info__preview'>
                <div className='name__preview'>{title}</div>
                <div className='dop-info__preview'>
                    <div className='type__preview'>{style}</div>
                    <div className='bpm__preview'>{bpm}</div>
                    <div className='key__preview'>{tonality}</div>
                </div>
            </div>
        </div>
    )
}

export default Preview