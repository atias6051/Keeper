const SET_COMPANY = 'company/SET_COMPANY'
const REMOVE_COMPANY = 'company/REMOVE_COMPANY'

const setComapny = company => ({
    type: SET_COMPANY,
    payload: company
})
const removeComapny = () => ({
    type: REMOVE_COMPANY
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
