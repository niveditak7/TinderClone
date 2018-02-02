import React, { Component } from "react";
import { Image,  StyleSheet, Dimensions, Alert, AsyncStorage } from "react-native";
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
  Right, Content,View,
  Body,List
} from "native-base";
import EIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get('window').height;

const cardOne = require("./swiper-1.png");
const cardTwo = require("./swiper-2.png");
const cardThree = require("./swiper-3.png");
const cardFour = require("./swiper-4.png");

class SwipeScreen extends Component {
  
  constructor(props){
    super(props);
    this.state={
      cards:[],
      user_id:'',
      HASURA_AUTH_ID:'',
      city:'',
      gender:'',
    };
    this.fetchInfo.bind(this);
    this.onLike.bind(this);
    this.onDisLike.bind(this);
  }

  

  onLike(){
   console.log(this.mr)
  }

  onDisLike(){
    
  }
  

  fetchInfo=async()=>{
    console.log(this.state.cards);
    console.log("Cards");
    await AsyncStorage.getItem('HASURA_AUTH_TOKEN').then((value)=>{
      this.setState({'HASURA_AUTH_ID':value})
      console.log("SwipeScreen");
      console.log(this.state.HASURA_AUTH_ID);
    });
    await AsyncStorage.getItem('user_id').then((value)=>{
      this.setState({'user_id':value})
      console.log(this.state.user_id);
    });
    await AsyncStorage.getItem('city').then((value)=>{
      this.setState({'city':value})
      console.log(this.state.city);
    });await AsyncStorage.getItem('gender').then((value)=>{
      this.setState({'gender':value})
      console.log(this.state.gender);
    });
    var url = "https://data.bleed71.hasura-app.io/v1/query";

// If you have the auth token saved in offline storage, obtain it in async componentDidMount
// var authToken = await AsyncStorage.getItem('HASURA_AUTH_TOKEN');
// And use it in your headers
// headers = { "Authorization" : "Bearer " + authToken }
var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+this.state.HASURA_AUTH_ID,
    }
};

var body = {
    "type": "select",
    "args": {
        "table": "User",
        "columns": [
            "User_id",
            "User_name"
        ],
        "where": {
            "$and": [
                {
                    "User_id": {
                        "$ne": this.state.user_id
                    }
                },
                {
                    "Gender": {
                        "$ne": this.state.gender
                    }
                },
                {
                    "City": {
                        "$eq": this.state.city
                    }
                }
            ]
        }
    }
};

requestOptions.body = JSON.stringify(body);
fetch(url, requestOptions)
.then(async(response)=> {
	return response.json();
})
.then(async(result)=> {
  console.log("SwipeScreen response")
 
  console.log(JSON.stringify(result));
  this.setState({cards:result})
  console.log(this.state.cards);
  console.log("in function before render");
})
.catch(function(error) {
	console.log('Request Failed:' + error);
});


  }

  render() {
    
   
   console.log("Inrednder");
   console.log(this.state.cards);
    
   
    if(this.state.cards.length>1){
      return(
        <Container>
        <View>
          <View style={{padding:20, paddingTop:30}}>
            <DeckSwiper
              ref={mr => (this._deckSwiper = mr)}
              dataSource={this.state.cards}
              looping={false}
              renderEmpty={() =>
                <View style={{ alignSelf: "center" }}>
                  <Text>That's all for now.</Text>
                </View>}
                onSwipeRight={this.onLike}
              renderItem={item =>
                <Card style={{ elevation: 3 }}>
                  <CardItem>
                    <Left>
                      <Text>Hi</Text>
                        <Body>
                          <Text>
                            {item.User_id}
                          </Text>
                          <Text note>NativeBase</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem cardBody>
                    </CardItem>
                    <CardItem>
                      <IconNB name={"ios-heart"} style={{ color: "#ED4A6A" }} />
                        <Text>
                          {item.User_name}
                        </Text>
                    </CardItem>
                  </Card>}
              /> 
            </View>
            <View  style={{
            flexDirection: "row",
            bottom: 50,
            justifyContent: "center",
            alignItems:'center',
            padding: 30,
            marginTop:400
          }}>
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
        </View>
        </Container>
      );
    }
    else{
      return(
        <Content>
        <View style={{alignItems:'center', justifyContent:'center' ,marginTop: deviceHeight/2,marginLeft: deviceWidth/2 -60 }}>
        <Button rounded onPress={this.fetchInfo} style={{backgroundColor:'#ff5f64'}} >
        <Text>Click Here</Text>
        </Button></View></Content>
      );
    }
  }
  }
   /* displayCards()
    {
    return (
      
      <Container>
        <View style={{ flex: 1, padding: 25, paddingTop:50, paddingBottom:0}}>
        
          <DeckSwiper
            ref={(deck) => (this._deckSwiper = deck)}
            dataSource={this.state.cards}
            onSwipeLeft={this.onDisLike}
            onSwipeRight={this.onLike}
            looping={false}
            
            renderItem={item =>
              <Card>
                
               <CardItem cardBody>
                  
                    <Text >{item.User_name}</Text>
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
    );}
    */
  


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