import React, { useEffect, useState, useRef } from "react";
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
    const inputRef = useRef(null)

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, [])

    const pickCustomer = (e,customerName) => {
        setCustomerInfo(()=>customers.find(el=>el.name===customerName))
        closeModal()
    }

    const filterSearch = (el,term) => {
        return new RegExp(term, 'gi').test(el)
    }
    if(!customers) return null
    return (
        <div className="customers-modal">
            <div className="searchbar-container">
                <input ref={inputRef} type='text' value={search} onChange={e=>setSearch(e.target.value)}/>
                <i class="fa-solid fa-magnifying-glass search-icon"></i>
            </div>
            {customers && sortObjectsByName(customers).filter(el=>filterSearch(el.name,search)).map((el)=>(
                <div key={el.id} className="quick-tile" name={el.name} onClick={e=>pickCustomer(e,el.name)}>{el.name}</div>
            ))}
        </div>
    )
}
