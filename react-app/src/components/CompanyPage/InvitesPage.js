import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { getInvites, createInvite } from '../../store/invites';
import { generateKey } from '../../utils/keyGen';
import { inviteValidation } from '../../utils/formValidations';
import './index.css'
import InviteTile from './InvtieTile';

export default function InvitesPage(){
    const cleanInviteObj = {firstName:'',lastName:'',email:''}
    const history = useHistory()
    const user = useSelector(state=>state.session.user)
    const invites = useSelector(state=>state.invites.invites)
    const dispatch = useDispatch()
    const [inviteObj,setInviteObj] = useState(cleanInviteObj)
    const [validationsObj,setValidationObj] = useState({...cleanInviteObj,errors:false})
    const [submitted,setSubmitted] = useState(false)
    const [key,setKey] = useState('')

    useEffect(()=>{
        dispatch(getInvites())
    },[dispatch])

    useEffect(()=>{
        setValidationObj(()=> inviteValidation(inviteObj))
    },[inviteObj])

    const handleChange = e =>{
        e.preventDefault()
        let newObj = {
            ...inviteObj,
            [e.target.name] : e.target.value
        }
        setInviteObj(()=> newObj)
    }

    const newInviteSubmit = async(e) =>{
        e.preventDefault()
        setSubmitted(()=>true)
        if(validationsObj.errors) return
        const newKey = generateKey()
        const newInvite = {
            email: inviteObj.email,
            first_name: inviteObj.firstName,
            last_name: inviteObj.lastName,
            key: newKey
        }
        const res = await dispatch(createInvite(newInvite))
        if(res){
            setKey(()=>newKey)
            console.log(res)
        }
    }

    return (
        <div className='info-page'>
            <Switch>
                <Route exact path='/dashboard/company/invites'>
                    <div>
                        <div className='invites-title-container'>
                            <h2>Company Invites</h2>
                            <button className='create-button' onClick={()=>history.push('/dashboard/company/invites/new')}><i class="fa-solid fa-plus"></i>  Invite User</button>
                        </div>
                        {invites && invites.map(el=>(
                            <InviteTile invite={el} />
                        ))}
                    </div>
                </Route>
                <Route exact path='/dashboard/company/invites/new'>
                    <div id="new-invite-container">
                        <div className='top-bar'>
                            <i onClick={()=>history.push('/dashboard/company/invites')} class="fa-solid fa-circle-arrow-left back-button hov"></i>
                            <h2>New User Invite</h2>
                            <div className='width-filler'></div>
                        </div>
                        <div id="form-and-code">
                        <form id='new-invite-form' onSubmit={newInviteSubmit}>
                        <label>
                            Email {submitted && validationsObj.errors && validationsObj.email ? (<span>{validationsObj.email}</span>):''}
                            <input name='email' value={inviteObj.email} onChange={handleChange} type='text'/>
                        </label>
                        <label>
                            First Name {submitted && validationsObj.errors && validationsObj.firstName ? (<span>{validationsObj.firstName}</span>):''}
                            <input name='firstName' value={inviteObj.firstName} onChange={handleChange} type='text'/>
                        </label>
                        <label>
                            Last Name {submitted && validationsObj.errors && validationsObj.lastName ? (<span>{validationsObj.lastName}</span>):''}
                            <input name='lastName' value={inviteObj.lastName} onChange={handleChange} type='text'/>
                        </label>
                            <button className='create-button' type='submit'>Invite User</button>
                        </form>
                        <div id="activation-code-container">
                            <p>Activation code</p>
                            <div>
                                <p><small>Please keep this activation code<br/>
                                If you lose this code you will need to create<br/>
                                a new invite for this user
                                </small></p>
                                <input type='text' disabled={true} value={key}></input>
                            </div>
                            <div></div>
                        </div>
                        </div>
                    </div>
                </Route>
            </Switch>
        </div>
    )
}
