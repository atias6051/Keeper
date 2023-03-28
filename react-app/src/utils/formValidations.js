import { isValidEmail, validLogoUrl, validPhone } from "./dataChecks"

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

export const inviteValidation  = invite => {
    let errorsObj = {
        errors: false
    }
    if(invite.email.length === 0){
        errorsObj.email = "Email required"
        errorsObj.errors = true
    }
    if(invite.email.length && !isValidEmail(invite.email)){
        errorsObj.email = "Email address is invalid"
        errorsObj.errors = true
    }
    if(invite.firstName.length === 0){
        errorsObj.firstName = "First name required"
        errorsObj.errors = true
    }
    if(invite.firstName.length > 100){
        errorsObj.firstName = "First name must be under 100 characters"
        errorsObj.errors = true
    }
    if(invite.lastName.length === 0){
        errorsObj.lastName = "Last name required"
        errorsObj.errors = true
    }
    if(invite.lastName.length > 100){
        errorsObj.lastName = "Last name must be under 100 characters"
        errorsObj.errors = true
    }

    return errorsObj
}

export const inviteSignupValidation = invite => {
    let errorsObj = {
        errors: false
    }
    if(!invite.phone.length){
        errorsObj.phone = "Phone number is required"
        errorsObj.errors = true
    }
    if(invite.phone.length < 6 || invite.phone.length > 12 ){
        errorsObj.phone = "Phone number must be between 6-12 digits"
        errorsObj.errors = true
    }
    if(!validPhone(invite.phone)){
        errorsObj.phone = "Invalid phone number - please enter digits only"
        errorsObj.errors = true
    }
    if(!invite.password.length){
        errorsObj.password = "Passwords required"
        errorsObj.errors = true
    }
    if(invite.password !== invite.passwordConfirm){
        errorsObj.password = "Passwords dont match"
        errorsObj.errors = true
    }
    return errorsObj
}

export const serviceValidation = service => {
    let errorsObj = {
        errors: false
    }
    if(!service.name.length){
        errorsObj.name = "Service must have a name"
        errorsObj.errors = true
    }
    if(service.name.length > 255){
        errorsObj.name = "Service name must be under 255 characters"
        errorsObj.errors = true
    }
    if(!service.price){
        errorsObj.price = "Service must have a price"
        errorsObj.errors = true
    }
    if(!service.description.length){
        errorsObj.description = "Service must have a description"
        errorsObj.errors = true
    }

    return errorsObj
}

export const companyValidations = company => {
    let errorsObj = {
        errors: false
    }
    if(!company.name.length){
        errorsObj.name = "Company must have a name"
        errorsObj.errors = true
    }
    if(company.name.length > 255){
        errorsObj.name = "Company name must be under 255 characters"
        errorsObj.errors = true
    }
    if(!company.phone.length){
        errorsObj.phone = "Phone number is required"
        errorsObj.errors = true
    }
    if(company.phone.length < 6 ||company.phone.length > 12 ){
        errorsObj.phone = "Phone number must be between 6-12 digits"
        errorsObj.errors = true
    }
    if(!validPhone(company.phone)){
        errorsObj.phone = "Invalid phone number - please enter digits only"
        errorsObj.errors = true
    }
    if(!company.address.length){
        errorsObj.address = "Company must have address"
        errorsObj.errors = true
    }
    if(company.address.length > 250){
        errorsObj.address = "Company address must be shorter than 250 characters"
        errorsObj.errors = true
    }
    if(!company.city.length){
        errorsObj.city = "Company must have city"
        errorsObj.errors = true
    }
    if(company.city.length > 100){
        errorsObj.city = "Company city must be shorter than 100 characters"
        errorsObj.errors = true
    }
    if(!company.state.length){
        errorsObj.state = "Company must have state"
        errorsObj.errors = true
    }
    if(company.state.length > 100){
        errorsObj.state = "Company state must be shorter than 100 characters"
        errorsObj.errors = true
    }
    if(!company.logoUrl.length){
        errorsObj.logoUrl = "Company must have logo url"
        errorsObj.errors = true
    }
    if(!validLogoUrl(company.logoUrl)){
        errorsObj.logoUrl = "company logo url must be jpg, jpeg, png or gif"
        errorsObj.errors = true
    }

    return errorsObj
}

