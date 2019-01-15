const Validator = require('validator')
const isEmpty =  require ('./is-empty')

module.exports = function validateEducationInput(data) {
    let errors = {}

    
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    
    if(Validator.isEmpty(data.school)) {
        errors.school = 'School is required in field'
    }
    if(Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is invaild'
    }
    if(Validator.isEmpty(data.fieldOfStudy)) {
        errors.fieldOfStudy = 'Field Of Study field is invaild'
    }
    if(Validator.isEmpty(data.from)) {
        errors.from = 'From Date field is required'
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}