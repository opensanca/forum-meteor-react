import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

class AppHeader extends Component {

  handleLogout(event) {
    event.preventDefault();
    Accounts.logout();
  }

  renderLogout() {
    if (this.props.user) {
      return (
        <a href="#" onClick={this.handleLogout.bind(this)}>Logout</a>
      );
    }
    return (
      <Link to="/login">Login</Link>
    )
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Fórum Open Sanca</a>
            <ul className="pull-right">
              <li>
                {this.renderLogout()}
              </li>
            </ul>
        </div>
      </nav>
    );
  }
}

export default createContainer(
  ( { params, location } ) => {
    return {
      user: Meteor.user(),
    };
  },
  AppHeader);
