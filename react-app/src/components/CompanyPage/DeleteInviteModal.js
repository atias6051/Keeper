import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { deleteInvite } from '../../store/invites';

export default function DeleteInviteModal({invite}) {
    const {closeModal} = useModal()
    const history = useHistory()
    const dispatch = useDispatch()

    const handleDelete = async() =>{
        await dispatch(deleteInvite(invite.id))
        closeModal()
    }

    return (
        <div className='delete-invite-modal'>
            <p>Deleting this invite will<br/>
            remove email from access to this company<br/>
            <small>Are you sure you want to procceed?</small></p>
            <div>
                <button className="delete-estimate-button" onClick={handleDelete}>Yes (Delete Invite)</button>
                <button className="create-button" onClick={closeModal}>No (Keep Invite)</button>
            </div>
        </div>
    )
}
