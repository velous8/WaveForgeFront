import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../asetss/style/main.css'
import Carousel from '../components/carousel/carousel'
import PreviewList from '../components/previewList/previewList'

const Main = () => {
    const [previews, setPreviews] = useState([])

 

    return (
        <div className="main">
            <header className="header__main">
                <div className='text_main'>
                    <h1 className='title__main'>PROFESSIONAL <br/> MUSIC  SAMPLE  PACKS</h1>
                    <h2 className='description__main'>INSTANTLY BOOST YOUR CREATIVE</h2>
                </div>
            </header>
            <main>
                <div className='featured-packs'>
                    <h2 className='title__featured-packs'>Featured Packs</h2>
                    <Carousel chooseCard={(previewsData) => setPreviews(previewsData)}/>
                </div>
                <div className='info-pack'>
                    <div className='preview-pack'>
                        <Link className='pack__link' to={`/pack/${previews.pack_id}`}>info about the pack</Link>
                        <PreviewList 
                        imageUrl={previews.imageUrl}
                        previews = {previews.preview_list}

                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Main