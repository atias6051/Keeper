import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { getInvites, createInvite } from '../../store/invites';
import { generateKey } from '../../utils/keyGen';
import { inviteValidation } from '../../utils/formValidations';
import './index.css'

export default function UsersInfo(){

    return (
        <div className='info-page'>

        </div>
    )
}
