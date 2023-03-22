import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import CustomerTile from './CustomerTile';
import './index.css'

export default function Services(){
    // const services = useSelector(state=>state.company.company.services)

    return (
        <section id="all-services">
            <div id="services-navbar">
                <div className='search-container'>
                    <input className="search-bar" type="text"></input>
                    <i class="fa-solid fa-magnifying-glass marg15-l"></i>
                </div>
                <button className='create-button'><i class="fa-sharp fa-solid fa-plus"></i>New Service</button>
            </div>

            {/* <div className='tile-display'>
                {Object.keys(groupedCustomers).map((letter) => (
                <div key={letter}>
                  <h4 className='pad-in'>{letter}</h4>
                  {groupedCustomers[letter].map((customer) => (
                    <div key={customer.id}>
                      <CustomerTile customer={customer} />
                    </div>
                  ))}
                </div>
              ))}
            </div> */}
        </section>
    )
}
