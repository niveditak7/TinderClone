import React, { Component } from "react";
import { Image,  StyleSheet, Dimensions, Alert, AsyncStorage, RefreshControl } from "react-native";
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
const logo = require("./tinderlogo.jpg");
class SwipeScreen extends Component {
  
  constructor(props){
    super(props);
    this.state={
      cards:[],
      user_id:'',
      HASURA_AUTH_ID:'',
      city:'',
      gender:'',
      currentUser:'',
      refreshing: false,
      prevItem:'',
      undon:0,
    };
    this.fetchInfo.bind(this);
    this.onLike.bind(this);
    this.onButtonLike.bind(this);
    this.onDislike.bind(this);
 this.displayCards.bind(this);
 this.undo.bind(this);
 this._onRefresh.bind(this);
  }

  componentDidMount=async()=>{
    console.log("SwipeScreen mounted!!");
    this.fetchInfo();
  }

 // componentDidUpdate(){
 //   console.log("SwipeScreen updated ...!");
 // }

  onLike=async(item)=>{
    console.log("inLike");
   console.log(item.User_id)
  
   //this.setState({currentUser:item.User_id})
  // console.log(this.state.currentUser);
   console.log(this.state.user_id);
   console.log(this.state.HASURA_AUTH_ID);
   var auth_token=this.state.HASURA_AUTH_ID;
   console.log(auth_token);
  fetch("https://app.bleed71.hasura-app.io/APIEP_Likes/"+item.User_id+"/"+this.state.user_id+"/"+auth_token)
   .then(async(response) =>{
    return response.json();
  })
  .then(async(result)=> {
    console.log(result);
    console.log(result.affected_rows);
    if(result.affected_rows==1)
    Alert.alert("Its a Match!");
  })
  .catch(function(error) {
    console.log('Request Failed:' + error);
  });
  }

  onButtonLike=(item)=>{
    this.onLike(this._deckSwiper._root.state.selectedItem);
  // this.setState({currentUser:item.User_id})
  this.setState({prevItem:this._deckSwiper._root.state.selectedItem})
    this._deckSwiper._root.swipeRight()
   }

   onButtonDislike=(item)=>{
    this.onDisike(this._deckSwiper._root.state.selectedItem);
  // this.setState({currentUser:item.User_id})
  this.setState({prevItem:this._deckSwiper._root.state.selectedItem})
    this._deckSwiper._root.swipeLeft()
   }

  onDislike=(item)=>{
   Alert.alert(""+item.User_id)
  // this.setState({currentUser:item.User_id})
   console.log("hgfd");
  // this.setState({prevItem:this._deckSwiper._root.state.selectedItem})
  }

  undo=()=>{
    var prev=this.state.prevItem;
   // var i=this.state.undon;
   // this.setState({undon:i+1});
    console.log("jnukhnk")
    console.log(prev);
console.log(  this.state.cards.indexOf(prev))
var n=this.state.cards.indexOf(prev);
this._deckSwiper._root.state.selectedItem=this.state.cards[n-1];
console.log(this._deckSwiper._root.state.selectedItem)
this._deckSwiper._root.swipeLeft();
this.displayCards(prev)

  }

  displayCards=(item)=>{
    var userid=item.User_id;
  //this.setState({currentUser:userid});
  console.log("in display");
    console.log(this.state.currentUser);
    
    return(
<Card style={{ elevation: 3 }}>
                    <CardItem cardBody>
                    <Image style={{ height: 300, flex: 1 }} source={{uri:'https://filestore.bleed71.hasura-app.io/v1/file/'+item.fileid}} />
                    </CardItem>
                    <CardItem>
                      <IconNB name={"ios-heart"} style={{ color: "#ED4A6A" }} />
                        <Text>
                          {item.User_name}
                        </Text>
                    </CardItem>
                  </Card>
    );
  }

