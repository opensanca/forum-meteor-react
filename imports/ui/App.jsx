import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';

import { Questions } from '../api/questions.js';

import Question from './Question.jsx';

// App component - represents the whole app
class App extends Component {

  handleSubmit(event) {
    event.preventDefault();
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Questions.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderQuestions() {
    return this.props.questions.map((question) => (
      <Question key={question._id} question={question} />
    ));
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Fórum Open Sanca</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            </div>
          </div>
        </nav>
        <div className="container">
          <div className="well">
            <div className="form-group">
              <form className="new-question" onSubmit={this.handleSubmit.bind(this)} >
                <input
                  className="form-control"
                  type="text"
                  ref="textInput"
                  placeholder="Adicione uma pergunta"
                />
              </form>
            </div>
          </div>
        </div>
        <ul>
          {this.renderQuestions()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    questions: Questions.find({}).fetch(),
  };
}, App);
