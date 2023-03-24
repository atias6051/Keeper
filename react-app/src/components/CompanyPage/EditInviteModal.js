import React, { useEffect, useState } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { inviteValidation } from '../../utils/formValidations';
import { editInvite } from '../../store/invites';

export default function EditInviteModal({invite}) {
    const {closeModal} = useModal()
    // const history = useHistory()
    const dispatch = useDispatch()
    const cleanInviteObj = {firstName:invite.firstName,lastName:invite.lastName,email:invite.email}
    const [inviteObj,setInviteObj] = useState(cleanInviteObj)
    const [validationsObj,setValidationObj] = useState({...cleanInviteObj,errors:false})
    const [submitted,setSubmitted] = useState(false)

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

    const updateInvite = async(e)=>{
        e.preventDefault()
        setSubmitted(()=>true)
        if(validationsObj.errors) return
        const updatedObj = {
            first_name: inviteObj.firstName,
            last_name: inviteObj.lasttName,
            email: inviteObj.email,
            id: invite.id
        }
        console.log(updatedObj)
        await dispatch(editInvite(updatedObj))
        closeModal()
    }

    return (
        <form id='update-invite-form' onSubmit={updateInvite}>
            <h3>Update invite</h3>
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
                <button className='create-button' type='submit'>Update Invite</button>
        </form>
    )
}
