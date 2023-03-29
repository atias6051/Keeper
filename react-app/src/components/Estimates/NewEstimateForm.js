import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { dateForInput, formatDate, removeKey, sumTotal } from '../../utils/documentUtils';
import { formatNumString } from '../../utils/general';
import OpenModalButton from '../OpenModalButton';
import EstimateCustomerModal from './EstimateCustomerModal';
import EstimateServicesModal from './EstimateServicesModal';
import { postEstimate,getSignelDocument, updateEstimate } from '../../store/documents';
import './index.css'
import DeleteEstimateModal from './DeleteEstimateModal';

export default function NewEstimateForm({customer}){
    const {id} = useParams()
    const history = useHistory()
    const location = useLocation()
    const company = useSelector(state=>state.company.company)
    const services = useSelector(state=>state.service.services)
    const customers = useSelector(state=>state.customer.customers)
    const estimate = useSelector(state=>state.documents.singleDocument)


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
    const [total,setTotal] = useState(0)
    const [serviceFiller,setServiceFiller] = useState({})
    const [discount,setDiscount] = useState(0)
    const [date,setDate] = useState(new Date().toISOString().slice(0,10))
    const [submitted,setSubmitted] = useState(false)
    const [created,setCreated] = useState(false)
    const [showSavedMessage, setShowSavedMessage] = useState(false);
    const [customerMessage,setCustomerMessage] = useState(false)


    useEffect(()=>{
        if(id){
            dispatch(getSignelDocument(id))
        }
    },[dispatch,location])

    useEffect(()=>{
        if(id && estimate && customers){
            setCustomerInfo(()=>customers.find(el=>el.id===estimate.customerId))
            setServiceList(()=>estimate.services)
            setDate(()=> dateForInput(estimate.date))
            setDiscount(()=>estimate.discount)
            setNumServices(()=>Object.keys(estimate.services).length)
        }else{
            setCustomerInfo(()=>customer)
            setServiceList(()=>({1:emptyServiceObj}))
            setDate(()=> new Date().toISOString().slice(0,10))
            setDiscount(()=> 0)
            setNumServices(()=> 1)
        }
    },[id,estimate,location])

    useEffect(()=>{
        setTotal(()=>sumTotal(serviceList)-discount)
    },[serviceList,discount])

    useEffect(()=>{
        if(!Object.keys(serviceFiller).length) return
        const newObj = {
            ...serviceList,
            [serviceFiller.key]: {
                ...serviceFiller.serviceInfo,
                quantity: 1
            }
        }
        setServiceList(()=>newObj)
        setServiceFiller(()=> ({}))
    },[serviceFiller])

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
        if(numServices===1){
            setServiceList(()=>({1:emptyServiceObj}))
            return
        }
        const newObj = removeKey(serviceList,serviceNumber)
        setNumServices(numServices => numServices-1)
        setServiceList(()=>newObj)
    }

    const changeDate = e => {
        setDate(()=>e.target.value)
    }

    const reserServices = e => {
        setServiceList(()=>estimate.services)
        setNumServices(()=> Object.keys(estimate.services).length)
    }

    const handleSubmit = async e =>{
        setSubmitted(()=>true)
        if(!customerInfo){
            setCustomerMessage(()=>true);
            setTimeout(() => {
              setCustomerMessage(()=>false);
            }, 3000);
            return
        }
        if(JSON.stringify(serviceList) === JSON.stringify({1:emptyServiceObj})) return
        const estimateObj = {
            customerId: customerInfo.id,
            services: JSON.stringify(serviceList),
            discount: discount,
            date: formatDate(date)
        }
        let est
        if(id){
            est = await dispatch(updateEstimate({...estimateObj,id:estimate,id}))
            setShowSavedMessage(()=>true);
            setTimeout(() => {
              setShowSavedMessage(()=>false);
            }, 3000);
        }else{
            est = await dispatch(postEstimate(estimateObj))
            history.push(`/dashboard/estimates/${est.id}`)
        }
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
                <div className='title-div'>
                    <p>New Estimate</p>
                    <div className={`saved-div-abs ${showSavedMessage ? 'show' : ''}`}>Saved!</div>
                </div>
                <div id="estimate-customer-info">
                    {customerInfo?(
                        <div className='customer-info-box'>
                            <small>{customerInfo.name}</small>
                            <small>{customerInfo.phone}</small>
                            <small>{customerInfo.email}</small>
                            <small>{customerInfo.address}</small>
                        </div>
                    ):(
                        <div className='title-div'>
                        <OpenModalButton
                            modalComponent={
                            <EstimateCustomerModal
                                customerInfo={customerInfo}
                                setCustomerInfo={setCustomerInfo}
                            />}
                            buttonText="+ Add Customer"
                            nameClass="add-customer-estimate"
                        />
                            <div className={`customer-required ${customerMessage? 'show':''}`} >
                                Customer required
                            </div>
                        </div>
                    )}
                    <label>
                        <small>Date   </small>
                        <input id='date-input' type='date' value={date} onChange={changeDate}/>
                    </label>
                </div>
            </div>
            <div className='estimate-services'>
                {serviceList && Object.entries(serviceList).map((el)=>(
                    <div key={el[0]} className='single-service-container'>
                        <div className='single-service'>
                            <div className='container-test spot-a'>
                                <input id='name-input' className='spot-a' placeholder='Service Name' onChange={ e => handleChange(e,el[0])} type='text' name='name' value={el[1].name}/>
                                <OpenModalButton
                                    modalComponent={
                                    <EstimateServicesModal
                                        serviceFiller={serviceFiller}
                                        setServiceFiller={setServiceFiller}
                                        serviceNumber={el[0]}
                                    />}
                                    buttonText="Services List"
                                    nameClass="service-list-link"
                                />
                            </div>
                            <input id='price-input' className='spot-b' placeholder='Price' onChange={ e => handleChange(e,el[0])} type='number' name='price' value={el[1].price}/>
                            <input id='quantity-input' className='spot-c' placeholder='Quantity' onChange={ e => handleChange(e,el[0])} type='number' name='quantity' value={el[1].quantity}/>
                            <p id='service-total' className='spot-d'>${isNaN(el[1].price*el[1].quantity)?'0':el[1].price*el[1].quantity}</p>
                            <textarea id='description-input' className='spot-e' placeholder='Service Description' onChange={ e => handleChange(e,el[0])} name='description' value={el[1].description}/>
                        </div>
                        <div>
                            <i value={el[0]} onClick={e => removeService(e,el[0])} class="fa-solid fa-x remove-service-button"></i>
                        </div>
                    </div>
                ))}
                <div className='services-buttons'>
                    <button className='create-button' onClick={addService}>Add Service</button>
                    {id?(<button className='create-button' onClick={reserServices}>Reset Services</button>):(<div></div>)}
                </div>
                <div className='totals-div'>
                    <label>Discount</label>
                    <input className="discount-estimate" type='number' value={discount} onChange={e=>setDiscount(e.target.value)} />
                    <p>{`Total: `}<strong>${total}</strong></p>
                </div>
                <div className='estimate-buttons-buttom'>

                <button className='create-button' onClick={handleSubmit}>Save</button>
                {id && (
                    <OpenModalButton
                    modalComponent={
                        <DeleteEstimateModal
                        id={id}
                        />}
                        buttonText="Delete Estimate"
                        nameClass="delete-estimate-button"
                        />
                        )}
                </div>
            </div>
        </div>
    )
}
