
const GET_ALL_SERVICES = 'service/GET_ALL_SERVICES'

const setServices = services => ({
    type: GET_ALL_SERVICES,
    payload: services
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

const initialState = {services: null}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_SERVICES:
            return {
                ...state,
                services: action.payload
            }
		default:
			return state;
	}
}
