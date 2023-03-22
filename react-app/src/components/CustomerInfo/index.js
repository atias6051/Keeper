import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSingleCustomer, clearSingle, updateCustomerIfo } from '../../store/customer';
import './index.css'

export default function CustomerInfo(){
    const history = useHistory()
    const dispatch = useDispatch()
    const {id} = useParams()
    const customer = useSelector(state=>state.customer.singleCustomer)
    const [ogState,setOgState] = useState({})
    const [changed,setChanged] = useState(false)
    const [infoObj,setInfoObj] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: ''
    })


    useEffect(()=>{
        dispatch(getSingleCustomer(id))
    },[dispatch])

    useEffect(()=>{
        if(customer){
            let originalInfo = {
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
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
    },[infoObj])

    const goBack = () =>{
        dispatch(clearSingle())
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
        console.log('connected')
        const updatedCustomer = await dispatch(updateCustomerIfo(infoObj,id))
        await dispatch(getSingleCustomer(id))
        setOgState(()=>updatedCustomer)
        console.log('connected2')
    }

    if(!customer) return null

    return (
        <div className='customer-display'>
            <i onClick={goBack} class="fa-solid fa-circle-arrow-left back-button hov"></i>
            <h1>{customer.name}</h1>
            <input name={'name'} className='input-field' onChange={handleChange} type='text' value={infoObj.name}></input>
            <input name={'email'} className='input-field' onChange={handleChange} type='text' value={infoObj.email}></input>
            <input name={'phone'} className='input-field' onChange={handleChange} type='text' value={infoObj.phone}></input>
            <input name={'address'} className='input-field' onChange={handleChange} type='text' value={infoObj.address}></input>
            <input name={'city'} className='input-field' onChange={handleChange} type='text' value={infoObj.city}></input>
            <input name={'state'} className='input-field' onChange={handleChange} type='text' value={infoObj.state}></input>
            {changed? (<><button onClick={saveChanges}>Save Changes</button><button onClick={resetInfo}>Reset Info</button></>):''}
        </div>
    )
}
