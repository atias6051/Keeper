import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import "./index.css";

export default function SingleServiceModal({service}){

    return(
        <div className="service-modal-container">
            <div>{service.name}</div>
            <div>{service.description}</div>
            <div>${service.price}</div>
        </div>
    )
}
