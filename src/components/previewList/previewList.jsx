import { useState } from 'react';
import '../../asetss/style/preview-list.css'
import Preview from './preview'

const PreviewList = () => {  
    const [currentTrack, setCurrentTrack] = useState(null)

    const previews = [
        { id: 1, link: 'https://d2wxqn8zvcy925.cloudfront.net/mp3/V3FAqvbrQtP7VHDjReH6e9lzQlpc7fpOWxeAJFHU246732WLfnJ.mp3', title: 'preview 1', type: 'drill', bpm: '130bpm', tonality: 'D minor' },
        { id: 2, link: 'https://d2wxqn8zvcy925.cloudfront.net/mp3/V3FAqvbrQtP7VHDjReH6e9lzQlpc7fpOWxeAJFHU246732WLfnJ.mp3', title: 'preview 2', type: 'drill', bpm: '130bpm', tonality: 'D minor' },
        { id: 3, link: 'https://d2wxqn8zvcy925.cloudfront.net/mp3/V3FAqvbrQtP7VHDjReH6e9lzQlpc7fpOWxeAJFHU246732WLfnJ.mp3', title: 'preview 3', type: 'drill', bpm: '130bpm', tonality: 'D minor' },
        { id: 4, link: 'https://d2wxqn8zvcy925.cloudfront.net/mp3/V3FAqvbrQtP7VHDjReH6e9lzQlpc7fpOWxeAJFHU246732WLfnJ.mp3', title: 'preview 4', type: 'drill', bpm: '130bpm', tonality: 'D minor' },
    ];

    

    return (
        <div className='preview-list panel'> 
        <h2 className='title'>Featured Packs</h2>   
         {previews.map((preview) => (
                <Preview 
                    link={preview.link}
                    title={preview.title}
                    type={preview.type}
                    bpm={preview.bpm}
                    tonality={preview.tonality}
                    isPlaying={currentTrack === preview.id}
                    onPlay={() => {setCurrentTrack(preview.id)}}
                    offPlay={() => {setCurrentTrack(null)}}
                />
            ))}    

        </div>
    )
}

export default PreviewList