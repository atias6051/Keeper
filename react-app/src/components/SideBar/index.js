import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css'

export default function SideBar(){
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()

    useEffect(()=>{
        if(sessionUser === null){
            return history.push("/")
        }
    },[sessionUser])

    return (
        <div id="side-bar">
            <NavLink  className="sidebar-button" exact to="/dashboard">Dashboard</NavLink>
            <NavLink  className="sidebar-button" to="/dashboard/customers">Customers</NavLink>
            <NavLink  className="sidebar-button" to="/dashboard/services">Services</NavLink>
            <NavLink  className="sidebar-button" to="/dashboard/estimates">Estimates</NavLink>
            <NavLink  className="sidebar-button" to="/dashboard/invoices">Invoices</NavLink>
        </div>
    )
}
