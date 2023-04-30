import { setUser } from "./session"

const SET_COMPANY = 'company/SET_COMPANY'
const REMOVE_COMPANY = 'company/REMOVE_COMPANY'
const UPDATE_COMPANY = 'company/UPDATE_COMPANY'
const SET_STATS = 'company/SET_STATS'

const setComapny = company => ({
    type: SET_COMPANY,
    payload: company
})
export const removeComapny = () => ({
    type: REMOVE_COMPANY
})

const updateCompany = company => ({
	type: UPDATE_COMPANY,
	payload: company
})

const setStats = stats => ({
	type: SET_STATS,
	payload: stats
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

export const getStats = () => async dispatch => {
	const res = await fetch("/api/company/stats", {
		headers: {
			"Content-Type": "application/json",
		}
	})
	if(res.ok){
        const data = await res.json()
		dispatch(setStats(data))
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

const initialState = {company: null, stats: null}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_COMPANY:
			return { ...state, company: action.payload };
        case REMOVE_COMPANY:
            return {...state,company: null}
		case SET_STATS:
			return {...state,stats: action.payload}
		default:
			return state;
	}
}
