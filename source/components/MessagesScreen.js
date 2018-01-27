import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Body, Left, Right, Thumbnail, View } from 'native-base';
const cardOne = require("./swiper-1.png");
export default class DynamicListExample extends Component {
  render() {
    var items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can'];
      return (
        <Container style={{backgroundColor:'white', paddingTop:10}}>
          <Content>
            <View style={{padding:10}}>
              <Text style={{color:'#ff5f64'}}>MATCHES</Text>
              </View>
            <List dataArray={items}
             renderRow={(item) =>
              <ListItem avatar >
                <Left>
                  <Thumbnail small source={cardOne} style={{}} />
                </Left>
                <Body>
                  <Text>{item}</Text>
                  <Text note>Doing what you like will always keep you happy . .</Text>
                  </Body>
                  <Right>
                <Text note>3:43 pm</Text>
              </Right>
                </ListItem>
              }>
            </List>
          </Content>
      </Container>
    );
  }
}