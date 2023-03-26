import React, { useEffect, useState } from "react";
import { inviteSignUp, login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { inviteSignupValidation } from "../../utils/formValidations";
import "./index.css";
import { sortObjectsByName } from "../../utils/documentUtils";

export default function EstimateServicesModal({serviceFiller,setServiceFiller,serviceNumber}){
    const { closeModal } = useModal();
    const services = useSelector(state=>state.service.services)
    const [search,setSearch] = useState('')

    const pickService = (e,serviceName) => {
        console.log("***",services.find(el=>el.name === serviceName))
        const pickedService = services.find(el=>el.name === serviceName)
        setServiceFiller(()=>({key: serviceNumber, serviceInfo: pickedService}))
        closeModal()
    }

    console.log('---->', serviceNumber)
    if(!services) return null
    return (
        <div className="services-modal">
            <input type='text' value={search} onChange={e=>setSearch(e.target.value)}/>
            {services && sortObjectsByName(services).map((el)=>(
                <div name={el.name} onClick={e=>pickService(e,el.name)}>{el.name}</div>
            ))}
        </div>
    )
}
