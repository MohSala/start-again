import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser} from './actions/authActions'
// import {clearCurrentProfile} from './actions/profileActions'
// import {logoutUser} from './actions/authActions'
import { Provider } from 'react-redux'
import PrivateRoute from './components/common/PrivateRoute'
import store from './store'
import {clearCurrentProfile} from './actions/profileActions' 
import {logoutUser} from './actions/authActions' 
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/create-profile/CreateProfile'
import './App.css';
import EditProfile from './components/edit-profile/EditProfile';




if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.Now  /1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentProfile())
    //Clear current profile
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
      <Router>
      <div className="App">
        <Navbar />
        <Route exact path='/' component= {Landing} />
        <div className='container'>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Switch>
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
        <Switch>
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        </Switch>
        <Switch>
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        </Switch>
          
        </div>
        <Footer />
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
