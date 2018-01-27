import React, { Component } from "react";
import { Container, Content, Card, CardItem, Text, Body,Right, Left, Header, Title, Button, Icon, Form, Item, Label, Input,  } from "native-base";
import Animated, { TextInput } from "react-native";
import Tabs from "./Tabs";
import { View, Alert } from 'react-native';
import { trySignup, tryLogin } from './../hasuraApi';


export default class LoginPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
              isLoggedIn : false,
              usernameTextBox : '',
              passwordTextBox : '',
              usedId : '',
          }
      }

      handleLoginPressed = async () => {
        let resp = await tryLogin(this.state.usernameTextBox, this.state.passwordTextBox);
        if(resp.status !== 200){
          if (resp.status === 504) {
            Alert.alert("Network Error", "Check your internet connection" )
          } else {
            Alert.alert("Error", "Unauthorized, Invalid username or password")      
          }
        } else {
          var respBody= await resp.json();
          this.setState({isLoggedIn:true, userId: respBody.hasura_id })  
        }
      }

      handleSignupPressed = async () => {
        let resp = await trySignup(this.state.usernameTextBox, this.state.passwordTextBox);
        if(resp.status !== 200){
          if (resp.status === 504) {
            Alert.alert("Network Error", "Check your internet connection" )
          } else {
            Alert.alert("Error", "Password too short / User already exists")      
          }
        } else {
          var respBody= await resp.json();
          this.setState({isLoggedIn:true, userId :respBody.hasura_id})  
        }
      }
    
      handleUsernameChange = usernameTextBox => {
          this.setState({
              ...this.state,
              usernameTextBox: usernameTextBox
          })
      }
    
      handlePasswordChange = passwordTextBox => {
          this.setState({
              ...this.state,
              passwordTextBox: passwordTextBox
          })
      }

      render(){
        if(this.state.isLoggedIn === true){
            return (
               <Container>
                 <Text>{this.props.userId}</Text>
                 </Container>
            );
          }
          return(

      <Container style={{backgroundColor:'white', padding:30}}>
        <View style={{}}>
        <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input value={this.state.usernameTextBox} onChangeText={this.handleUsernameChange}/>
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input value={this.state.passwordTextbox} onChangeText={this.handlePasswordChange} secureTextEntry/>
              </Item>
            </Form>
            <View style = {{height:10}} />
            <Button block onPress={this.handleSignupPressed} >
              <Text> Sign up </Text>
            </Button>
            <View style = {{height:10}} />
            <Button block title="Log in" onPress={this.handleLoginPressed} >
              <Text> Log in </Text>
            </Button>
        </View>
      </Container>
          );
      }
}

    
