import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSingleCustomer, getCustomers, clearSingle, updateCustomerIfo, createCustomer } from '../../store/customer';
import { customerValidation } from '../../utils/formValidations';
import './index.css'

export default function NewCustomerForm(){
    const dispatch = useDispatch()
    const history = useHistory()
    const cleanObject = {name: '',phone: '',email: '',address: '',city: '',state: ''}
    const [submitted,setSubmitted] = useState(false)
    const [infoObj,setInfoObj] = useState(cleanObject)
    const [validationErrors, setValidationErrors] = useState({...cleanObject,errors:false})
    // const [errors, setErrors] = useState(false)

    useEffect(()=>{
        setValidationErrors(()=> customerValidation(infoObj,cleanObject))
    },[infoObj])

    const handleChange = e => {
        const newObj = {
            ...infoObj,
            [e.target.name] : e.target.value
        }
        setInfoObj(()=>newObj)
    }

    const handleSubmit = async e => {
        setSubmitted(()=>true)
        if(validationErrors.errors) return
        const newCustomer = await dispatch(createCustomer(infoObj))
        console.log("new customer---->",newCustomer)
        return history.push(`/dashboard/customers/${newCustomer.id}`)
    }

    return (
        <div className='customer-form'>
        <h2>New Customer</h2>
        <form id="customer-info">
            <label>
                Name {submitted && validationErrors.errors && validationErrors.name.length? (<span>{validationErrors.name}</span>): ''}
                <input name='name' value={infoObj.name} onChange={handleChange} type='text'/>
            </label>
            <label>
                Phone {submitted && validationErrors.errors && validationErrors.phone.length? (<span>{validationErrors.phone}</span>): ''}
                <input name='phone' value={infoObj.phone} onChange={handleChange} type='text'/>
            </label>
            <label>
                Email {submitted && validationErrors.errors && validationErrors.email.length? (<span>{validationErrors.email}</span>): ''}
                <input name='email' value={infoObj.email} onChange={handleChange} type='text'/>
            </label>
            <label>
                Address {submitted && validationErrors.errors && validationErrors.address.length? (<span>{validationErrors.address}</span>): ''}
                <input name='address' value={infoObj.address} onChange={handleChange} type='text'/>
            </label>
            <label>
                City {submitted && validationErrors.errors && validationErrors.city.length? (<span>{validationErrors.city}</span>): ''}
                <input name='city' value={infoObj.city} onChange={handleChange} type='text'/>
            </label>
            <label>
                State {submitted && validationErrors.errors && validationErrors.state.length? (<span>{validationErrors.state}</span>): ''}
                <input name='state' value={infoObj.state} onChange={handleChange} type='text'/>
            </label>
        </form>
            <button className='create-button' onClick={handleSubmit}>Submit</button>
        </div>
    )
}
