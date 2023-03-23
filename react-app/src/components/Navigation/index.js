import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from "../LoginFormModal";
import './Navigation.css';
import { logout } from '../../store/session';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const company = useSelector(state=>state.company.company)
	const dispatch = useDispatch()

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	};

	return (
		<div id="nav-bar">
		  <div className="flex-row space-b">
			<div>
			  <NavLink exact to="/">
				<img id="navbar-logo" src="https://i.imgur.com/ClSNsKh.png" />
			  </NavLink>
			</div>
			{sessionUser ? (
			  <div id="nav-right">
				{company?(<p className='hov' id="comp-name">{company.name}<i class="fa-sharp fa-solid fa-gear gear-style"></i></p>):""}
				<button onClick={handleLogout} className='login-nav-button'>Log Out</button>
			  </div>
			) : (
			  isLoaded && (
				<div>
				  <OpenModalButton
					buttonText="Log In"
					modalComponent={<LoginFormModal />}
					nameClass="login-nav-button"
				  />
				</div>
			  )
			)}
		  </div>
		</div>
	  );
}

export default Navigation;
