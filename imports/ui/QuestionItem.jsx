import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// Task component - represents a single todo item
export default class QuestionItem extends Component {

  handleLike(event) {
    event.preventDefault();
    this.props.handleLike(this.props.question._id);
  }

  handleSolve(event) {
    event.preventDefault();
    this.props.handleSolve(this.props.question._id);
  }

  renderSolveButton() {
    if (this.props.question.solvedAt != null) {
      return (
        <span>resolvido</span>
      )
    }
    return (
      <a href="#" className="btn btn-default" onClick={this.handleSolve.bind(this)}>
        resolver
      </a>
    );
  }

  render() {
    return (
      <li className="list-group-item">
        <Link to={"/" + this.props.question._id}>
          {this.props.question.text}
        </Link>
        <p>
          {this.props.user.profile.name}
        </p>
        <div className="actions">
          {this.props.question.commentsCount || 0} Comentários -
          {this.props.question.likes || 0}
          <a href="#" className="btn btn-link" onClick={this.handleLike.bind(this)}>
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
          </a>
          <div className="pull-right">
            {this.renderSolveButton()}
          </div>
        </div>
      </li>
    );
  }
}

QuestionItem.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  question: PropTypes.object.isRequired,
};
