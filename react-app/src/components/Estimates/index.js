import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { getServices } from '../../store/service';
import { getEstimates } from '../../store/documents';
import { getCustomers } from '../../store/customer';
import './index.css'
import EstimateTile from './EstimateTile';
import NewEstimateForm from './NewEstimateForm';

export default function Estimates(){
    const estimates = useSelector(state=>state.documents.estimates)
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const [search,setSearch] = useState('')

    useEffect(()=>{
        dispatch(getEstimates())
        dispatch(getServices())
        dispatch(getCustomers())
    },[dispatch,location])

    const filterSearch = (el,term) => {
      return new RegExp(term, 'gi').test(el)
    }

    if(!estimates) return (<div className='loading-wheel'/>)
    return (
        <section id="all-services">
            <div id="services-navbar">
              {location.pathname === '/dashboard/estimates'?(
                <div className='search-container'>
                    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search Estimate..." className="search-bar" type="text"></input>
                    <i class="fa-solid fa-magnifying-glass marg15-l search-mag"></i>
                </div>
              ):(<div className='w-5vw'></div>)}
                <h3>ESTIMATES</h3>
                <button onClick={()=>history.push('/dashboard/estimates/new')} className='create-button'><i class="fa-sharp fa-solid fa-plus"></i>New Estimate</button>
            </div>
            <Switch>
              <Route exact path="/dashboard/estimates">
                <div className='tile-display'>
                  {estimates.length===0? (<p>You have no estimates</p>):''}
                  {estimates && estimates.filter(el=>filterSearch(el.customerName,search)).sort((a, b) => new Date(b.date) - new Date(a.date)).map(el=>(
                    <NavLink key={el.id} className='no-dec' to={`/dashboard/estimates/${el.id}`}>
                        <EstimateTile estimate={el} />
                    </NavLink>
                    ))}
                </div>
              </Route>
              <Route path='/dashboard/estimates/new'>
                <NewEstimateForm />
              </Route>
              <Route path='/dashboard/estimates/:id'>
                <NewEstimateForm />
              </Route>
            </Switch>
        </section>
    )
}
