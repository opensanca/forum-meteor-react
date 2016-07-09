import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

export default class SignUp extends Component {

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
    const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.passwordInput).value.trim();

    const profile = {
      name
    };

    Accounts.createUser({
      email,
      password,
      profile
    }, function(err) {
      console.log("Registrei");
    })

  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="well">
            <div className="form-group">
              <h2>Registrar-se</h2>
              <form className="login" onSubmit={this.handleSubmit.bind(this)} >
                <input
                  className="form-control"
                  type="text"
                  ref="emailInput"
                  placeholder="a@b.co"
                />
                <input
                  className="form-control"
                  type="text"
                  ref="nameInput"
                  placeholder="seu nome"
                />
                <input
                  className="form-control"
                  type="password"
                  ref="passwordInput"
                  placeholder="****"
                />
                <button type="submit" className="btn btn-default">Registrar-se</button>
              </form>
              <Link to="/login">Já tem conta?</Link>
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
  SignUp);
