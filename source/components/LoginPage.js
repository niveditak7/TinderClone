import React, { Component } from "react";
import { Container, Content, Card, CardItem, Text, Body,Right, Left, Header, Title, Button, Icon, Form, Item, Label, Input,  } from "native-base";
import Animated, { TextInput } from "react-native";
import Tabs from "./Tabs";
import { View, Alert } from 'react-native';
import {AsyncStorage }from 'react-native';

//const url = "https://auth.bleed71.hasura-app.io/v1/signup";
export default class LoginPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
              isLoggedIn : false,
              usernameTextBox : '',
              passwordTextBox : '',
              used_id : '',
              city:'',
              gender:'',
              HASURA_AUTH_TOKEN:'',
          }
          this.handleSignupPressed=this.handleSignupPressed.bind(this);
      
        }


    handleLoginPressed = async () => {
        var url = "https://app.bleed71.hasura-app.io/APIEP_Login_Username";

        var requestOptions = {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            }
        };
        
        var body = {
            "provider": "username",
            "data": {
                "username":this.state.usernameTextBox,
                "password": this.state.passwordTextBox
            }
        };
        
        requestOptions.body = JSON.stringify(body);
        console.log("Login response---------");
        fetch(url,requestOptions)
        .then(async(response)=> {
            if(response.status===200){
                this.setState({isLoggedIn: true});
                console.log("Login Response");
                console.log(response)
            }
        else{
            Alert.alert("Error", "Password too short / User already exists")
            }
            return response.json();
        })
        .then(async(result)=> {
            console.log("Result:"+result);
            // To save the auth token received to offline storage
            // var authToken = result.auth_token
            // AsyncStorage.setItem('HASURA_AUTH_TOKEN', authToken);
            
            console.log("Auth token:"+result[0].auth_token);
            await AsyncStorage.setItem('HASURA_AUTH_TOKEN', result[0].auth_token);
            this.setState({HASURA_AUTH_TOKEN: result[0].auth_token});

            console.log("Userid:"+result[0].hasura_id);
            await AsyncStorage.setItem('user_id',JSON.stringify(result[0].hasura_id));
            this.setState({'user_id': JSON.stringify(result.hasura_id)})
            
            console.log("Username:"+result[0].username);
            await AsyncStorage.setItem('username',JSON.stringify(result[0].username));

            console.log("Gender:"+(result[1].Gender))
            await AsyncStorage.setItem('gender',(result[1].Gender));

            
            console.log("City:"+(result[1].City))
            await AsyncStorage.setItem('city',(result[1].City));

            this.props.navigation.navigate("Tabs");
        })
        .catch(function(error) {
            console.log('Request Failed:' + error);
        });
      }

    handleSignupPressed =async()=>{
        url = "https://app.bleed71.hasura-app.io/APIEP_Signup_Username";
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
        .then(async(response)=> {
             if(response.status===200){
                  this.setState({isLoggedIn: true});
                  console.log(response);
                   this.props.navigation.navigate("Tabs");
                    
                }
            else{
                Alert.alert("Error", "Password too short / User already exists")
                }
            return response.json();
        })
        .then(async(result)=> {
  	// To save the auth token received to offline storage
    //var authToken = result.auth_token
            console.log("Before auth token");
            console.log(result.auth_token);
            console.log(JSON.stringify(result.auth_token));
            await AsyncStorage.setItem('HASURA_AUTH_TOKEN', result.auth_token);
            this.setState({HASURA_AUTH_TOKEN: result.auth_token})
            console.log(this.state.user_id);
            console.log("result:"+result.username);
            console.log(JSON.stringify(result.hasura_id));
            await AsyncStorage.setItem('user_id', JSON.stringify(result.hasura_id));
            this.setState({'user_id': result.hasura_id})
      
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
            .then(async(result) =>{
                console.log(result);
                
            })
      
            .catch(function(error) {
            console.log('Request Failed:' + error);
            });
        })
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
     /*   if(this.state.isLoggedIn === true){
            return (
               <Container>
                 <Tabs />
                 </Container>
            );
          }
          */
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
                <Button block rounded onPress={this.handleSignupPressed} >
                <Text> Sign up </Text>
            </Button>
            <View style = {{height:10}} />
            <Button block rounded title="Log in" onPress={this.handleLoginPressed} >
              <Text> Log in </Text>
            </Button>
        </View>
      </Container>
          );
      }
}


    
