import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth, ...rest}) => (
    <Route
    {...rest}
    render = {props => 
    auth.isAuthenticated === true ? (
        <Component { ...props} />
    ):(<Redirect to ='/login' />) }
    />
)

PrivateRoute.PropTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
