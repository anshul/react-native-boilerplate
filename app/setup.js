// @flow
/* global __DEV__ */
import React, { Component } from 'React';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers';
import devTools from 'remote-redux-devtools';
import Main from './main';
import info from './reducers/info';


function configureStore() {
  let {name, os, osVersion} = info(undefined, {type: 'SETUP'});

  let enhancer = compose(
    applyMiddleware(thunk),
    devTools({
      name: `${name} ${os}-${osVersion}`, realtime: true
    }),
  );
  return createStore(reducer, enhancer);
}

function setup():any {

  class Root extends Component {
    store: any;

    constructor(props: any) {
      super(props);
      this.store = configureStore();
      if (__DEV__) {
        console.log('Development detected. Root component constructed at ' + (new Date()).toString());
      }
    }

    render() {
      return (
        <Provider store={this.store}>
          <Main />
        </Provider>
      );
    }
  }
  return Root;
}

export default setup;

