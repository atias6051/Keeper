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
        console.log("6666--->",estimate.services)
        if(estimate){
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
                    <div key={i} className='single-service-container'>
                        <p>{el.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
