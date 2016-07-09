import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

class LoginPage extends Component {

  componentDidUpdate() {
    if (this.props.user) {
      browserHistory.push("/");
    }
  }
  componentDidMount() {
    if (this.props.user) {
      browserHistory.push("/");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.passwordInput).value.trim();

    Meteor.loginWithPassword(email, password, function(err) {
      if (err) {
        alert("Não foi possível logar");
      }
    })
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="well">
            <h2>Login</h2>
            <div className="form-group">
              <form className="login" onSubmit={this.handleSubmit.bind(this)} >
                <input
                  className="form-control"
                  type="text"
                  ref="emailInput"
                  placeholder="a@b.co"
                />
                <input
                  className="form-control"
                  type="password"
                  ref="passwordInput"
                  placeholder="****"
                />
                <button type="submit" className="btn btn-default">Login</button>
              </form>
              <Link to="/signup">Ainda não tem conta?</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(
  ( { params, location } ) => {
    return {
      user: Meteor.user(),
    };
  },
  LoginPage);
