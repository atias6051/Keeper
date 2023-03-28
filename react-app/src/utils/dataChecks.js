export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validPhone(phone) {
    const isAllDigits = /^\d+$/.test(phone);
    return isAllDigits
}

export function validLogoUrl(url){
    const allowedFormats = ['jpg','jpeg','png','gif']
    const format = url.split('.').pop()
    return allowedFormats.includes(format)
}
