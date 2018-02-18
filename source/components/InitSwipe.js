import React, { Component } from "react";
import { AsyncStorage } from 'react-native';
import { Container, Content, Text, View, Button  } from "native-base";
export default class Messages extends Component {
    constructor(props){
        super(props);
        this.state = {
              city:'',
              gender:''
          }
          this.check=this.check.bind(this);
      
        }

    check = (city) => {
        this.setState({
            ...this.state,
            city: city
        })
  }
    
  render() {
    AsyncStorage.getItem('city').then((value)=>{
        this.check(value)
      });
    return (
      <Container>
        <Content>
          <View style={{backgroundColor:'#1DA1F2'}}>
            <Text style={{textAlign:'center',justifyContent:'center', flex:10, color:'white', fontSize:25, padding:35}}>
              {this.state.city}
            </Text>
            <Button rounded style={{alignSelf:'center',backgroundColor:'white',marginBottom:35}}>
              <Text style={{color:'#1da1f2'}}>Find friends</Text>
            </Button>
          </View>
      </Content>
    </Container>
    );
  }
}