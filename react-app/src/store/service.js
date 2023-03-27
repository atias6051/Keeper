
const GET_ALL_SERVICES = 'service/GET_ALL_SERVICES'
const SET_SINGLE_SERVICE = 'service/SET_SINGLE_SERVICE'
const CLEAR_SINGLE_SERVICE = 'service/CLEAR_SINGLE_SERVICE'
const UPDATE_SERVICE = 'service/UPDATE_SERVICE'
const DELETE_SERVICE = 'service/DELETE_SERVICE'

const setServices = services => ({
    type: GET_ALL_SERVICES,
    payload: services
})

const setSingleService = service => ({
    type: SET_SINGLE_SERVICE,
    payload: service
})

export const clearSingleService = () => ({
    type: CLEAR_SINGLE_SERVICE
})

const removeService = id => ({
    type:DELETE_SERVICE,
    payload: id
})

const updateService = service => ({
    type: UPDATE_SERVICE,
    payload: service
})

export const getServices = () => async(dispatch) => {
    const res = await fetch("/api/services", {
        headers: {
            "Content-Type": "application/json",
		},
	})
    if(res.ok){
        const data = await res.json()
        if (data.errors) {
            return;
		}
        dispatch(setServices(data))
    }
}

export const getSingleService = id => async(dispatch) => {
    const res = await fetch(`/api/services/${id}`, {
        headers: {
            "Content-Type": "application/json",
		},
	})
    if(res.ok){
        const data = await res.json()
        if (data.errors) {
            return;
		}
        dispatch(setSingleService(data))
    }
}

export const deleteService = id => async(dispatch) => {
    const response = await fetch(`/api/services/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    })
    if (response.ok){
        dispatch(removeService(id))
    }
}

export const updateServiceInfo = (service,id) => async(dispatch) => {
    const response = await fetch (`/api/services/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(service)
    })
    if (response.ok){
        const data = await response.json()
        dispatch(updateService(data))
        return data
    }
}

export const createService = service => async(dispatch) => {
    const response = await fetch('/api/services',{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(service)
    })
    if(response.ok){
        const data = await response.json()
        await dispatch(setSingleService(data))
        await dispatch(getServices())
        return data
    }
}

const initialState = {services: null,singleService:null}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_SERVICES:
            return {
                ...state,
                services: action.payload
            }
        case SET_SINGLE_SERVICE:
            return {
                ...state,
                singleService: action.payload
            }
        case CLEAR_SINGLE_SERVICE:
            return {
                ...state,
                singleService: null
            }
        case DELETE_SERVICE:
            let temp = [...state.services]
            let ind = temp.find(el=> el.id === action.payload)
            temp.splice(ind,1)
            return {
                ...state,
                services: [...temp],
                singleService: null
            }
        case UPDATE_SERVICE:
            return {...state,singleService: action.payload}
		default:
			return state;
	}
}
