import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class Question extends Component {
  render() {
    return (
      <li>{this.props.question.text}</li>
    );
  }
}

Question.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  question: PropTypes.object.isRequired,
};
