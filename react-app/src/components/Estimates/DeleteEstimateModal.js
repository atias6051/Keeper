import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./index.css";
import { useHistory } from "react-router-dom";
import { deleteEstimate } from "../../store/documents";

export default function DeleteEstimateModal({id}){
    const { closeModal } = useModal();
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDelete = async() =>{
        await dispatch(deleteEstimate(id))
        history.push('/dashboard/estimates')
        closeModal()
    }

    return (
        <div className="delete-estimate-modal">
            <p>Deleting this estimate will permenantly remove<br/>
            this record and it can not be restored<br/>
            Are you sure you want to delete this estimate?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    )
}
