const Validator = require('validator')
const isEmpty =  require ('./is-empty')

module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
   
    if(!Validator.isLength(data.name, {min: 2, max: 30})) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name is required in field'
    }
    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invaild'
    }
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required in field'
    }
    if(Validator.isEmpty(data.password)) {
        errors.password = 'password is required'
    }
    if(!Validator.isLength(data.password, {min:6 ,max:30})) {
        errors.password = 'password must be at least 6 characters'
    }
    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password field is required'
    }
    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'passwords must match'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}