export const companySingupValidations = (signupObj) => {
    let errorsObj = {
        errors: false
    }
    const {firstName, lastName, email, password, passwordConfirm, phone, name, businessPhone, address, city, state, logoUrl} = signupObj;

    if(!firstName.length){
        errorsObj.firstName = "First name is required"
        errorsObj.errors = true
    }
    if(firstName.length > 100){
        errorsObj.firstName = "First name must be under 100 characters"
        errorsObj.errors = true
    }
    if(!lastName.length){
        errorsObj.lastName = "Last name is required"
        errorsObj.errors = true
    }
    if(lastName.length > 100){
        errorsObj.lastName = "Last name must be under 100 characters"
        errorsObj.errors = true
    }
    if(!email.length){
        errorsObj.email = "Email is required"
        errorsObj.errors = true
    }
    if(email.length > 255){
        errorsObj.email = "Email must be under 255 characters"
        errorsObj.errors = true
    }
    if(!isValidEmail(email)){
        errorsObj.email = "Invalid email address"
        errorsObj.errors = true
    }
    if(!password.length){
        errorsObj.password = "Password is required"
        errorsObj.errors = true
    }
    if(password.length < 6){
        errorsObj.password = "Password must be at least 6 characters long"
        errorsObj.errors = true
    }
    if(!passwordConfirm.length){
        errorsObj.passwordConfirm = "Password confirmation is required"
        errorsObj.errors = true
    }
    if(password !== passwordConfirm){
        errorsObj.passwordConfirm = "Passwords must match"
        errorsObj.errors = true
    }
    if(!phone.length){
        errorsObj.phone = "Phone number is required"
        errorsObj.errors = true
    }
    if(phone.length < 6 ||phone.length > 12 ){
        errorsObj.phone = "Phone number must be between 6-12 digits"
        errorsObj.errors = true
    }
    if(!validPhone(phone)){
        errorsObj.phone = "Invalid phone number - please enter digits only"
        errorsObj.errors = true
    }
    if(!name.length){
        errorsObj.name = "Company name is required"
        errorsObj.errors = true
    }
    if(name.length > 255){
        errorsObj.name = "Company name must be under 255 characters"
        errorsObj.errors = true
    }
    if(!businessPhone.length){
        errorsObj.businessPhone = "Business phone number is required"
        errorsObj.errors = true
    }
    if(businessPhone.length < 6 ||businessPhone.length > 12 ){
        errorsObj.businessPhone = "Business phone number must be between 6-12 digits"
        errorsObj.errors = true
    }
    if(!validPhone(businessPhone)){
        errorsObj.businessPhone = "Invalid business phone number - please enter digits only"
        errorsObj.errors = true
    }
    if(!address.length){
        errorsObj.address = "Company address is required"
        errorsObj.errors = true
    }
    if(address.length > 250){
        errorsObj.address = "Company address must be shorter than 250 characters"
        errorsObj.errors = true
    }
    if(!city.length){
        errorsObj.city = "Company city is required"
        errorsObj.errors = true
    }
    if(city.length > 100){
        errorsObj.city = "Company city must be shorter than 100 characters"
        errorsObj.errors = true
    }
    if(!state.length){
        errorsObj.state = "Company state is required"
        errorsObj.errors = true
    }
    if(state.length > 100){
        errorsObj.state = "Company state must be shorter than 100 characters"
        errorsObj.errors = true
    }
    if(!logoUrl.length){
        errorsObj.logoUrl = "Company must have logo url"
        errorsObj.errors = true
    }
    if(!validLogoUrl(logoUrl)){
        errorsObj.logoUrl = "company logo url must be jpg, jpeg, png or gif"
        errorsObj.errors = true
    }

    return errorsObj
}
