/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LoginPage from "./source/LoginPage";

export default class App extends Component {
  render() {
    return (
      <Container>
        <LoginPage />
        </Container>
    );
  }
}