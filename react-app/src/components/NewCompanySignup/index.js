import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signupCompany } from '../../store/company';
import { signUp } from '../../store/session';
import { companySingupValidations } from '../../utils/formValidations';
import './index.css'

export default function NewCompanySignup(){
    const dispatch = useDispatch()
    const history = useHistory()
    const signupTemplateObj = {
        firstName:'',lastName:'',email:'',password:'',passwordConfirm:'',
        phone:'',name:'',businessPhone:'',address:'',city:'',state:'',
        logoUrl:'https://i.imgur.com/18AL2Vt.png'
    }
    const [signupObj,setSignObj] = useState(signupTemplateObj)
    const [logoInput,setLogoInput] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [validationErrors,setValidationErrors] = useState({...signupTemplateObj,errors:false})
    const [usePhone,setUsephone] = useState(false)
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        setValidationErrors(()=>companySingupValidations(signupObj))
    },[signupObj])

    useEffect(()=>{
        if(usePhone){
            let newObj = {
                ...signupObj,
                businessPhone: signupObj.phone
            }
            setSignObj(()=>newObj)
        }
    },[usePhone,signupObj])

    const changeLogo = () =>{
        let newLogo = logoInput
        if(!newLogo.length){
            newLogo = 'https://i.imgur.com/18AL2Vt.png'
        }
        const newObj = {
            ...signupObj,
            logoUrl: newLogo
        }
        setSignObj(()=>newObj)
    }

    const handleChange = e => {
        const newObj = {
            ...signupObj,
            [e.target.name]: e.target.value
        }
        setSignObj(()=>newObj)
    }

    const handleSubmit = async(e) => {
        setSubmitted(()=>true)
        if(validationErrors.errors) return
        const submitObj = {
            first_name: signupObj.firstName,
            last_name: signupObj.lastName,
            email: signupObj.email,
            password: signupObj.password,
            phone: signupObj.phone,
            name: signupObj.name,
            business_phone: signupObj.businessPhone,
            address: signupObj.address,
            city: signupObj.city,
            state: signupObj.state,
            logo_url: signupObj.logoUrl
        }
        const data = await dispatch(signupCompany(submitObj))
        if(data){
            setErrors(data);
        }else{
            history.push('/dashboard')
        }
    }

    return (
        <section class="main-signup-page">
            <div className='sign-up-form-container'>
                <h2>Sign Up Your Company</h2>
                <div className='sign-up-form'>
                    <div className='personal-info-form'>
                        <h4>Your Personal Info</h4>
                        <div className='personal-info-input-container'>
                            <label>First Name {submitted && validationErrors.errors && validationErrors.firstName?(<span>{validationErrors.firstName}</span>):''}</label>
                            <input name='firstName' value={signupObj.firstName} onChange={handleChange} type='text' />
                        </div>
                        <div className='personal-info-input-container'>
                            <label>Last Name {submitted && validationErrors.errors && validationErrors.lastName?(<span>{validationErrors.lastName}</span>):''}</label>
                            <input name='lastName' value={signupObj.lastName} onChange={handleChange} type='text' />
                        </div>
                        <div className='personal-info-input-container'>
                            <label>Phone Number {submitted && validationErrors.errors && validationErrors.phone?(<span>{validationErrors.phone}</span>):''}</label>
                            <input name='phone' value={signupObj.phone} onChange={handleChange} type='number' />
                        </div>
                        <div className='personal-info-input-container'>
                            <label>Email {submitted && validationErrors.errors && validationErrors.email?(<span>{validationErrors.email}</span>):''}</label>
                            <input name='email' value={signupObj.email} onChange={handleChange} type='text' />
                        </div>
                        <div className='personal-info-input-container'>
                            <label>Password {submitted && validationErrors.errors && validationErrors.password?(<span>{validationErrors.password}</span>):''}</label>
                            <input name='password' value={signupObj.password} onChange={handleChange} type='password' />
                        </div>
                        <div className='personal-info-input-container'>
                            <label>Confirm Password {submitted && validationErrors.errors && validationErrors.passwordConfirm?(<span>{validationErrors.passwordConfirm}</span>):''}</label>
                            <input name='passwordConfirm' value={signupObj.passwordConfirm} onChange={handleChange} type='password' />
                        </div>
                    </div>
                    <div className='company-info-form'>
                        <h4>Company Info</h4>
                        <div className='personal-info-input-container'>
                        <label>Company Name {submitted && validationErrors.errors && validationErrors.name?(<span>{validationErrors.name}</span>):''}</label>
                        <input name='name' value={signupObj.name} onChange={handleChange} type='text' />
                        </div>
                        <div className='personal-info-input-container'>
                        <label>Company Phone Number {submitted && validationErrors.errors && validationErrors.businessPhone?(<span>{validationErrors.businessPhone}</span>):''}</label>
                        <input disabled={usePhone} name='businessPhone' value={usePhone? signupObj.phone :signupObj.businessPhone} onChange={handleChange} type='number' />
                        <label>
                            <input checked={usePhone} onChange={()=>setUsephone(usePhone=>!usePhone)} type='checkbox' />
                            <small>Use my personal phone number</small>
                        </label>
                        </div>
                        <div className='personal-info-input-container'>
                        <label>Address {submitted && validationErrors.errors && validationErrors.address?(<span>{validationErrors.address}</span>):''}</label>
                        <input name='address' value={signupObj.address} onChange={handleChange} type='text' />
                        </div>
                        <div className='personal-info-input-container'>
                        <label>City {submitted && validationErrors.errors && validationErrors.city?(<span>{validationErrors.city}</span>):''}</label>
                        <input name='city' value={signupObj.city} onChange={handleChange} type='text' />
                        </div>
                        <div className='personal-info-input-container'>
                        <label>State {submitted && validationErrors.errors && validationErrors.state?(<span>{validationErrors.state}</span>):''}</label>
                        <input name='state' value={signupObj.state} onChange={handleChange} type='text' />
                        </div>
                    </div>
                    <div className='logo-info-form'>
                        <div className='personal-info-input-container'>
                        <h4>Company Logo</h4>
                        <input placeholder='Paste company logo url here' value={logoInput} onChange={e=>setLogoInput(e.target.value)} type='text' />
                        <button className="create-button" onClick={changeLogo}>Change Logo</button>
                        </div>
                        <div className='border-div'>
                            <div className='form-logo-img' style={{ backgroundImage: `url(${signupObj.logoUrl})` }}></div>
                        </div>
                    </div>
                </div>
                    <button className='create-button sub-button' onClick={handleSubmit}>Submit</button>
                    <ul>
					{errors.map((error, idx) => (
						<li style={{listStyle: 'none',color: 'red'}} key={idx}>{error}</li>
					))}
				    </ul>
            </div>
        </section>
    )
}
