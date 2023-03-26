import React, { useEffect, useState } from "react";
import { inviteSignUp, login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { inviteSignupValidation } from "../../utils/formValidations";
import "./index.css";
import { sortObjectsByName } from "../../utils/documentUtils";

export default function EstimateCustomerModal({customerInfo,setCustomerInfo}){
    const { closeModal } = useModal();
    const customers = useSelector(state=>state.customer.customers)
    const [search,setSearch] = useState('')

    const pickCustomer = (e,customerName) => {
        setCustomerInfo(()=>customers.find(el=>el.name===customerName))
        closeModal()
    }

    // console.log('---->', serviceNumber)
    if(!customers) return null
    return (
        <div className="customers-modal">
            <input type='text' value={search} onChange={e=>setSearch(e.target.value)}/>
            {customers && sortObjectsByName(customers).map((el)=>(
                <div name={el.name} onClick={e=>pickCustomer(e,el.name)}>{el.name}</div>
            ))}
        </div>
    )
}
