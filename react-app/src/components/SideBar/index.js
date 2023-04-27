import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import './index.css'
import AboutModal from '../AboutModal';

export default function SideBar(){
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const { setModalContent, setOnModalClose } = useModal();

    useEffect(()=>{
        if(sessionUser === null){
            return history.push("/")
        }
    },[sessionUser])

    const onClick = () => {
        // if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(<AboutModal/>);
        // if (onButtonClick) onButtonClick();
    };

    return (
        <div id="side-bar">
            <NavLink  className="sidebar-button" exact to="/dashboard">Dashboard</NavLink>
            <NavLink  className="sidebar-button" to="/dashboard/customers">Customers</NavLink>
            <NavLink  className="sidebar-button" to="/dashboard/services">Services</NavLink>
            <NavLink  className="sidebar-button" to="/dashboard/estimates">Estimates</NavLink>
            <NavLink  className="sidebar-button" to="/dashboard/invoices">Invoices</NavLink>
            <div onClick={onClick} className='my-button'><i class="fa-regular fa-address-card"></i> About Keeper</div>
        </div>
    )
}
