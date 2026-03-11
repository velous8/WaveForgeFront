import '../asetss/style/main.css'
import Carousel from '../components/carousel/carousel'
import PreviewList from '../components/previewList/previewList'

const Main = () => {
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
                    <h2 className='title'>Featured Packs</h2>
                    <Carousel></Carousel>
                </div>
                <div className='info-pack'>
                    <div className='preview-pack'>
                        <PreviewList/>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Main