import { useState } from 'react';
import '../../asetss/style/preview-list.css'
import Preview from './preview'

const PreviewList = ({imageUrl, previews}) => {  
    const [currentTrack, setCurrentTrack] = useState(null)

    

    return (
        <div className='preview-list panel'> 
        <h2 className='title'>Preview Pack</h2>   
         {previews && previews.map((preview) => (
                <Preview 
                    imageUrl={imageUrl}
                    link={preview.file_key}
                    title={preview.title}
                    style={preview.style}
                    bpm={preview.bpm}
                    tonality={preview.key}
                    isPlaying={currentTrack === preview.id}
                    onPlay={() => {setCurrentTrack(preview.id)}}
                    offPlay={() => {setCurrentTrack(null)}}
                />
            ))}    

        </div>
    )
}

export default PreviewList