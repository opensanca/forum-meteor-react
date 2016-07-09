import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';

import { Questions } from '../api/questions.js';

import QuestionItem from './QuestionItem.jsx';

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

  handleSolve(questionId) {
    Meteor.call("questions.solve", questionId);
  }

  renderQuestions() {
    return this.props.openQuestions.map((question) => (
      <QuestionItem key={question._id} question={question} handleLike={this.handleLike} handleSolve={this.handleSolve} />
    ));
  }

  renderSolvedQuestions() {
    return this.props.solvedQuestions.map((question) => (
      <QuestionItem key={question._id} question={question} handleLike={this.handleLike} handleSolve={this.handleSolve} />
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
      <div>
        <h3>Perguntas abertas</h3>
        <ul className="list-group">
          {this.renderQuestions()}
        </ul>
        <h3>Perguntas respondidas</h3>
        <ul className="list-group">
          {this.renderSolvedQuestions()}
        </ul>
      </div>
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
          {this.renderList()}
        </div>
      </div>
    );
  }
}

export default createContainer(
  () => {
    const questionsSubscription = Meteor.subscribe("questions");
    return {
      openQuestions: Questions.find({solvedAt: null}, {sort: {likes: -1}}).fetch(),
      solvedQuestions: Questions.find({solvedAt: {$ne: null}}, {sort: {likes: -1}}).fetch(),
      loading: !questionsSubscription.ready()
    };
  },
  QuestionsList);


// export default class Container extends Component {
//
//   render() {
//     const questionsSubscription = Meteor.subscribe("questions");
//     data = {
//       questions: Questions.find({}, {sort: {likes: -1}}).fetch(),
//       loading: !questionsSubscription.ready()
//     }
//     return (
//       <QuestionsList questions={data.questions} loading={data.loading} />
//     );
//   }
// }
