import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { getInvites } from '../../store/invites';
import InvitesPage from './InvitesPage';
import CompanyInfo from './CompanyInfo';
import UsersPage from '../UsersPage';
import UsersInfo from '../UserInfo';
import './index.css'

export default function ComapnyPage(){
    const history = useHistory()
    const user = useSelector(state=>state.session.user)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getInvites())
    },[dispatch])

    return(
        <section id="main-company-page">
            <div id="profilte-tabs">
                <NavLink activeClassName='focus' className='info-tab' exact to="/dashboard/company">Company</NavLink>
                <NavLink activeClassName='focus' className='info-tab' to="/dashboard/company/personal">Personal Info</NavLink>
                <NavLink activeClassName='focus' className='info-tab' to="/dashboard/company/users">Users</NavLink>
                <NavLink activeClassName='focus' className='info-tab' to="/dashboard/company/invites">Invites</NavLink>
            </div>
            <Switch>
                <Route exact path='/dashboard/company'>
                    <CompanyInfo />
                </Route>
                <Route  path='/dashboard/company/personal'>
                    <UsersInfo />
                </Route>
                <Route  path='/dashboard/company/users'>
                    {/* <CompanyInfo /> */}
                    <UsersPage />
                </Route>
                <Route path='/dashboard/company/invites'>
                    <InvitesPage />
                </Route>
            </Switch>
        </section>
    )
}
