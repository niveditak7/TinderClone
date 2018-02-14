import React, { Component } from "react";
import { Container, Content, Card, CardItem, Text, Body, View, Right, Left, Header, Title, Button, Icon, Switch, Radio  } from "native-base";
import {Animated, StyleSheet, TextInput, TouchableOpacity, Linking, AsyncStorage } from "react-native";
import EIcon from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-picker';
import LoginPage from './LoginPage';

export default class ProfileScreen extends Component {
  constructor(props){
    super(props);
     this.state ={
      ImageSource: null,
      city:'',
      gender:'',
      HASURA_AUTH_ID:'abc',
      user_id:'',
      username:'',
      isLoggedIn:true,
    }
    this.addUserData=this.addUserData.bind(this);
  }
  

  componentWillUpdate(){
    console.log("Update profile screen");
  }

  async componentWillMount(){
    console.log("ProfileScreen");
  }

  

  addUserData=async()=>{
    await AsyncStorage.getItem('HASURA_AUTH_TOKEN').then((value)=>{
      this.setState({'HASURA_AUTH_ID':value})
      console.log(this.state.HASURA_AUTH_ID);
    });
    await AsyncStorage.getItem('user_id').then((value)=>{
      this.setState({'user_id':value})
    });
    await AsyncStorage.setItem('city', this.state.city);
    console.log(this.state.city);
    await AsyncStorage.setItem('gender', this.state.gender);
    console.log(this.state.gender);
    
    console.log(this.state.user_id);
    console.log(this.state.username);

    var url = "https://data.bleed71.hasura-app.io/v1/query";

// If you have the auth token saved in offline storage, obtain it in async componentDidMount
// var authToken = await AsyncStorage.getItem('HASURA_AUTH_TOKEN');
// And use it in your headers
// headers = { "Authorization" : "Bearer " + authToken }
    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+this.state.HASURA_AUTH_ID
          }
    };
    console.log("after requestoptions");
    var body = {
        "type": "update",
        "args": {
          "table": "User",
          "where": {
            "User_id": {
                "$eq": this.state.user_id
            }
          },
        "$set": {
            "City": this.state.city,
            "Gender": this.state.gender
        }
      }
    };

    requestOptions.body = JSON.stringify(body);

    fetch(url, requestOptions)
    .then(async(response) =>{
        console.log("Got a response");
        console.log(response);
        return response.json();
    })
    .then(async(result)=> {
      console.log("Login Result");
	      console.log(result);
    })
    .catch(function(error) {
	      console.log('Request Failed:' + error);
    });
  }

   handleLogout=async()=>{
    console.log("in login");
    await AsyncStorage.getItem('HASURA_AUTH_TOKEN').then((value)=>{
      this.setState({'HASURA_AUTH_ID':value})
      console.log(this.state.HASURA_AUTH_ID);
    });
    
    var url = "https://app.bleed71.hasura-app.io/APIEP_Logout";
    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
      };
      var body = {
          "auth_key":this.state.HASURA_AUTH_ID
          
    };
    requestOptions.body = JSON.stringify(body);
  
    fetch(url,requestOptions)
  .then(function(response) {
      return response.json();
  })
  .then(function(result) {
      console.log(result);
      })
   .catch(function(error) {
      
              console.log('Request Failed locally  6' + error);
          });
      this.setState({isLoggedIn:false});
      

  }

  handleCityChange = city => {
    this.setState({
        ...this.state,
        city: city
    })
  }

  handleGenderChange = gender => {
    this.setState({
      ...this.state,
      gender: gender
    })
  }
  
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

  ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        var url = "https://api.boat40.hasura-app.io/APIEP_PP";

        const data = new FormData();
        data.append('user_auth_token', auth_token); // add auth token
        data.append('photo', {
          uri: source.uri,
          type: 'image/jpeg', // or photo.type
          name: 'testPhotoName'
        });
        fetch(url, {
          method: 'post',
          body: data
        }).then(res => {
          console.log(res)
        })
        .catch(function(error) {
          console.log('Request Failed :' + error);
          return error;
        });;

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({

          ImageSource: source

        });
      }
    });
  }
render() {
  console.log(this.props.navigation)
  return (
      <Container>
        <Content>
          <View style={{margin:20}}>
            <View style={{alignItems:'center', justifyContent:'center' }}>
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={styles.ImageContainer}>
                  { this.state.ImageSource === null ? <EIcon style={{fontSize:45, color:'white'}} name='user'/> :
                    <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                  }
                </View>
              </TouchableOpacity>
            </View>
            <View style={{justifyContent:'center',alignItems:'center',padding: 15}}>
              <Text style={{fontWeight:'bold', fontSize: 25}}>{this.state.username}</Text>
            </View>
        
            <View style={{marginBottom:15,backgroundColor:'white',padding:12}}>
              <Text style={[styles.heading,{color:'#ff5f64', marginBottom:10, paddingLeft:15}]}>Discovery Settings</Text>
              <TextInput underlineColorAndroid= 'transparent'
                  placeholder="Enter City"
                  placeholderTextColor="gray"
                  style={styles.textInput}
                  value={this.state.city} onChangeText={this.handleCityChange}
              />
              <TextInput underlineColorAndroid= 'transparent'
                  placeholder="Enter Gender"
                  placeholderTextColor="gray"
                  style={styles.textInput}
                  value={this.state.gender} onChangeText={this.handleGenderChange}
              />
              <View style={{alignItems:'center', justifyContent:'center', padding:15, position:"relative"}}>
                  <Button style={{backgroundColor:'#ff5f64' , height:40}} onPress={this.addUserData} >
                      <Text> Set Details </Text>
                  </Button>
              </View>
            </View>
            <View style={{marginBottom:15, backgroundColor:'white', padding:25}}>
              <Text style={[styles.heading,{paddingBottom:10, color:'#ff5f64'}]}> Contact Us</Text>
              <Button  block style={styles.button} onPress={()=>Linking.openURL("https://www.help.tinder.com/hc/en-us")}>
              <Text style={styles.buttonText} uppercase={false}>Help & Support </Text>
              </Button><Text /><Text /><Text />
              <Button block style={styles.button} onPress={()=>this.props.navigation.goBack(null)} >
                  <Text style={styles.buttonText}>Logout</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>

    );
  }
  
}


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
  },
  buttonText:{
    color:'black',
    textAlign:'center',
  },
  textInput:{
    height: 50, 
    borderColor: 'lightgray',
    backgroundColor:'white',
    paddingLeft:15,
  },
  heading:{
    fontSize:18, 
    fontWeight:'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E1'
  },

  ImageContainer: {
    borderRadius: 180,
    width: 75,
    height: 75,
    borderColor: 'gainsboro',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gainsboro',
    
  },
})