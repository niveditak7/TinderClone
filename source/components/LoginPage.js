import React, { Component } from "react";
import { Container, Content, Card, CardItem, Text, Body,Right, Left, Header, Title, Button, Icon, Form, Item, Label, Input,  } from "native-base";
import Animated, { TextInput } from "react-native";
import Tabs from "./Tabs";
import { View, Alert } from 'react-native';
import { trySignup, tryLogin } from './../hasuraApi';

const url = "https://auth.bleed71.hasura-app.io/v1/signup";
export default class LoginPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
              isLoggedIn : false,
              usernameTextBox : '',
              passwordTextBox : '',
              usedId : '',
          }
          this.handleSignupPressed=this.handleSignupPressed.bind(this);
      
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
          this.setState({isLoggedIn:true })  
        }
      }

    handleSignupPressed =()=>{
        

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

var body = {
    "provider": "username",
    "data": {
        "username": this.state.usernameTextBox,
        "password": this.state.passwordTextBox
    }
};

requestOptions.body = JSON.stringify(body);
console.log("Auth Response ---------------------");

fetch(url, requestOptions)
.then((response)=> {
  const auth_token= response.auth_token;
  if(response.status===200){
    
    this.setState({isLoggedIn: true});
    console.log("Auth");
  }
  else{
    Alert.alert("Error", "Password too short / User already exists")
  }
  return response.json();
  
})
.then((result)=> {
  	// To save the auth token received to offline storage
	// var authToken = result.auth_token
	// AsyncStorage.setItem('HASURA_AUTH_TOKEN', authToken);
  console.log("result:"+result.username);
  console.log(JSON.stringify(result.hasura_id));
      
      res_username= JSON.stringify(result.username);
      res_username1= res_username.substring(1,res_username.length-1);
      res_password1= JSON.stringify(body.data.password);
      res_password= res_password1.substring(1,res_password1.length-1);
    
      res_id= JSON.stringify(result.hasura_id);
  })
  .then(function(result)
  {
      
      var url = "https://data.bleed71.hasura-app.io/v1/query";
      
      var requestOptions = {
          "method": "POST",
          "headers": {
              "Content-Type": "application/json"
          }
      };
      //console.log("role= "+ res_role);
      var body = {
          "type": "insert",
          "args": {
              "table": "User",
              "objects": [
                  {
                      "User_id": res_id,//here email needs to be passed after retrieving from the frontend...this is a dummy email...you need to put here the email that the user will enter
                      "Password": res_password,
                      "User_name": res_username1,
                      
                  }
              ]
          }
      };
      
      requestOptions.body = JSON.stringify(body);
      
      fetch(url, requestOptions)
      .then(function(response) {
        return response.json();
    })
    .then((result) =>{
      
        console.log(result);
    })
      
      .catch(function(error) {
          console.log('Request Failed:' + error);
      });
  }
  )
.catch(function(error) {
	console.log('Request Failed:' + error);
});
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
                 <Tabs />
                 </Container>
            );
          }
          return(

      <Container style={{backgroundColor:'white', padding:30}}>
      
        <View>
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

    
