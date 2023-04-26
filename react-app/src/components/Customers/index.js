import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { getCustomers, clearSingle } from '../../store/customer';
import CustomerTile from './CustomerTile';
import CustomerInfo from '../CustomerInfo';
import './index.css'
import TestComp from '../TestComp';
import NewCustomerForm from '../NewCustomerForm';

export default function Customers(){
    const customers = useSelector(state=>state.customer.customers)
    const singleCustomer = useSelector(state=>state.customer.singleCustomer)
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const [sortedCustomers,setSortedCustomers] = useState(null)

    useEffect(() => {
        dispatch(getCustomers());
    }, [dispatch]);

    useEffect(()=>{
        if(location.pathname === '/dashboard/customers'){
            dispatch(clearSingle())
            dispatch(getCustomers())
        }
    },[location])

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
            setSortedCustomers(() => groupedCustomers)
        }
    },[customers,location])
    // },[customers,singleCustomer,location])



    return (
        <section id="all-customers">
            <div id="customers-navbar">
<<<<<<< HEAD
                {location.pathname === '/dashboard/customers'?(
                    <div className='search-container'>
                        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="search customer..." className="search-bar" type="text"></input>
                        <i class="fa-solid fa-magnifying-glass marg15-l search-mag"></i>
                    </div>
                ):(<div className='w-5vw'></div>)}
=======
                <div className='search-container'>
                    <input className="search-bar" type="text"></input>
                    <i class="fa-solid fa-magnifying-glass marg15-l"></i>
                </div>
>>>>>>> parent of 4603ba5 (more stuff)
                <h3>CUSTOMERS</h3>
                <button onClick={()=>history.push('/dashboard/customers/new')} className='create-button'><i class="fa-sharp fa-solid fa-plus"></i>New Customer</button>
            </div>
            <Switch>
                <Route exact path="/dashboard/customers/">
                <div className='tile-display'>
                    {sortedCustomers && Object.keys(sortedCustomers).map((letter) => (
                        <div key={letter}>
                      <h4 className='pad-in no-dec'>{letter}</h4>
                      {sortedCustomers[letter].map((customer) => (
                        <NavLink key={customer.id} className='no-dec' to={`/dashboard/customers/${customer.id}`}>
                          <CustomerTile key={customer.id} customer={customer} />
                        </NavLink>
                        ))}
                        </div>
                    ))}
                    {sortedCustomers && Object.keys(sortedCustomers).length === 0?(<p>You have no customers records</p>):''}
                </div>
                </Route>
                <Route path="/dashboard/customers/new">
                    <NewCustomerForm />
                </Route>
                <Route path="/dashboard/customers/:id">
                    <CustomerInfo/>
                </Route>
            </Switch>
        </section>
    )

}
