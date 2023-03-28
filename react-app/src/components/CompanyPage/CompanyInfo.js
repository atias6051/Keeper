import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { getInvites } from '../../store/invites';
import Customers from '../Customers';
import { companyValidations } from '../../utils/formValidations';
import './index.css'
import { updateCompanyInfo } from '../../store/company';

export default function CompanyInfo(){
    const history = useHistory()
    const user = useSelector(state=>state.session.user)
    const company = useSelector(state=>state.company.company)
    const dispatch = useDispatch()
    const [companyInfo,setCompanyInfo] = useState({
        name: '',
        phone: '',
        address: '',
        logoUrl: '',
        city: '',
        state: '',
    })
    const [ogState,setOgState] = useState({})
    const [changed,setChanged] = useState(false)
    const [submitted,setSubmitted] = useState(false)
    const [validationErrors,setValidationErrors] = useState({errors:false})

    useEffect(()=>{
        if(company){
            const newObj = {
                name: company.name,
                phone: company.phone,
                address: company.address,
                logoUrl: company.logoUrl,
                city: company.city,
                state: company.state,
            }
            setCompanyInfo(()=>newObj)
            setOgState(()=>newObj)
        }
    },[company])

    useEffect(()=>{
        if(JSON.stringify(ogState)!==JSON.stringify(companyInfo)){
            setChanged(()=>true)
        }else{
            setChanged(()=>false)
        }
        setValidationErrors(()=>companyValidations(companyInfo))
    },[companyInfo])

    const handleChange = e => {
        let newObj = {
            ...companyInfo,
            [e.target.name]: e.target.value
        }
        setCompanyInfo(()=>newObj)
    }

    const resetInfo = () => {
        setCompanyInfo(()=>ogState)
    }

    const handleSubmit = async(e)=> {
        setSubmitted(()=>true)
        if(validationErrors.errors) return
        console.log("good to submit!")
        await dispatch(updateCompanyInfo(companyInfo))
        setOgState(()=>companyInfo)
        setChanged(()=>false)
    }

    if(!company) return null
    return (
        <div className='info-page'>
                <h2>Company Info</h2>
            <div className='company-page-container'>
                <div>
                    <div className='logo-info-container'>
                        <p>Logo</p>
                        <img id="info-page-logo" src={companyInfo.logoUrl} />
                        <button className='hov' id="change-logo-button" >Chnage logo url</button>
                    </div>
                </div>
                <div>
                    <div className='input-container'>
                        <label>Comapny Name</label>
                        <input onChange={handleChange} name='name' type='text' value={companyInfo.name} />
                    </div>
                    <div className='input-container'>
                        <label>Phone</label>
                        <input onChange={handleChange} name='phone' type='text' value={companyInfo.phone} />
                    </div>
                    <div className='input-container'>
                        <label>Address</label>
                        <input onChange={handleChange} name='address' type='text' value={companyInfo.address} />
                    </div>
                    <div className='input-container'>
                        <label>City</label>
                        <input onChange={handleChange} name='city' type='text' value={companyInfo.city} />
                    </div>
                    <div className='input-container'>
                        <label>State</label>
                        <input onChange={handleChange} name='state' type='text' value={companyInfo.state} />
                    </div>
                    <div className='info-form-buttons-div'>
                        {changed?(
                            <>
                            <button onClick={handleSubmit}>Save Changes</button>
                            <button onClick={resetInfo}>Reset Info</button>
                            </>
                        ):""}
                    </div>
                </div>
                <div>
                    <ul>
                        {submitted && validationErrors.errors && validationErrors.name?(<li style={{color:'red'}}>{validationErrors.name}</li>):''}
                        {submitted && validationErrors.errors && validationErrors.phone?(<li style={{color:'red'}}>{validationErrors.phone}</li>):''}
                        {submitted && validationErrors.errors && validationErrors.address?(<li style={{color:'red'}}>{validationErrors.address}</li>):''}
                        {submitted && validationErrors.errors && validationErrors.city?(<li style={{color:'red'}}>{validationErrors.city}</li>):''}
                        {submitted && validationErrors.errors && validationErrors.state?(<li style={{color:'red'}}>{validationErrors.state}</li>):''}
                        {submitted && validationErrors.errors && validationErrors.logoUrl?(<li style={{color:'red'}}>{validationErrors.logoUrl}</li>):''}
                    </ul>
                </div>
            </div>
        </div>
    )
}
