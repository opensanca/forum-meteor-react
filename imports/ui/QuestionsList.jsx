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

QuestionsList.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    questions: Questions.find({}).fetch(),
  };
}, QuestionsList);
