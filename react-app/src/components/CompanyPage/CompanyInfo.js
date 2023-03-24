import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { getInvites } from '../../store/invites';
import Customers from '../Customers';
import './index.css'

export default function CompanyInfo(){
    const history = useHistory()
    const user = useSelector(state=>state.session.user)
    const company = useSelector(state=>state.company.company)
    const dispatch = useDispatch()
    if(!company) return null
    return (
        <div className='info-page'>
            <div>
                <img src={company.logoUrl} />
                <h3>{company.name}</h3>
            </div>
        </div>
    )
}
