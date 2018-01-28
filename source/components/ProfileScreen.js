import React, { Component } from "react";
import { Container, Content, Card, CardItem, Text, Body, View, Right, Left, Header, Title, Button, Icon, Switch, Radio  } from "native-base";
import {Animated, StyleSheet, TextInput, TouchableOpacity, Linking } from "react-native";
import EIcon from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-picker';
export default class ProfileScreen extends Component {
  constructor(props){
    super(props);
     this.state ={
      ImageSource: null,
      city:'',
      gender:'',
    }
  }

  addUserData=()=>{

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

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({

          ImageSource: source

        });
      }
    });
  }
render() {
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
          <View style={{justifyContent:'center',alignItems:'center',padding: 5}}>
          <Text style={{fontWeight:'bold', fontSize: 25}}>Chelsea</Text></View>
        
      <View style={{marginBottom:15,backgroundColor:'white',padding:15}}>
      
        <Text style={[styles.heading,{color:'#ff5f64'}]}>Discovery Settings</Text>
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
        /><View style={{alignItems:'center', justifyContent:'center'}}>
         <Button style={{backgroundColor:'#ff5f64' }} onPress={this.addUserData} >
              <Text> Sign up </Text>
            </Button>
            </View>
        
      </View>
     
      <View style={{marginBottom:15}}>
          <Text style={styles.heading}> Contact Us</Text>
          <Button  block style={styles.button} onPress={()=>Linking.openURL("https://www.help.tinder.com/hc/en-us")}>
            <Text style={styles.buttonText} uppercase={false}>Help & Support </Text>
          </Button><Text /><Text /><Text />
        <Button block style={styles.button} >
          <Text style={styles.buttonText}>Logout</Text>
        </Button>
        </View></View></Content>
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
    marginBottom:5,
    fontSize:18, 
    fontWeight:'bold',
    paddingBottom:10,
    marginLeft:5
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