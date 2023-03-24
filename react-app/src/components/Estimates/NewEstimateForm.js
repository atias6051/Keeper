import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { removeKey } from '../../utils/documentUtils';
import { formatNumString } from '../../utils/general';
import EditInviteModal from '../CompanyPage/EditInviteModal';
import OpenModalButton from '../OpenModalButton';
import './index.css'

export default function NewEstimateForm({customer}){
    const company = useSelector(state=>state.company.company)
    const services = useSelector(state=>state.service.services)
    const dispatch = useDispatch()
    const emptyServiceObj = {
        companyId:company.id,
        name: '',
        description: '',
        price: '',
        quantity: '',
        id: null
    }

    const [customerInfo,setCustomerInfo] = useState(customer)
    const [numServices,setNumServices] = useState(1)
    const [serviceList,setServiceList] = useState({1:emptyServiceObj})

    const handleChange = (e,serviceId) => {
        let value = e.target.value
        if(e.target.name === 'quantity' || e.target.name === 'price'){
            value = formatNumString(value)
        }
        const newObj = {
            ...serviceList,
            [serviceId]:{
                ...serviceList[serviceId],
                [e.target.name]:value
            }
        }
        setServiceList(()=> newObj)
    }
    const addService = e => {
        let newObj = {
            ...serviceList,
            [numServices+1]: emptyServiceObj
        }
        setNumServices(() => numServices+1)
        setServiceList(()=> newObj)
    }

    const removeService = async(e,serviceNumber) => {
        if(numServices===1) return

        const newObj = removeKey(serviceList,serviceNumber)
        setServiceList(()=>newObj)
        setNumServices(numServices => numServices-1)

        // if()

    }

    if(!company) return null

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
                <p>New Estimate</p>
                <div id="estimate-customer-info">
                    {customerInfo?(
                        'got one'
                    ):(
                        'non'
                    )}
                </div>
            </div>
            <div className='estimate-services'>
                {Object.entries(serviceList).map((el)=>(
                    <div key={el[0]} className='single-service-container'>
                        <div className='single-service'>
                            <div className='container-test'>
                                <input id='name-input' className='spot-a' placeholder='Service Name' onChange={ e => handleChange(e,el[0])} type='text' name='name' value={el[1].name}/>
                                <OpenModalButton
                                    modalComponent={<EditInviteModal/>}
                                    buttonText="Services List"
                                    nameClass="service-list-link"
                                />
                            </div>
                            <input id='price-input' className='spot-b' placeholder='Price' onChange={ e => handleChange(e,el[0])} type='number' name='price' value={el[1].price}/>
                            <input id='quantity-input' className='spot-c' placeholder='Quantity' onChange={ e => handleChange(e,el[0])} type='number' name='quantity' value={el[1].quantity}/>
                            <p id='service-total' className='spot-d'>${isNaN(el[1].price*el[1].quantity)?'0':el[1].price*el[1].quantity}</p>
                            {/* <input id='description-input' className='spot-e' placeholder='Service Description' onChange={ e => handleChange(e,el[0])} type='text' name='description' value={el[1].description}/> */}
                            <textarea id='description-input' className='spot-e' placeholder='Service Description' onChange={ e => handleChange(e,el[0])} name='description' value={el[1].description}/>
                        </div>
                        <div>
                            <i value={el[0]} onClick={e => removeService(e,el[0])} class="fa-solid fa-x remove-service-button"></i>
                        </div>
                    </div>
                ))}
                <div>
                    <button className='create-button' onClick={addService}>Add Service</button>
                </div>
            </div>
        </div>
    )
}
