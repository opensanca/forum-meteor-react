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


  renderLoading() {
    return (
      <div>Carregando</div>
    )
  }

  renderList() {
    if (this.props.loading) {
      return this.renderLoading();
    }
    return (
      <ul className="list-group">
        {this.renderQuestions()}
      </ul>
    );
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

        {this.renderList()}
      </div>
    );
  }
}

QuestionsList.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default createContainer(() => {
  const questionsSubscription = Meteor.subscribe("questions");
  return {
    questions: Questions.find({}, {sort: {likes: -1}}).fetch(),
    loading: !questionsSubscription.ready()
  };
}, QuestionsList);
