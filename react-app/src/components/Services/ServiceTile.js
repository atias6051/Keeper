import React from 'react';
import { useModal } from '../../context/Modal';
import './index.css'
import SingleServiceModal from './SingleServiceModal';

export default function ServiceTile({service}){
    const { setModalContent, setOnModalClose, closeModal } = useModal();

    const modalOpener = () => {
        setModalContent(<SingleServiceModal service={service}/>);
    }
    const handleDelete = e =>{
        e.stopPropagation()
        console.log("HFFGFSSDF")
    }

    return(
        <div onClick={modalOpener} id={service.id} className='customer-tile center'>
            <div className='service-tile-inner'>
                <p className='bold-t'>{service.name}</p>
                <div className='service-tile-buttons'>
                    <button className='service-tile-button edit-service' onClick={modalOpener}>Edit</button>
                    <button className='service-tile-button delete-service' onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}
