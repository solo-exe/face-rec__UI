import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div className='ma5 mt0'>
            <p className = 'f3 b'>
                {'This Magic App will detect faces of those who absolutely need to watch Anime. Give it a try!!!'}
            </p>
            <div className='center'>
                <div className=' form center shadow-5 br3 pa4'>
                    <input 
                    className='f4 pa2 w-70 center' type='text' 
                    onChange={onInputChange} placeholder='Enter Image Link'
                    />
                    <button 
                    className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple center' 
                    onClick={onButtonSubmit}
                    >
                        Detect
                    </button>
                </div>
            </div>     
        </div>
    );
}


export default ImageLinkForm;
