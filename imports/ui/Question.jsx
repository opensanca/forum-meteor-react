import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class Question extends Component {

  handleLike(event) {
    event.preventDefault();
    this.props.handleLike(this.props.question._id);
  }

  render() {
    return (
      <li className="list-group-item">
        {this.props.question.text}
        <div className="actions">
          {this.props.question.likes || 0}
          <a href="#" className="btn btn-link" onClick={this.handleLike.bind(this)}>
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
          </a>
        </div>
      </li>
    );
  }
}

Question.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  question: PropTypes.object.isRequired,
};
