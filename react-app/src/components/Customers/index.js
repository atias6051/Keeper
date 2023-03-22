import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route } from 'react-router-dom';
import { getCustomers } from '../../store/customer';
import CustomerTile from './CustomerTile';
import CustomerInfo from '../CustomerInfo';
import './index.css'
import TestComp from '../TestComp';

export default function Customers(){
    const customers = useSelector(state=>state.customer.customers)
    const dispatch = useDispatch()
    const [sortedCustomers,setSortedCustomers] = useState(null)

    useEffect(() => {
        dispatch(getCustomers());
      }, [dispatch]);

    useEffect(()=>{
        if(customers){
            const groupedCustomers = customers.map((customer) => ({
                ...customer,
                firstLetter: customer.name.charAt(0).toUpperCase(),
                })).reduce((acc, customer) => {
                const letter = customer.firstLetter;
                acc[letter] = acc[letter] || [];
                acc[letter].push(customer)
                acc[letter].sort((a, b) => a.name.localeCompare(b.name))
                return acc
            }, {})
            setSortedCustomers(()=>groupedCustomers)
        }
    },[customers])



    return (
        <section id="all-customers">
            <div id="customers-navbar">
                <div className='search-container'>
                    <input className="search-bar" type="text"></input>
                    <i class="fa-solid fa-magnifying-glass marg15-l"></i>
                </div>
                <button className='create-button'><i class="fa-sharp fa-solid fa-plus"></i>New Customer</button>
            </div>
            <Switch>
                <Route exact path="/dashboard/customers/">
                <div className='tile-display'>
                    {sortedCustomers && Object.keys(sortedCustomers).map((letter) => (
                        <div key={letter}>
                      <h4 className='pad-in no-dec'>{letter}</h4>
                      {sortedCustomers[letter].map((customer) => (
                          <NavLink className='no-dec' to={`/dashboard/customers/${customer.id}`}>
                          <CustomerTile customer={customer} />
                        </NavLink>
                      ))}
                    </div>
                  ))}
                </div>
                </Route>
                <Route path="/dashboard/customers/:id">
                    <CustomerInfo/>
                </Route>
            </Switch>
        </section>
    )

}
