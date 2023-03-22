import { isValidEmail, validPhone } from "./dataChecks"

export const customerValidation = (customer,errorsTemp) => {

    const errorsObj = {...errorsTemp,errors: false}
    if(customer.name.length < 3){
        errorsObj.name = "Name must have at least 3 characters"
        errorsObj.errors = true
    }
    if(customer.name.length > 100){
        errorsObj.name = "Name must be under 100 characters"
        errorsObj.errors = true
    }
    if(customer.email.length === 0){
        errorsObj.email = "Customer must have an email address"
        errorsObj.errors = true
    }
    if(customer.email.length && !isValidEmail(customer.email)){
        errorsObj.email = "Email address is invalid"
        errorsObj.errors = true
    }
    if(!customer.phone.length){
        errorsObj.phone = "Phone number is required"
        errorsObj.errors = true
    }
    if(customer.phone.length < 6 || customer.phone.length > 12 ){
        errorsObj.phone = "Phone number must be between 6-12 digits"
        errorsObj.errors = true
    }
    if(!validPhone(customer.phone)){
        errorsObj.phone = "Invalid phone number - please enter digits only"
        errorsObj.errors = true
    }
    if(!customer.address.length){
        errorsObj.address = "Customer must have address"
        errorsObj.errors = true
    }
    if(customer.address.length > 250){
        errorsObj.address = "Customer address must be shorter than 250 characters"
        errorsObj.errors = true
    }
    if(!customer.city.length){
        errorsObj.city = "Customer must have city"
        errorsObj.errors = true
    }
    if(customer.city.length > 100){
        errorsObj.city = "Customer city must be shorter than 100 characters"
        errorsObj.errors = true
    }
    if(!customer.state.length){
        errorsObj.state = "Customer must have state"
        errorsObj.errors = true
    }
    if(customer.state.length > 100){
        errorsObj.state = "Customer state must be shorter than 100 characters"
        errorsObj.errors = true
    }

    return errorsObj
}
