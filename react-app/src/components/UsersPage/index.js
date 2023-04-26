import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { getInvites, createInvite } from '../../store/invites';
import { generateKey } from '../../utils/keyGen';
import { inviteValidation } from '../../utils/formValidations';
import './index.css'
import UserTile from './UserTile';

export default function UsersPage(){
    const users = useSelector(state=> state.company.company.users)
    if(!users) return null
    console.log("Users---->",users)
    return (
        <div className='info-page'>
            <div className='user-title-div'>
                <i class="fa-solid fa-user user-icon"></i>
                <h2>Company Users</h2>
            </div>
            <div className='users-list'>
                {users.map(user=>(
                    <UserTile key={user.id} user={user}/>
                ))}
            </div>
        </div>
    )
}
