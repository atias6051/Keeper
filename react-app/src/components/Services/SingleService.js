import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSingleService, updateServiceInfo } from '../../store/service';
import { serviceValidation } from '../../utils/formValidations';
// import { getSingleCustomer, getCustomers, clearSingle, updateCustomerIfo } from '../../store/customer';
import OpenModalButton from '../OpenModalButton';
import DeleteServiceModal from './DeleteServiceModal';
// import { customerValidation } from '../../utils/formValidations';
import './index.css'

export default function SingleService(){
    const history = useHistory()
    const dispatch = useDispatch()
    const {id} = useParams()
    // const customer = useSelector(state=>state.customer.singleCustomer)
    const service = useSelector(state=>state.service.singleService)
    const cleanObject = {name: '',price: '',description: ''}
    const [ogState,setOgState] = useState({})
    const [changed,setChanged] = useState(false)
    const [infoObj,setInfoObj] = useState(cleanObject)
    const [validationErrors, setValidationErrors] = useState({...cleanObject,errors:false})
    const [submitted,setSubmitted] = useState(false)

    useEffect(()=>{
        dispatch(getSingleService(id))
    },[dispatch])

    useEffect(()=>{
        if(service){
            let newObj = {
                name: service.name,
                price: service.price,
                description: service.description
            }
            setOgState(()=>newObj)
            setInfoObj(()=>newObj)
        }
    },[service])

    useEffect(()=>{
        setChanged(()=> JSON.stringify(infoObj) !== JSON.stringify(ogState))
        setValidationErrors(()=> serviceValidation(infoObj))
    },[infoObj])

    const handleChange = e =>{
        let newState = {
            ...infoObj,
            [e.target.name]: e.target.value
        }
        setInfoObj(()=>newState)
    }

    const goBack = () =>{
        history.push('/dashboard/services')
    }

    const resetInfo = () => {
        setInfoObj(()=>ogState)
    }

    const saveChanges = async() => {
        setSubmitted(()=> true)
        if(validationErrors.errors) return
        const updatedService = await dispatch(updateServiceInfo(infoObj,service.id))
        setOgState(()=>updatedService)
    }

    if(!service) return null

    return (
        <>
        {/* <i class="fa-sharp fa-solid fa-screwdriver-wrench"></i> */}
        <div className='customer-display'>
            <div className="name-profile">
            <i onClick={goBack} class="fa-solid fa-circle-arrow-left back-button hov"></i>
            <div className='flex-row'>
                <i class="fa-sharp fa-solid fa-screwdriver-wrench profile-circle"></i>
                <h2>{service.name}</h2>
            </div>
            <OpenModalButton
                modalComponent={<DeleteServiceModal service={service}/>}
                buttonText="Delete Service"
                nameClass="delete-customer"
             />
            </div>
            <div className='info-form'>
                <div className='service-form-container'>
                    <div className='flex-col'>
                        <label>Name{submitted && validationErrors.errors?<span className='error-span'>{validationErrors.name}</span>:''}</label>
                        <input name={'name'} className='name-input' onChange={handleChange} type='text' value={infoObj.name}></input>
                        <label>Price{submitted && validationErrors.errors?<span className='error-span'>{validationErrors.price}</span>:''}</label>
                        <input name={'price'} className='price-input' onChange={handleChange} type='number' value={infoObj.price}></input>
                    </div>
                    <label className='flex-col'>Description{submitted && validationErrors.errors?<span className='error-span'>{validationErrors.description}</span>:''}</label>
                    <textarea name={'description'} className='service-textarea' onChange={handleChange} type='text' value={infoObj.description}></textarea>
                </div>
            </div>
            <div className='button-placeholder'>
                {changed? (<><button className='under-button hov' onClick={saveChanges}>Save Changes</button ><button className='under-button hov' onClick={resetInfo}>Reset Info</button></>):''}
            </div>
        </div>
        </>
    )
}
