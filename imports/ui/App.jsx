import React, { Component } from 'react';

import Question from './Question.jsx';

// App component - represents the whole app
export default class App extends Component {
  getQuestions() {
    return [
      { _id: 1, text: 'This is task 1' },
      { _id: 2, text: 'This is task 2' },
      { _id: 3, text: 'This is task 3' },
    ];
  }

  renderQuestions() {
    return this.getQuestions().map((question) => (
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
        <ul>
          {this.renderQuestions()}
        </ul>
      </div>
    );
  }
}
