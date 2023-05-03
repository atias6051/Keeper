import React, { useEffect, useState } from "react";
import { inviteSignUp, login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { inviteSignupValidation } from "../../utils/formValidations";
import "./index.css";

export default function InviteSignupModal({invite}){

    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const [submitObj,setSubmitObj] = useState({phone:'',password:'',passwordConfirm:''})
    const [validationsObj,setValidationObj] = useState({...submitObj,errors:false})
    const [submitted,setSubmitted] = useState(false)
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        setValidationObj(()=>inviteSignupValidation(submitObj))
    },[submitObj])

    const handleChange = e => {
        const newObj = {
            ...submitObj,
            [e.target.name]: e.target.value
        }
        setSubmitObj(()=>newObj)
    }

    const handleSubmit = async e => {
        setSubmitted(()=>true)
        if(validationsObj.errors) return
        const payload = {
            first_name: invite.firstName,
            last_name: invite.lastName,
            email: invite.email,
            password: submitObj.password,
            phone: submitObj.phone,
            company_id: invite.companyId,
            invite_id: invite.id
        }
        const data = await dispatch(inviteSignUp(payload))
        if(data){
            setErrors(data);
        }else{
            closeModal()
        }
    }

    return (
        <div id="invite-signup-modal">
            <h3>{`Join ${invite.companyName}'s Team`}</h3>
            <h5><span>First name: </span>{invite.firstName}</h5>
            <h5><span>Last name: </span>{invite.lastName}</h5>
            <div className="form10">
                <input onChange={handleChange} name='phone' value={submitObj.phone} placeholder="Enter Phone Number..." type="number"></input>
                {submitted && validationsObj.errors && validationsObj.phone?(<small>{validationsObj.phone}</small>):''}
                <input onChange={handleChange} name='password' value={submitObj.password} placeholder="Enter Password..." type="password"></input>
                {submitted && validationsObj.errors && validationsObj.password?(<small>{validationsObj.password}</small>):''}
                {/* <span>{validationsObj.password}</span> */}
                <input onChange={handleChange} name='passwordConfirm' value={submitObj.passwordConfirm} placeholder="Confirm Password..." type="password"></input>
            </div>
            <button className="create-button" onClick={handleSubmit}>Join The Team</button>
            <ul>
			    {errors.map((error, idx) => (
			    	<li style={{listStyle: 'none',color: 'red'}} key={idx}>{error}</li>
			    ))}
			</ul>
        </div>
    )
}