  fetchInfo=async()=>{
    console.log("in fetchInfo");
    console.log("Cards:"+this.state.cards.length);
   
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
    var url = "https://app.bleed71.hasura-app.io/APIEP_UserDetailsforSwipe";

// If you have the auth token saved in offline storage, obtain it in async componentDidMount
// var authToken = await AsyncStorage.getItem('HASURA_AUTH_TOKEN');
// And use it in your headers
// headers = { "Authorization" : "Bearer " + authToken }

fetch(url+"/"+this.state.user_id+"/"+this.state.gender+"/"+this.state.city+"/"+this.state.HASURA_AUTH_ID)
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

  _onRefresh=async()=> {
    this.setState({refreshing:true});
    console.log("heffrbfgkjfdjk")
    this.fetchInfo;
    this.setState({refreshing:false});
    }

  
 
  

  render() {
    console.log("SwipeScreen RENDERED AGAIN");
   
  
   
    if(this.state.gender && this.state.city){
      if(this.state.cards.length>0){
      return(
        <Container>
          
        <Content refreshControl={
          <RefreshControl
          
          refreshing={this.state.refreshing}
            onRefresh={this.fetchInfo}
            tintColor='#ff5f64'
            colors={['#ff5f64']}
          />
        }
        >
          <View style={{padding:20, paddingTop:50}}>
            <DeckSwiper
              ref={mr => (this._deckSwiper = mr)}
              dataSource={this.state.cards}
              looping={false}
              renderEmpty={() =>
                <View style={{ alignSelf: "center" }}>
                  <Text>That's all for now.</Text>
                </View>}
                onSwipeRight={this.onLike}
                onSwipeLeft={this.onDislike}
              renderItem={this.displayCards}
              /> 
            </View>
            <View  style={{
            flexDirection: "row",
            bottom: 50,
            justifyContent: "center",
            alignItems:'center',
            padding: 30,
            marginTop:370,
          }}>
      
        
          <Button rounded style={[styles.button,{height:60,width:60}]} onPress={() => this._deckSwiper._root.swipeLeft()}>
            <EIcon style={{fontSize:40, color:'red'}} name="cross" />
          </Button>
         
          
          
          <Button style={[styles.button,{height:60,width:60}]} onPress={this.onButtonLike}>
            <Icon name="heart" style={{color:'rgb(69,169,76)',fontSize:30}} />
          </Button>
          
          <Text>{this.state.currentUser}</Text>
        </View>
        </Content>
        </Container>
      );
    }
  else{
    return(
<Content refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.fetchInfo}
            tintColor='#ff5f64'
            colors={['#ff5f64']}
          />
        }
        style={{backgroundColor:'white'}} >
<View style={{marginTop:deviceWidth/2, backgroundColor:'white',alignItems:'center'}}>
<Thumbnail large source={logo} />
            <Text style={{textAlign:'center',justifyContent:'center', flex:10, color:'#ff5f64', fontSize:25, padding:35}}>
              Finding people near you....
            </Text>
            
          </View>
  </Content>
  
    );
  }
}
    else{
      return(
        <Content refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.fetchInfo}
            tintColor='#ff5f64'
            colors={['#ff5f64']}
          />
        } >
        
        <View style={{backgroundColor:'#ff5f64',padding:30, alignItems:'center'}}>
        <Thumbnail large source={logo} />
            <Text style={{textAlign:'center',justifyContent:'center', flex:10, color:'white', fontSize:25, padding:35}}>
            Hey there! Add your gender and city, and pull to refresh!
            </Text>
            <Button rounded style={{alignSelf:'center',backgroundColor:'white',marginBottom:35}} onPress={()=>this.props.navigation.navigate("ProfileScreen")}>
              <Text style={{color:'#ff5f64'}}>Click Here</Text>
            </Button>
          </View>
          </Content>
      );
    }
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
    margin:35,
  },
  textOnImg:{
    position:'absolute',
    bottom:30,
    marginLeft:15,
    color:'white',
    fontSize:25,
  },
})