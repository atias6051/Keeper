import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSingleCustomer, getCustomers, clearSingle, updateCustomerIfo } from '../../store/customer';
import OpenModalButton from '../OpenModalButton';
import DeleteCustomerModal from './DeleteCustomerModal';
import { customerValidation } from '../../utils/formValidations';
import './index.css'

export default function CustomerInfo(){
    const history = useHistory()
    const dispatch = useDispatch()
    const {id} = useParams()
    const customer = useSelector(state=>state.customer.singleCustomer)
    const cleanObject = {name: '',phone: '',email: '',address: '',city: '',state: ''}
    const [ogState,setOgState] = useState({})
    const [changed,setChanged] = useState(false)
    const [infoObj,setInfoObj] = useState(cleanObject)
    const [validationErrors, setValidationErrors] = useState({...cleanObject,errors:false})
    const [submitted,setSubmitted] = useState(false)


    useEffect(()=>{
        dispatch(getSingleCustomer(id))
    },[dispatch])

    useEffect(()=>{
        if(customer){
            let originalInfo = {
                name: customer.name,
                email: customer.email,
                phone: customer.phone.toString(),
                address: customer.address,
                city: customer.city,
                state:customer.state
            }
            setOgState(()=>originalInfo)
            setInfoObj(()=>originalInfo)
        }
    },[customer])

    useEffect(()=>{
        setChanged(()=> JSON.stringify(infoObj) !== JSON.stringify(ogState))
        setValidationErrors(()=> customerValidation(infoObj,cleanObject))
    },[infoObj])

    const goBack = () =>{
        history.push('/dashboard/customers')
    }
    const resetInfo = () => {
        setInfoObj(()=>ogState)
    }
    const handleChange = e =>{
        let newState = {
            ...infoObj,
            [e.target.name]: e.target.value
        }
        setInfoObj(()=>newState)
    }

    const saveChanges = async() => {
        setSubmitted(()=> true)
        if(validationErrors.errors) return
        console.log('connected')
        const updatedCustomer = await dispatch(updateCustomerIfo(infoObj,id))
        await dispatch(getCustomers())
        await dispatch(getSingleCustomer(id))
        setOgState(()=>updatedCustomer)
        console.log('connected2')
    }

    if(!customer) return null

    return (
        <>
        <div className='customer-display'>
            <div className="name-profile">
            <i onClick={goBack} class="fa-solid fa-circle-arrow-left back-button hov"></i>
            <div className='flex-row'>
                <i class="fa-solid fa-user profile-circle"></i>
                <h2>{customer.name}</h2>
            </div>
            <OpenModalButton
                modalComponent={<DeleteCustomerModal customer={customer}/>}
                buttonText="Delete Customer"
                nameClass="delete-customer"
             />
            </div>
            <div className='info-form'>
                <div className='infoset1 flex-col'>
                    <label>Name{submitted && validationErrors.errors?<span className='error-span'>{validationErrors.name}</span>:''}</label>
                    <input name={'name'} className='input-field infoset1' onChange={handleChange} type='text' value={infoObj.name}></input>
                    <label>Email{submitted && validationErrors.errors?<span className='error-span'>{validationErrors.email}</span>:''}</label>
                    <input name={'email'} className='input-field infoset1' onChange={handleChange} type='text' value={infoObj.email}></input>
                    <label>Phone{submitted && validationErrors.errors?<span className='error-span'>{validationErrors.phone}</span>:''}</label>
                    <input name={'phone'} className='input-field infoset1' onChange={handleChange} type='text' value={infoObj.phone}></input>
                </div>
                <div className='infoset2 flex-col'>
                    <label>Address{submitted && validationErrors.errors?<span className='error-span'>{validationErrors.address}</span>:''}</label>
                    <input name={'address'} className='input-field infoset2' onChange={handleChange} type='text' value={infoObj.address}></input>
                    <label>City{submitted && validationErrors.errors?<span className='error-span'>{validationErrors.city}</span>:''}</label>
                    <input name={'city'} className='input-field infoset2' onChange={handleChange} type='text' value={infoObj.city}></input>
                    <label>State{submitted && validationErrors.errors?<span className='error-span'>{validationErrors.state}</span>:''}</label>
                    <input name={'state'} className='input-field infoset2' onChange={handleChange} type='text' value={infoObj.state}></input>
                </div>
            </div>
            <div className='button-placeholder'>
                {changed? (<><button className='under-button hov' onClick={saveChanges}>Save Changes</button ><button className='under-button hov' onClick={resetInfo}>Reset Info</button></>):''}
            </div>
            <div className='document-display'>
                <h1>Documents</h1>
            </div>
        </div>
        </>
    )
}
