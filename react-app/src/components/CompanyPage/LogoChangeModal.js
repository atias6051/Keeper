import React, { useEffect, useState } from 'react';
import { useModal } from '../../context/Modal';
import { validLogoUrl } from '../../utils/dataChecks';

export default function LogoChangeModal({companyInfo,setCompanyInfo}){
    const {closeModal} = useModal()
    const [ogLogo,setOgLogo] = useState(companyInfo.logoUrl)
    const [logoInput,setLogoInput] = useState(companyInfo.logoUrl)
    const [logoDisplay,setLogoDisplay] = useState(companyInfo.logoUrl)
    const [errors,setErrors] = useState(false)

    const handleUpdate = e => {
        let url = logoInput
        // if(!url.length) return
        if(!url.length || !validLogoUrl(url)){
            setErrors(true)
            return
        }
        setErrors(false)
        setLogoDisplay(()=>url)
    }

    const handleSave = () => {
        let url = logoInput
        // if(!url.length) return
        if(!url.length || !validLogoUrl(url)){
            setErrors(true)
            return
        }
        let newObj = {
            ...companyInfo,
            logoUrl: url
        }
        setCompanyInfo(()=>newObj)
        closeModal()
    }

    return (
        <div className='logo-change-modal'>
            <img src={logoDisplay} />
            <label>Logo url</label>
            <input value={logoInput} onChange={e=>setLogoInput(e.target.value)} type='text' />
            {errors?(<span>to update or save you must provide<br/>
            a logo in one of the following formats:<br/>
            PNG, JPEG, JPG, GIf</span>):''}
            <div className='flex-space-row width-100'>
                <button className='create-button' onClick={handleUpdate}>Update</button>
                <button className='create-button' onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}
