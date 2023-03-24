import { sumTotal } from "../utils/documentUtils"

const SET_ESTIMATES = 'documents/SET_ESTIMATES'

const setEstimates = estimates => ({
    type: SET_ESTIMATES,
    payload: estimates
})

export const getEstimates = () => async(dispatch) => {
    const res = await fetch("/api/documents/estimates", {
		headers: {
			"Content-Type": "application/json",
		},
	})
    if(res.ok){
        const data = await res.json()
        if (data.errors) {
			return;
		}
        dispatch(setEstimates(data))
    }
}

const initialState = {estimates: null, invoices:null}

export default function reducer(state = initialState, action) {
	switch (action.type) {
        case SET_ESTIMATES:
            let parsed = action.payload.map(el=>({...el,services:JSON.parse(el.services)}))
            .map(est=> ({...est,total: sumTotal(est.services)}))
            let invoices = action.payload.filter(el=>el.isInvoice)
            return {...state,estimates: parsed,invoices: invoices}
		default:
			return state;
	}
}
