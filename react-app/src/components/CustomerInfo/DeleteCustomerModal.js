import React, { useState } from "react";
import { login } from "../../store/session";
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './DelteCustomerModal.css';
import { deleteCustomer, getCustomers } from "../../store/customer";

export default function DeleteCustomerModal({customer}) {
  const {closeModal} = useModal()
  const history = useHistory()
  const dispatch = useDispatch()


    const handleDelete = async () => {
        await dispatch(deleteCustomer(customer))
        await dispatch(getCustomers())
        closeModal()
        history.push('/dashboard/customers')
    }

  return (
    <div id='delete-modal-container'>
     <h2>Deleting Customer</h2>
     <p>Deleting a customer will permanently destroy<br></br>
     all customer data and all related estimates and invoices. <br/>
     are you sure you want to delete this customer?<br/>
     <span>* We recomend never deleting customer info</span>
     </p>
     <div className="delete-buttons">
        <button className="delete-customer" onClick={handleDelete}>Yes (delete customer)</button>
        <button  className="keep-button" onClick={closeModal}>No (Keep customer)</button>
     </div>
    </div>
  );
}
