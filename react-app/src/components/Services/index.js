import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { clearSingleService, getServices } from '../../store/service';
import NewServiceForm from '../NewServiceForm';
import './index.css'
import ServiceTile from './ServiceTile';
import SingleService from './SingleService';

export default function Services(){
    const services = useSelector(state=>state.service.services)
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()

    useEffect(()=>{
      dispatch(getServices())
    },[dispatch])

    useEffect(()=>{
      if(location.pathname === '/dashboard/services'){
        dispatch(clearSingleService())
        dispatch(getServices())
      }
    },[location])

    if(!services) return null
    return (
        <section id="all-services">
            <div id="services-navbar">
              {location.pathname === '/dashboard/services'?(
                <div className='search-container'>
                    <input className="search-bar" type="text"></input>
                    <i class="fa-solid fa-magnifying-glass marg15-l"></i>
                </div>
              ):(<div className='w-5vw'></div>)}
                <h3>SERVICES</h3>
                <button onClick={()=>history.push('/dashboard/services/new')} className='create-button'><i class="fa-sharp fa-solid fa-plus"></i>New Service</button>
            </div>
            <Switch>
              <Route exact path="/dashboard/services">
                <div className='tile-display'>
                  {services && services.sort((a, b) => a.name.localeCompare(b.name)).map(el=>(
                    <ServiceTile key={el.id} service={el} />
                    ))}
                    {services && services.length === 0?(<p>Add your services</p>):''}
                </div>
              </Route>
              <Route path='/dashboard/services/new'>
                <NewServiceForm/>
              </Route>
              <Route path='/dashboard/services/:id'>
                <SingleService />
              </Route>
            </Switch>
        </section>
    )
}
