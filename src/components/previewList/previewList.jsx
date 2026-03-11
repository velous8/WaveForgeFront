import '../../asetss/style/preview-list.css'
import Preview from './preview'

const PreviewList = () => {  
    return (
        <div className='preview-list panel'> 
        <h2 className='title'>Featured Packs</h2>       
           <Preview/>
           <Preview/>
           <Preview/>
           <Preview/>
        </div>
    )
}

export default PreviewList