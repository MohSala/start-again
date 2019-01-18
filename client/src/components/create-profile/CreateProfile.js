import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import InputGroup from '../common/InputGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import {createProfile} from '../../actions/profileActions'


class CreateProfile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubUsername: '',
            bio: '',
            twitter: '',
            facebook: '',
            instagram: '',
            youtube: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e) {
        e.preventDefault()
        
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubUsername: this.state.githubUsername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }
        this.props.createProfile(profileData, this.props.history)
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

  render() {
      const {errors, displaySocialInputs} = this.state

      let socialInputs

      if(displaySocialInputs) {
          socialInputs = (
              <div>
                  <InputGroup
                  name= 'twitter'
                  icon = 'fab fa-twitter'
                  value = {this.state.twitter}
                  onchange = {this.onChange}
                  error = {errors.twitter}
                  />

                  <InputGroup
                  name= 'facebook'
                  icon = 'fab fa-facebook'
                  value = {this.state.facebook}
                  onchange = {this.onChange}
                  error = {errors.facebook}
                  />

                  <InputGroup
                  name= 'youtube'
                  icon = 'fab fa-youtube'
                  value = {this.state.youtube}
                  onchange = {this.onChange}
                  error = {errors.youtube}
                  />

                  <InputGroup
                  name= 'instagram'
                  icon = 'fab fa-instagram'
                  value = {this.state.instagram}
                  onchange = {this.onChange}
                  error = {errors.instagram}
                  />
              </div>
          )
      }
      
    //   select options for status
      const options = [
          {label: '* Select Professional status', value: 0},
          {label: 'Developer', value: 'Developer'},
          {label: 'Senior Man', value: 'Senior Man'},
          {label: 'Manager', value: 'Manager'},
          {label: 'Intern', value: 'Intern'},
          {label: 'Cleaner', value: 'Cleaner'},
      ]
    return (
      <div className="create-profile">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className=" display-4 text-center">Create Your Profile </h1>
                    <p className="lead text-center">Make your profile Unique. Fill!</p>
                <small className=" d-block pb-3"> * = required fields</small>
                <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                placeholder = "* profile handle"
                name = "handle"
                value = {this.state.handle}
                onChange = {this.onChange}
                error = {errors.handle}
                info = "A unique handle for your profile URL. e.g Badoosha"
                />

                <SelectListGroup
                placeholder = "Status"
                name = "status"
                value = {this.state.status}
                onChange = {this.onChange}
                error = {errors.status}
                options = {options}
                info = "Whats your job desc. guy"
                />

                <TextFieldGroup
                placeholder = "Company"
                name = "company"
                value = {this.state.company}
                onChange = {this.onChange}
                error = {errors.company}
                info = "Where you dey work guy"
                />

                <TextFieldGroup
                placeholder = "Website"
                name = "website"
                value = {this.state.website}
                onChange = {this.onChange}
                error = {errors.website}
                info = "Whats your website guy"
                />

                <TextFieldGroup
                placeholder = "Location"
                name = "location"
                value = {this.state.location}
                onChange = {this.onChange}
                error = {errors.location}
                info = "Alaye Bolowa"
                />

                <TextFieldGroup
                placeholder = "skills"
                name = "skills"
                value = {this.state.skills}
                onChange = {this.onChange}
                error = {errors.skills}
                info = "List skills you have and separate with commas abeg"
                />

                <TextFieldGroup
                placeholder = "githubUsername"
                name = "githubUsername"
                value = {this.state.githubUsername}
                onChange = {this.onChange}
                error = {errors.githubUsername}
                info = "Your githubUsername"
                />

                <TextAreaFieldGroup
                placeholder = "A short bio about yourself"
                name = "bio"
                value = {this.state.bio}
                onChange = {this.onChange}
                error = {errors.bio}
                info = "Who you be"
                />
                <div className = "mb-3">
                <button 
                type="button"
                onClick = {() => {
                    this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                    }))
                } } className = "btn btn-light ">Add Social Network Links
                <span className="text-muted">(Optional)</span>
                </button>
                </div>
                {socialInputs}
                <input type= 'submit' value= 'Submit' className='btn btn-info btn-block mt-4' />
                </form>
            </div>
        </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile))
