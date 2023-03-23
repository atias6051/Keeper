import React, { useEffect, useState } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css'

export default function SignUpPage(){
    const user = useSelector(state=>state.session.user)
    const history = useHistory()
    const [email,setEmail] = useState('')
    const [key,setKey] = useState('')
    const [approved,setApproved] = useState(false)
    const [invite,setInvite] = useState({})

    useEffect(()=>{
        if(user){
            return history.push("/dashboard")
        }
    },[user])

    const checkInvite = async()=>{
        const checkObj = {}
        checkObj.email = email
        checkObj.key = key
        const res = await fetch("/api/invites/check", {
            headers: {"Content-Type": "application/json",},
            method: 'POST',
            body: JSON.stringify(checkObj)
        })
        const data = await res.json()
        if(res.ok){
            setApproved(()=>true)
            setInvite(()=> data)
        }
        // console.log(data)
    }

    return (
        <section id="sing-log-section">
            <h1>Welcome to Keeper</h1>
            <h2>Small business bookkeeping and team management</h2>
            <div id='signup-cards-container'>
                <div className='sing-log-card base-1'>
                    <p>Sign up with invite code</p>
                    <div className='form-container'>
                        <p>Use your email address<br/>and invite code to sign up</p>
                        <label>Email</label>
                        <input disabled={approved} value={email} onChange={e=>setEmail(e.target.value)} placeholder='Enter Email...' type='text'/>
                        <label>Invite Code</label>
                        <input disabled={approved} value={key} onChange={e=>setKey(e.target.value.toUpperCase())} placeholder='Enter Invite code..' type='text'/>
                        <button onClick={checkInvite}>Validate Invite</button>
                    </div>
                    <button disabled={!approved}>Continue to sign up</button>
                </div>
                <div className='sing-log-card base-2'>

                    <button>Start your company account</button>
                </div>
                <div className='sing-log-card base-1'>
                    <button onClick={()=>console.log(invite)}>Log in</button>
                </div>
            </div>
        </section>
    )
}
