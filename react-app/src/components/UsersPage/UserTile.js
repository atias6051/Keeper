import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function UserTile({user}){
    const currentUser = useSelector(state=>state.session.user)
    const [userId,setUserId] = useState('')
    useEffect(()=>{
        if(user.id === currentUser.id) setUserId(()=>"current-user")
    },[currentUser])
    if(!currentUser) return null
    return (
        <div id={userId} className={`user-tile-container`}>
            <div>
                <span>First Name: </span>
                <p>{user.firstName}</p>
            </div>
            <div>
                <span>Last Name: </span>
                <p>{user.lastName}</p>
            </div>
            <div >
                <span>Phone: </span>
                <p>{user.phone}</p>
            </div>
            <div >
                <span>Email: </span>
                <p>{user.email}</p>
            </div>
            {user.admin? (
                <div className="admin-tag">
                    <h4>ADMIN <i class="fa-solid fa-check"></i></h4>
                </div>
            ):null}
        </div>
    )
}
