const Validator = require('validator')
const isEmpty =  require ('./is-empty')

module.exports = function validateLoginInput(data) {
    let errors = {}
    
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required in field'
    }
    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invaild'
    }
    if(Validator.isEmpty(data.password)) {
        errors.password = 'password is required'
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}