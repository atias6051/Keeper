import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { getCompany } from '../../store/company';

export default function Dashboard(){
    const history = useHistory()
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch()

    // const dispatcher = async()

    useEffect(()=>{
        if(user === null){
            return history.push("/")
        }
        if(user){
            dispatch(getCompany())
        }
    },[user])

    if(!user) return null

    return(
        <section id="dashboard-section">
            <h1>{`Welcome ${user.firstName} ${user.lastName}`}</h1>
        </section>
    )
}
