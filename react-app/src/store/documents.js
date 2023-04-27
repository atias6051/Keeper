import { sumTotal } from "../utils/documentUtils"

const SET_ESTIMATES = 'documents/SET_ESTIMATES'
const CREATE_ESTIMATE = 'documents/CREATE_ESTIMATE'
const SET_SINGLE_DOCUMENT = 'documents/SET_SINGLE_DOCUMENT'
const CLEAR_SINGLE_DOCUMENT = 'documents/CLEAR_SINGLE_DOCUMENT'

const setEstimates = estimates => ({
    type: SET_ESTIMATES,
    payload: estimates
})

const createEstimate = estimate => ({
    type: CREATE_ESTIMATE,
    payload: estimate
})

const setSingleDocument = doc => ({
    type:SET_SINGLE_DOCUMENT,
    payload: doc
})

const clearSingleDocument = () => ({
    type: CLEAR_SINGLE_DOCUMENT
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

export const postEstimate = estimate => async(dispatch) => {
    const response = await fetch('/api/documents/estimates', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(estimate)
    })
    if (response.ok){
        const data = await response.json()
        await dispatch(getEstimates())
        return data
    }
}

export const getSignelDocument = id => async(dispatch) => {
    const res = await fetch(`/api/documents/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
    if(res.ok){
        const data = await res.json()
        if (data.errors) {
			return;
		}
        dispatch(setSingleDocument(data))
    }
}

export const updateEstimate = estimate => async(dispatch) => {
    const res = await fetch(`/api/documents/${estimate.id}`, {
		method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(estimate)
	})
    if(res.ok){
        const data = await res.json()
        if (data.errors) {
			return;
		}
        dispatch(setSingleDocument(data))
        return data
    }
}

export const deleteEstimate = id => async(dispatch) => {
    const res = await fetch(`/api/documents/${id}`, {
		method:"DELETE",
        headers:{"Content-Type":"application/json"}
	})
    if(res.ok){
        const data = await res.json()
        if (data.errors) {
			return;
		}
        dispatch(getEstimates())
        dispatch(clearSingleDocument())
    }
}

const initialState = {estimates:null, invoices:null, singleDocument:null}

export default function reducer(state = initialState, action) {
	switch (action.type) {
        case SET_ESTIMATES:
            let parsed = action.payload.map(el=>({...el,services:JSON.parse(el.services)}))
            .map(est=> ({...est,total: sumTotal(est.services)-est.discount}))
            let estimates = parsed.filter(el=>!el.isInvoice)
            let invoices = parsed.filter(el=>el.isInvoice)

            return {...state,estimates: estimates,invoices: invoices}
        case SET_SINGLE_DOCUMENT:
            return {...state,
                singleDocument: {...action.payload,
                    services: JSON.parse(action.payload.services)
                }}
        case CLEAR_SINGLE_DOCUMENT:
            return {...state, singleDocument:null}
		default:
			return state;
	}
}
