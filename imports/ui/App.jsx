import React, { Component } from 'react';

import { createContainer } from 'meteor/react-meteor-data';

import AppHeader from './AppHeader.jsx';

// App component - represents the whole app
export default class App extends Component {

  render() {
    return (
      <div>
        <AppHeader />
        {this.props.children}
      </div>
    );
  }
}
