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
    const [classTest,SetClassTest] = useState('create-button')
    const [inviteCheckButtonClass,setInviteCheckButtonClass] = useState('create-button')

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
            SetClassTest(()=>'create-button')
            setApproved(()=>true)
            setInvite(()=> data)
            setInviteCheckButtonClass(()=>'disabled-button')
        }

        setSubmitted(()=>true)
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
                    <div className='title-and-icon'>
                        <p>Sign up with invite code</p>
                        <i class="fa-solid fa-hand card-icon"></i>
                    </div>
                    <div className='form-container'>
                        <p>Use your email address<br/>and invite code to sign up</p>
                        <label>Email</label>
                        <input disabled={approved} value={email} onChange={e=>setEmail(e.target.value)} placeholder='Enter Email...' type='text'/>
                        <label>Invite Code</label>
                        <input disabled={approved} value={key} onChange={e=>setKey(e.target.value.toUpperCase())} placeholder='Enter Invite code..' type='text'/>
                        <button disabled={!email.length || !key.length} className={inviteCheckButtonClass} onClick={checkInvite}>Validate Invite</button>
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
                    <div className='title-and-icon'>
                        <p>Sing up and start your won company account</p>
                        <i class="fa-solid fa-building card-icon"></i>
                    </div>
                    <div>
                        <ul className='sign-up-company-list'>
                            <li>Set up your account with you company information</li>
                            <li>Create Update and Manage your services</li>
                            <li>Keep all customers information in one place</li>
                            <li>Keep track of all of your estimates and invoices</li>
                            <li>Add employee accounts to your company</li>
                            <li>Get live stats on your sales and teams performance</li>
                        </ul>
                    </div>
                    <button className="create-button" onClick={()=>history.push('/signup')} >Start your company account</button>
                </div>
                <div className='sing-log-card base-1 '>
                    <div className='title-and-icon'>
                        <p>Explore Keeper as a Demo user
                        </p>
                        <i class="fa-solid fa-user-secret card-icon"></i>
                    </div>
                    <ul className='demo-card-ul'>
                        <li>Explore Keeper as a business owner</li>
                        <li>Manage Demo company</li>
                        <li>Manage Demo Team</li>
                        <li>See if Keeper is right for your company</li>
                    </ul>
                    <button onClick={demoLogin} className='create-button hov'>Log in Demo User</button>
                </div>
            </div>
        </section>
    )
}
