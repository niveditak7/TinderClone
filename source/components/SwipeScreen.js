import React, { Component } from "react";
import { Image, View, StyleSheet, Dimensions } from "react-native";
import {
  Container,
  Header,
  Title,
  Button,
  IconNB,
  DeckSwiper,
  Card,
  CardItem,
  Icon,
  Thumbnail,
  Text,
  Left,
  Right,
  Body
} from "native-base";
import EIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
const deviceHeight = Dimensions.get('window').height;

const cardOne = require("./swiper-1.png");
const cardTwo = require("./swiper-2.png");
const cardThree = require("./swiper-3.png");
const cardFour = require("./swiper-4.png");
const cards = [
  {
    text: "Card One",
    name: "One",
    image: cardOne,
  },
  {
    text: "Card Two",
    name: "Two",
    image: cardTwo
  },
  {
    text: "Card Three",
    name: "Three",
    image: cardThree
  },
  {
    text: "Card Four",
    name: "Four",
    image: cardFour
  }
];

class SwipeScreen extends Component {
  render() {
    return (
      <Container>
        <View style={{ flex: 1, padding: 25, paddingTop:50, paddingBottom:0}}>
          <DeckSwiper
            ref={mr => (this._deckSwiper = mr)}
            dataSource={cards}
            looping={false}
            renderEmpty={() =>
              <View style={{ alignSelf: "center", justifyContent:'center' ,paddingTop:deviceHeight/3}}>
                <Text style={{fontWeight:'bold', fontSize:30}}>Done. For now.</Text>
              </View>}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                
                <CardItem cardBody>
                  <Image
                    style={{
                      resizeMode: "cover",
                      width: null,
                      flex: 1,
                      height: 350
                    }}
                    source={item.image}
                  />
                    <Text style={styles.textOnImg}>{item.text},{item.name}</Text>
                </CardItem>
              </Card>}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 50,
            left:30,
            right:30,
            justifyContent: "center",
            alignItems:'center',
            padding: 30,
          }}
        >
        <Button rounded style={styles.button} onPress={() => this._deckSwiper._root.swipeLeft()}>
            <FAIcon style={{fontSize:20, color:'lightgrey'}} name="undo" />
          </Button>
        
          <Button rounded style={[styles.button,{height:60,width:60}]} onPress={() => this._deckSwiper._root.swipeLeft()}>
            <EIcon style={{fontSize:40, color:'red'}}name="cross" />
          </Button>
          <Button rounded style={styles.button} onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Icon style={{fontSize:22, color:'blue'}} name="ios-star" />
          </Button>
          
          <Button style={[styles.button,{height:60,width:60}]} onPress={() => this._deckSwiper._root.swipeRight()}>
            <Icon name="heart" style={{color:'rgb(69,169,76)',fontSize:30}} />
          </Button>
          <Button rounded style={styles.button} onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Icon style={{fontSize:30, color:'purple'}} name="ios-flash" />
          </Button>
          
        </View>
      </Container>
    );
  }
}

export default SwipeScreen;

const styles = StyleSheet.create({
  button: {
    borderRadius:100, 
    width:50, 
    height:50, 
    backgroundColor:'white', 
    alignItems:'center', 
    justifyContent:'center',
    margin:5,
  },
  textOnImg:{
    position:'absolute',
    bottom:30,
    marginLeft:15,
    color:'white',
    fontSize:25,
  },
})