import React, { useEffect, useState } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton'
import './index.css'
import InviteSignupModal from '../InviteSignupModal';
import { login } from '../../store/session';

export default function SignUpPage(){
    const user = useSelector(state=>state.session.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const [key,setKey] = useState('')
    const [approved,setApproved] = useState(false)
    const [submitted,setSubmitted] = useState(false)
    const [invite,setInvite] = useState({})
    const [classTest,SetClassTest] = useState('test1')

    useEffect(()=>{
        if(user){
            return history.push("/dashboard")
        }
    },[user])

    const checkInvite = async()=>{
        setSubmitted(()=>true)
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
            SetClassTest(()=>'test2')
            setApproved(()=>true)
            setInvite(()=> data)
        }

    }

    const demoLogin = async() =>{
        const data = await dispatch(login('demo@aa.io', 'password'));
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
                        <button disabled={!email.length || !key.length} className='create-button' onClick={checkInvite}>Validate Invite</button>
                        <div className='status-placeholder'>
                            {submitted? approved? <p>Invite Approved</p>:<p>Invite declined</p>:""}
                        </div>
                    </div>
                    <div>
                        {
                        approved?
                            <OpenModalButton
                                modalComponent={<InviteSignupModal invite={invite}/>}
                                buttonText="continue to sign up"
                                nameClass={classTest}
                            />
                            : ""
                        }
                    </div>
                </div>
                <div className='sing-log-card base-2'>

                    <button onClick={()=>console.log(invite)} >Start your company account</button>
                </div>
                <div className='sing-log-card base-1'>
                    <p>Explore Keeper as <br/>
                        A Demo user
                    </p>
                    <ul>
                        <li>Explore Keeper as a business owner</li>
                        <li>Manage Demo company</li>
                        <li>Manage Demo Team</li>
                        <li>See if Keeper is right for your company</li>
                    </ul>
                    <button onClick={demoLogin} className='hov'>Log in Demo User</button>
                </div>
            </div>
        </section>
    )
}
