import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { NavLink, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { getEstimates } from '../../store/documents';
import EstimateTile from '../Estimates/EstimateTile'
import InvoiceForm from "./InvoiceForm";
export default function Invoices(){
    const invoices = useSelector(state=>state.documents.invoices)
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const [search,setSearch] = useState('')

    useEffect(()=>{
        dispatch(getEstimates())
    },[dispatch,location])

    const filterSearch = (el,term) => {
        return new RegExp(term, 'gi').test(el)
    }
    function handleKeyDown(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    }
    if(!invoices) return (<div className='loading-wheel'/>)

    return (
        <section id="all-services">
            <div id="services-navbar">
              {location.pathname === '/dashboard/invoices'?(
                <div className='search-container'>
                    <input onKeyDown={handleKeyDown} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search Invoice..." className="search-bar" type="text"></input>
                    <i class="fa-solid fa-magnifying-glass marg15-l search-mag"></i>
                </div>
              ):(<div className='w-5vw'></div>)}
                <h3>INVOICES</h3>
                {/* <button onClick={()=>history.push('/dashboard/estimates/new')} className='create-button'><i class="fa-sharp fa-solid fa-plus"></i>New Estimate</button> */}
                <div className='w-5vw'></div>
            </div>
            <Switch>
              <Route exact path="/dashboard/invoices">
                <div className='tile-display'>
                  {invoices.length===0? (<p>You have no Invoices</p>):''}
                  {invoices && invoices.filter(el=>filterSearch(el.customerName,search)).sort((a, b) => new Date(b.date) - new Date(a.date)).map(el=>(
                    <NavLink key={el.id} className='no-dec' to={`/dashboard/invoices/${el.id}`}>
                        <EstimateTile estimate={el} />
                    </NavLink>
                    ))}
                </div>
              </Route>
              {/* <Route path='/dashboard/estimates/new'>
                <NewEstimateForm />
              </Route> */}
              <Route path='/dashboard/invoices/:id'>
                <InvoiceForm />
              </Route>
            </Switch>
        </section>
    )
}
