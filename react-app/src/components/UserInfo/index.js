import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route, useHistory, useLocation } from 'react-router-dom';

import { userValidation } from '../../utils/formValidations';
import './index.css'

export default function UsersInfo(){
    const user = useSelector(state=>state.session.user)
    const cleanObj = {firstName:'',lastName:'',phone:''}
    const [userInfo,setUserInfo] = useState(cleanObj)
    const [ogState,setOgState] = useState(cleanObj)
    const [validationErrors,setValidationErrors] = useState({...cleanObj,errors:false})
    const [submitted,setSubmitted] = useState(false)
    const [email,setEmail] = useState('')
    const [changed,setChanged] = useState(false)

    useEffect(()=>{
        if(user){
            let newObj = {
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone
            }
            setEmail(()=>user.email)
            setUserInfo(()=>newObj)
            setOgState(()=>newObj)
        }
    },[user])

    useEffect(()=>{
        if(JSON.stringify(ogState) !== JSON.stringify(userInfo)){
            setChanged(true)
        }else{
            setChanged(false)
        }
        setValidationErrors(()=> userValidation(userInfo))
    },[userInfo])


    const handleChange = e => {
        let newObj = {
            ...userInfo,
            [e.target.name]: e.target.value
        }
        setUserInfo(()=> newObj)
    }

    const resetInfo = () => {
        setUserInfo(()=>ogState)
    }

    const handleSubmit = async e =>{
        setSubmitted(()=>true)
    }

    if(!user) return null
    return (
        <div className='info-page'>
            <div className='pesrsonal-info-container'>
                <div className='user-title-div'>
                    <i class="fa-solid fa-user user-icon"></i>
                    <h2>Personal Info</h2>
                </div>
                <div className='user-info-input-section'>
                    <div className='personal-input-div'>
                        <label>First Name</label>
                        <input type='text' name='firstName' onChange={handleChange} value={userInfo.firstName} />
                    </div>
                    <div className='personal-input-div'>
                        <label>Last Name</label>
                        <input type='text' name='lastName' onChange={handleChange} value={userInfo.lastName} />
                    </div>
                    <div className='personal-input-div'>
                        <label>Phone Number</label>
                        <input type='number' name='phone' onChange={handleChange} value={userInfo.phone} />
                    </div>
                    <div className='personal-input-div'>
                        <label>Email</label>
                        <strong>{email}</strong>
                    </div>
                    {changed?<div className="user-info-buttons">
                        <button className='create-button' onClick={handleSubmit}>Save Changes</button>
                        <button className='create-button' onClick={resetInfo}>Reset Info</button>
                    </div>:''}
                </div>
                <div>
                    <ul className='flex-col marg15-t'>
                        {submitted && Object.values(validationErrors).map(el=>(
                            <small ket={el[0]}>{el}</small>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
