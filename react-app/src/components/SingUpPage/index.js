import React, { useEffect } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css'

export default function SignUpPage(){
    const user = useSelector(state=>state.session.user)
    const history = useHistory()

    useEffect(()=>{
        if(user){
            return history.push("/dashboard")
        }
    },[user])
    return (
        <div>
            <h2>Hello!</h2>
            <h2>Hello!</h2>
            <h2>Hello!</h2>
            <h2>Hello!</h2>
        </div>
    )
}
