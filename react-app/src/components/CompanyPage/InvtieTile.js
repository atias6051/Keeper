import OpenModalButton from '../OpenModalButton';
import DeleteInviteModal from './DeleteInviteModal';
import EditInviteModal from './EditInviteModal';

export default function InviteTile({invite}){

    return(
        <div className={invite.active?"invite-tile-container":"join-invite-tile"}>
                <div className="invite-tile">
                <div className='tile-single-div'>
                <span>First Name: </span>
                <p>{invite.firstName}</p>
                </div>
                <div className='tile-single-div'>
                <span>Last Name: </span>
                <p>{invite.lastName}</p>
                </div>
                <div className='tile-single-div'>
                <span className='email-span'>Email: </span>
                <p>{invite.email}</p>
                </div>
                <div className='tile-single-div'>
                <span>Status: </span>
                <p>{invite.active? 'ACTIVE':'JOINED'}</p>
                </div>
                </div>
                <div className="tile-buttons">
                    {invite.active?(
                        <OpenModalButton
                        modalComponent={<EditInviteModal invite={invite}/>}
                        buttonText="Edit"
                        nameClass="keep-customer"
                        />
                    ):""}
                        <OpenModalButton
                        modalComponent={<DeleteInviteModal invite={invite}/>}
                        buttonText="Remove"
                        nameClass="delete-customer"
                        />


                </div>
        </div>
    )
}
