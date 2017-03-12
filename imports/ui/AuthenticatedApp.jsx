import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ThingsList from './pages/ThingsList.jsx';

class AuthenticatedApp extends Component {

  signOut(e) {
    e.preventDefault();
    // Log out the user and navigate back to the home page on success
    Meteor.logout(this.signOutCallback);
  }
  signOutCallback(error) {
    if (error === undefined) {
      browserHistory.push('/');
    }
  }

  componentWillMount() {
    // Check that the user is logged in before the component mounts
    if (!this.props.user && !Meteor.loggingIn()) {
      browserHistory.push('/account');
    }
  }
  // When the data changes, this method is called
  componentDidUpdate(prevProps, prevState) {
    // Now check that they are still logged in. Redirect to sign in page if they aren't.
    if (!this.props.user) {
      browserHistory.push('/account');
    }
  }
  render() {
    const LogOut = <RaisedButton label="Sign Out" onClick={this.signOut} secondary={true}/>;
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Grow-IoT"
            iconElementRight={ LogOut }
          />
          <div className="layout vertical flex center center-justified">
            <h1>COMMON GARDEN</h1>
            <h2>Creating the Internet of Living Things</h2>
          </div>
          <ThingsList user={this.props.user}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

AuthenticatedApp.propTypes = {
  user: React.PropTypes.object,
}
export default AuthenticatedAppContainer= createContainer(() => {
  return {
    user: Meteor.user(),
  }
}, AuthenticatedApp);