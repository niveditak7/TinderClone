/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container} from 'native-base';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './source/reducer';
const store = createStore(reducer);
import LoginPage from "./source/components/LoginPage";
import StackNav from './source/components/StackNav';

export default class App extends Component {
  render() {
    return (
      <Container>
        <StackNav />
        </Container>
    );
  }
}