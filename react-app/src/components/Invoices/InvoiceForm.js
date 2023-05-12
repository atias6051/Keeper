import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getSignelDocument } from '../../store/documents';
import './index.css'

export default function InvoiceForm(){
    const dispatch = useDispatch()
    const {id} = useParams()
    const estimate = useSelector(state=>state.documents.singleDocument)
    const company = useSelector(state=>state.company.company)
    const customers = useSelector(state=>state.customer.customers)

    const [customerInfo,setCustomerInfo] = useState(null)

    useEffect(()=>{
        dispatch(getSignelDocument(id))
    },[dispatch])

    useEffect(()=>{
        if(estimate && customers){
            console.log("6666--->",estimate.services)
            setCustomerInfo(()=>customers.find(el=>el.id===estimate.customerId))
        }
    },[estimate])

    useEffect(()=>{
        console.log("customer info- -->",customerInfo)
    },[customerInfo])

    if(!estimate || !company || !customerInfo) return (<div>loadind!</div>)
    return (
        <div className='tile-display'>
            <div className='eastimate-top-info'>
                <div id="estimate-company-info">
                    <img id='document-logo' src={company.logoUrl} />
                    <small>{company.name}</small>
                    <small>{company.address}</small>
                    <span>
                        <small>{company.city}, {company.state}</small>
                    </span>
                </div>
                <div className='title-div'>
                    <p>{`Invoice #${estimate.id}`}</p>
                </div>
                <div className='customer-info-box'>
                    <small>{customerInfo.name}</small>
                    <small>{customerInfo.phone}</small>
                    <small>{customerInfo.email}</small>
                    <small>{customerInfo.address}</small>
                    <small>{`Date: ${estimate.date}`}</small>
                </div>
            </div>
            <div className='estimate-services'>
                {Object.values(estimate.services).map((el,i)=>(
                    <div key={i} className='single-service-grid'>
                        <div className='single-service-grid__top-row'>
                            <p className='service-name'>{el.name}</p>
                            <p className='width-spacer'>{`Quantity: ${el.quantity}`}</p>
                            <p className='width-spacer'>{`Price: ${el.price}`}</p>
                            <p className='width-spacer'>{`Total: ${(el.price*el.quantity).toFixed(2)}`}</p>
                        </div>
                        <p className='description-box'>{el.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
