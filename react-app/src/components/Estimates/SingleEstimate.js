import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSignelDocument } from '../../store/documents';

export default function SingleEstimate(){
    const {id} = useParams()
    const dispatch = useDispatch()
    const estimate = useSelector(state=>state.documents.singleDocument)

    useEffect(()=>{
        dispatch(getSignelDocument(id))
    },[dispatch])


    if(!estimate) return null
    return (
        <div>
            <p>{estimate.customerName}</p>
        </div>
    )
}
