import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSingleCustomer, getCustomers, clearSingle, updateCustomerIfo, createCustomer } from '../../store/customer';
import { createService } from '../../store/service';
import { serviceValidation } from '../../utils/formValidations';
import './index.css'

export default function NewServiceForm(){
    const dispatch = useDispatch()
    const history = useHistory()
    const cleanObj = {name:'',description:'',price:'0'}
    const [infoObj,setInfoObj] = useState({name:'',description:'',price:''})
    const [validationErrors,setValidationErrors] = useState({errors: false})
    const [submitted,setSubmitted] = useState(false)

    useEffect(()=>{
        //need work
        setValidationErrors(()=>serviceValidation(infoObj))
    },[infoObj])


    const handleChange = e => {
        let value = e.target.value
        if(e.target.name === 'name' && value.length>0){
            value = value[0].toUpperCase()+value.slice(1)
        }
        if(e.target.name === 'price' && !value.length){
            value = '0'
        }
        const newObj = {
            ...infoObj,
            [e.target.name]: value
        }
        setInfoObj(()=>newObj)
    }

    const handleSubmit = async e =>{
        setSubmitted(()=>true)
        if(validationErrors.errors) return
        let submitObj={
            name:infoObj.name,
            price: parseFloat(infoObj.price).toFixed(2),
            description: infoObj.description
        }
        const newService = await dispatch(createService(submitObj))
        return history.push(`/dashboard/services/${newService.id}`)
    }

    return(
        <div className='tile-display'>
            <h2>New Service</h2>
            <div className='service-inputs-container'>
                <label>
                    Name {submitted && validationErrors.errors && validationErrors.name? (<span>{validationErrors.name}</span>): ''}
                    <input name='name' value={infoObj.name} onChange={handleChange} type='text'/>
                </label>
                <label>
                    Price {submitted && validationErrors.errors && validationErrors.price? (<span>{validationErrors.price}</span>): ''}
                    <input name='price' value={infoObj.price} onChange={handleChange} type='number'/>
                </label>
                <label>
                    Description {submitted && validationErrors.errors && validationErrors.description? (<span>{validationErrors.description}</span>): ''}
                    <textarea row={10} name='description' value={infoObj.description} onChange={handleChange} type='text'/>
                </label>
                <button onClick={handleSubmit} className='create-button'>Create Service</button>
            </div>
        </div>
    )

}
