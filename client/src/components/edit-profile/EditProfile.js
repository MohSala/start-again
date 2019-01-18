import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import InputGroup from '../common/InputGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import {createProfile, getCurrentProfile} from '../../actions/profileActions'
import isEmpty from '../../validations/is-empty'


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
        if(nextProps.profile.profile){
            const profile = nextProps.profile.profile
            // bring skills array to csv
            const skillsCSV = profile.skills.join(',')

            //if profile field doesn't exist, add or make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.githubUsername = !isEmpty(profile.githubUsername) ? profile.githubUsername : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {}
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ''
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : ''
        //set comp fields state
        this.setState({
            handle: profile.handle,
            company: profile.company,
            website: profile.website,
            location: profile.location,
            status: profile.status,
            skills: skillsCSV,
            githubUsername: profile.githubUsername,
            bio: profile.bio,
            twitter: profile.twitter,
            facebook: profile.facebook,
            instagram: profile.instagram,
            youtube: profile.youtube
        })
        }

    }

    componentDidMount() {
        this.props.getCurrentProfile()
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
                    <h1 className=" display-4 text-center">Edit Profile </h1>
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
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(CreateProfile))
