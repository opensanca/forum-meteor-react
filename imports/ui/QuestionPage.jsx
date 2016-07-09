import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';

import { Questions, QuestionComments } from '../api/questions.js';

// App component - represents the whole app
class QuestionPage extends Component {

  handleSubmit(event) {
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Meteor.call("questions.comment", this.props.question._id, text);
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderComments() {
    return this.props.comments.map((comment) => (
      <p key={comment._id}>{comment.text}</p>
    ))
  }

  render() {
    if (this.props.loading) {
      return (<div>Carregando...</div>);
    }
    return (
      <div>
        <div className="container">
          <h4>{this.props.question.text}</h4>
          <p>{moment(this.props.question.createdAt).fromNow()}</p>
          <h3>Comentários:</h3>
          <div className="form-group">
            {this.renderComments()}
            <form className="new-comment" onSubmit={this.handleSubmit.bind(this)} >
              <input
                className="form-control"
                type="text"
                ref="textInput"
                placeholder="Adicione um comentário"
              />
              <button className="btn btn-default" type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(
  ( { params, location } ) => {
    const questionsSubscription = Meteor.subscribe("question", params.questionId)
    return {
      loading: !questionsSubscription.ready(),
      question: Questions.findOne({_id: params.questionId}),
      comments: QuestionComments.find({questionId: params.questionId}, {sort: {createdAt: 1}}).fetch()
    };
  },
  QuestionPage);
