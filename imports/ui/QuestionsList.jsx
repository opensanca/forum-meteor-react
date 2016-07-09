import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';

import { Questions } from '../api/questions.js';

import Question from './Question.jsx';

// App component - represents the whole app
class QuestionsList extends Component {

  handleSubmit(event) {
    event.preventDefault();
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call("questions.create", text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  handleLike(questionId) {
    Meteor.call("questions.like", questionId);
  };

  renderQuestions() {
    return this.props.questions.map((question) => (
      <Question key={question._id} question={question} handleLike={this.handleLike} />
    ));
  }

  render() {
    return (
      <div>
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
        <ul className="list-group">
          {this.renderQuestions()}
        </ul>
      </div>
    );
  }
}

QuestionsList.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    questions: Questions.find({}).fetch(),
  };
}, QuestionsList);
