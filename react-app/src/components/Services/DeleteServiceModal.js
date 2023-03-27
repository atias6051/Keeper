import React, { useState } from "react";
import { login } from "../../store/session";
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { deleteService, getServices } from "../../store/service";

export default function DeleteServiceModal({service}){
    const {closeModal} = useModal()
    const history = useHistory()
    const dispatch = useDispatch()

    const handleDelete = async () => {
        await dispatch(deleteService(service.id))
        await dispatch(getServices())
        closeModal()
        history.push('/dashboard/services')
    }

    return (
      <div id='delete-modal-container'>
       <h2>Deleting Service</h2>
       <p>Deleting a Service will permanently destroy<br></br>
       the service record <br/>
       are you sure you want to delete this service?<br/>
       </p>
       <div className="delete-buttons">
          <button className="delete-customer" onClick={handleDelete}>Yes (Delete service)</button>
          <button  className="keep-button" onClick={closeModal}>No (Keep service)</button>
       </div>
      </div>
    );
}
