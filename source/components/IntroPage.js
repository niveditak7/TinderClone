import React, { Component } from "react";
import Carousel from './Carousel';
import { Container, Content, Text, View, Button  } from "native-base";
import Animated from "react-native";
import { Dimensions,AsyncStorage } from 'react-native';

const deviceWidth = Dimensions.get("window").width;
export default class Messages extends Component {
    componentDidMount=async()=>{
        console.log("LoginScreen mounted");
       await AsyncStorage.getItem('HASURA_AUTH_TOKEN').then((value)=>{
            this.setState({'HASURA_AUTH_TOKEN':value})
            console.log(this.state.HASURA_AUTH_TOKEN);
          });
          if(this.state.HASURA_AUTH_TOKEN != null){
            this.props.navigation.navigate("Tabs");
          }
    }
  render() {
    return (
      <Container>
        <Content>
            <View style={{alignItems:'center', marginTop:30, padding:40}}>
          <Carousel/>
          </View>
          <View style={{alignItems:'center', marginLeft:deviceWidth/3}}>
          <Button style={{backgroundColor:'#ff5f64' , height:40}} onPress={()=>this.props.navigation.navigate("LoginPage")} >
                      <Text> Check it out! </Text>
                  </Button>
              </View>
      </Content>
    </Container>
    );
  }
}