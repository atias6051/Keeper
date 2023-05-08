import React from 'react';
import {  useSelector } from 'react-redux';
import './index.css'
import UserTile from './UserTile';

export default function UsersPage(){
    const users = useSelector(state=> state.company.company.users)
    if(!users) return null
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
