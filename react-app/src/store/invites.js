const SET_INVITES = 'invites/SET_INVITES'

const setInvites = invites => ({
    type: SET_INVITES,
    payload: invites
})

export const getInvites = () => async(dispatch) => {
    const res = await fetch("/api/invites", {
		headers: {
			"Content-Type": "application/json",
		},
	})
    if(res.ok){
        const data = await res.json()
        if (data.errors) {
			return;
		}
        dispatch(setInvites(data))
    }
}

export const createInvite = invite => async(dispatch) => {
	const res = await fetch("/api/invites",{
		headers: {"Content-Type": "application/json"},
		method: 'POST',
        body: JSON.stringify(invite)
	})

	if(res.ok){
		dispatch(getInvites())
		return null
	}else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const deleteInvite = inviteId => async(dispatch) =>{
	const response = await fetch(`/api/invites/${inviteId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    })
    if (response.ok){
        dispatch(getInvites())
    }
}

export const editInvite = invite => async(dispatch) => {
	const res = await fetch(`/api/invites/${invite.id}`,{
		headers: {"Content-Type": "application/json"},
		method: 'PUT',
        body: JSON.stringify(invite)
	})
	if(res.ok){
        dispatch(getInvites())
    }
}

const initialState = {invites: null}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_INVITES:
			return { invites: action.payload };
		default:
			return state;
	}
}
