import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSingleCustomer, getCustomers, clearSingle, updateCustomerIfo, createCustomer } from '../../store/customer';
import { customerValidation } from '../../utils/formValidations';
import './index.css'

export default function NewServiceForm(){
    const dispatch = useDispatch()
    const history = useHistory()
    const cleanObj = {name:'',description:'',price:'0'}
    const [infoObj,setInfoObj] = useState({name:'',description:'',price:''})

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

    return(
        <div className='tile-display'>
            <h2>New Service</h2>
            <div className='service-inputs-container'>
                <label>
                    Name
                    <input name='name' value={infoObj.name} onChange={handleChange} type='text'/>
                </label>
                <label>
                    Price
                    <input name='price' value={infoObj.price} onChange={handleChange} type='number'/>
                </label>
                <label>
                    Description
                    <textarea row={10} name='description' value={infoObj.description} onChange={handleChange} type='text'/>
                </label>
                <button className='create-button'>Create Service</button>
            </div>
        </div>
    )

}
