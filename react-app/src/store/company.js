import { setUser } from "./session"

const SET_COMPANY = 'company/SET_COMPANY'
const REMOVE_COMPANY = 'company/REMOVE_COMPANY'
const UPDATE_COMPANY = 'company/UPDATE_COMPANY'

const setComapny = company => ({
    type: SET_COMPANY,
    payload: company
})
const removeComapny = () => ({
    type: REMOVE_COMPANY
})

const updateCompany = company => ({
	type: UPDATE_COMPANY,
	payload: company
})

export const getCompany = () => async(dispatch) => {
    const res = await fetch("/api/company", {
		headers: {
			"Content-Type": "application/json",
		},
	})
    if(res.ok){
        const data = await res.json()
        if (data.errors) {
			return;
		}
        dispatch(setComapny(data))
    }
}

export const updateCompanyInfo = company => async(dispatch) => {
	const res = await fetch("/api/company", {
		method: 'PUT',
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(company)
	})
    if(res.ok){
        const data = await res.json()
        if (data.errors) {
			return;
		}
        dispatch(updateCompany(data))
		dispatch(getCompany())
    }
}

export const signupCompany = company => async(dispatch) => {
	const res = await fetch("/api/company", {
		method: 'POST',
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(company)
	})
    if(res.ok){
        const data = await res.json()
		dispatch(getCompany())
		dispatch(setUser(data.user))
		return null;
    }else if (res.status < 500) {
		const data = await res.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}
const initialState = {company: null}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_COMPANY:
			return { company: action.payload };
        case REMOVE_COMPANY:
            return {company: null}
		default:
			return state;
	}
}
