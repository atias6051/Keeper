import React from 'react';

import './index.css'

export default function LoadingDash(){
    return(
            <div id="stats-grid">
                <div className='loading-card-single'></div>
                <div className='loading-card-single sales-2fr-card'></div>
                <div className='loading-card-single'></div>
                <div className='loading-card-single'></div>
                <div className='loading-card-single salesmen-2fr-card'></div>
                <div className='loading-card-single'></div>

                <div className='grid-filler'></div>
                <div className='grid-filler'></div>
                <div className='grid-filler'></div>
            </div>
    )
}
