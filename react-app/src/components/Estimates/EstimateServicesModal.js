import React, { useEffect, useRef, useState } from "react";
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
    const inputRef = useRef(null)

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, [])

    const pickService = (e,serviceName) => {
        console.log("***",services.find(el=>el.name === serviceName))
        const pickedService = services.find(el=>el.name === serviceName)
        setServiceFiller(()=>({key: serviceNumber, serviceInfo: pickedService}))
        closeModal()
    }

    const filterSearch = (el,term) => {
        return new RegExp(term, 'gi').test(el)
    }
    if(!services) return null
    return (
        <div className="customers-modal">
            <div className="searchbar-container">
            <input ref={inputRef} type='text' value={search} onChange={e=>setSearch(e.target.value)}/>
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            </div>
            {services && sortObjectsByName(services).filter(el=>filterSearch(el.name,search)).map((el)=>(
                <div key={el.id} className="quick-tile" name={el.name} onClick={e=>pickService(e,el.name)}>{el.name}</div>
            ))}
        </div>
    )
}
