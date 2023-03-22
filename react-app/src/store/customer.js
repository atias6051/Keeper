const SET_CUSTOMERS = 'customer/SET_CUSTOMERS'
const SET_SINGLE_CUSTOMER = 'customer/SET_SINGLE_CUSTOMER'
const CLEAR_SINGLE_CUSTOMER = 'customer/CLEAR_SINGLE_CUSTOMER'
const UPDATE_CUSTOMER = 'customer/UPDATE_CUSTOMER'
const ADD_CUSTOMER = 'customer/ADD_CUSTOMER'
const DELETE_CUSTOMER = 'customer/DELETE_CUSTOMER'

const setCustomers = customers => ({
    type: SET_CUSTOMERS,
    payload: customers
})

const removeCustomer = customer => ({
    type: DELETE_CUSTOMER,
    payload: customer
})

const setSingleCustomer = customer => ({
    type: SET_SINGLE_CUSTOMER,
    payload: customer
})

const clearSingleCustomer = () => ({
    type: CLEAR_SINGLE_CUSTOMER
})

const updateCustomer = customer => ({
    type: UPDATE_CUSTOMER,
    payload: customer
})

const addCustomer = customer => ({
    type: ADD_CUSTOMER,
    payload: customer
})

export const clearSingle = () => dispatch =>{
    dispatch(clearSingleCustomer())
}

export const getCustomers = () => async(dispatch) => {
    const res = await fetch("/api/customers", {
		headers: {
			"Content-Type": "application/json",
		},
	})
    if(res.ok){
        const data = await res.json()
        if (data.errors) {
			return;
		}
        dispatch(setCustomers(data))
    }
}

export const getSingleCustomer = id => async(dispatch) => {
    const res = await fetch(`/api/customers/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
	})
    if(res.ok){
        const data = await res.json()
        if (data.errors) {
			return;
		}
        dispatch(setSingleCustomer(data))
    }
}

export const updateCustomerIfo = (customer,id) => async(dispatch) => {
    const response = await fetch (`/api/customers/${id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(customer)
    })
    if (response.ok){
        const data = await response.json()
        dispatch(updateCustomer(data))
        return data
    }
}

export const createCustomer = customer => async(dispatch) => {
    const response = await fetch('/api/customers', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(customer)
    })
    if (response.ok){
        const data = await response.json()
        await dispatch(addCustomer(data))
        return data
    }
}

export const deleteCustomer = customer => async(dispatch) => {
    const response = await fetch(`/api/customers/${customer.id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    })
    if (response.ok){
        dispatch(removeCustomer(customer))
    }
}

const initialState = {customers: null,singleCustomer: null}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_CUSTOMERS:
			return { customers: action.payload };
        case SET_SINGLE_CUSTOMER:
            return {...state, singleCustomer: action.payload};
        case CLEAR_SINGLE_CUSTOMER:
            return {...state, singleCustomer: null}
        case UPDATE_CUSTOMER:
            return {...state, singleCustomer: action.payload}
        case ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, action.payload],
                singleCustomer: action.payload
            }
        case DELETE_CUSTOMER:
            let temp = [...state.customers]
            let ind = temp.find(el=> el.id === action.payload.id)
            temp.splice(ind,1)
            return {
                ...state,
                customers: [...temp]
            }
		default:
			return state;
	}
}
