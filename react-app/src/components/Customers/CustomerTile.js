import React from 'react';
import './index.css'

export default function CustomerTile({customer}){
    return(
        <div id={customer.id} className='customer-tile'>
            <div>
            <p className='bold-t'>{customer.name}</p>
            <p>{customer.email}</p>
            <p>{customer.phone}</p>
            </div>
            <p>{`${customer.city}, ${customer.state}`}</p>
        </div>
    )
}
