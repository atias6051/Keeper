import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSingleCustomer, getCustomers, clearSingle, updateCustomerIfo, createCustomer } from '../../store/customer';
import { customerValidation } from '../../utils/formValidations';
import './index.css'

export default function NewServiceForm(){
    const dispatch = useDispatch()
    const history = useHistory()
    const cleanObj = {name:'',description:'',price:''}

    return(
        <h1>connected</h1>
    )

}
