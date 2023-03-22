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
        <section id="sing-log-section">
            <h1>Welcome to Keeper</h1>
            <h2>Small business bookkeeping and team management</h2>
            <div id='signup-cards-container'>
                <div className='sing-log-card base-1'>
                    <button>Continue to sign up</button>
                </div>
                <div className='sing-log-card base-2'>

                    <button>Start your company account</button>
                </div>
                <div className='sing-log-card base-1'>
                    <button>Log in</button>
                </div>
            </div>
        </section>
    )
}
