import React from 'react';
import './index.css'

export default function EstimateTile({estimate}){
    return(
        <div id={estimate.id} className='customer-tile center'>
            <div>
            <p className='bold-t'>{estimate.customerName}</p>
            <p>{estimate.date}</p>
            </div>
            <p>${estimate.total.toFixed(2)}</p>
        </div>
    )
}
