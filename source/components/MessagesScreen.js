import React, { Component } from 'react';
import { AsyncStorage, RefreshControl, Image, Dimensions, } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Body, Left, Right, Thumbnail, View } from 'native-base';
const swipe = require("./swipe.jpg");

const deviceWidth = Dimensions.get("window").width;
export default class MessagesScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      matches:[],
      user_id:'',
      HASURA_AUTH_TOKEN:'',
      city:'',
      gender:'',
      currentUser:'',
      refreshing: false,
      prevItem:'',
      undon:0,
    };
    this.fetchMatches.bind(this);
  }

  componentDidMount=async()=>{
    console.log("SwipeScreen mounted!!");
    this.fetchMatches();
  }

  fetchMatches=async()=>{
    console.log("in fetchMatches");
    console.log("Matches:"+this.state.matches.length);
   
    await AsyncStorage.getItem('HASURA_AUTH_TOKEN').then((value)=>{
      this.setState({'HASURA_AUTH_TOKEN':value})
      console.log("mathses:   "+this.state.HASURA_AUTH_TOKEN);
    });
    await AsyncStorage.getItem('user_id').then((value)=>{
      this.setState({'user_id':value})
      console.log("matches:    "+this.state.user_id);
    });
    
    

    var url = "https://app.bleed71.hasura-app.io/APIEP_MatchList";

// If you have the auth token saved in offline storage, obtain it in async componentDidMount
// var authToken = await AsyncStorage.getItem('HASURA_AUTH_TOKEN');
// And use it in your headers
// headers = { "Authorization" : "Bearer " + authToken }

fetch(url+"/"+this.state.user_id+"/"+this.state.HASURA_AUTH_TOKEN)
.then(async(response)=> {
	return response.json();
})
.then(async(result)=> {
  console.log("MatchScreen response")
 
  console.log((result));
  this.setState({matches:(result)})
  console.log(this.state.matches);
})
.catch(function(error) {
	console.log('Request Failed:' + error);
});


  }

  render() {
    if(this.state.matches.legth>1)
    {
      return (
        <Container style={{backgroundColor:'white', paddingTop:10}}>
          <Content  refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.fetchMatches}
            tintColor='#ff5f64'
            colors={['#ff5f64']}
          />
        }>
            <View style={{padding:15}}>
              <Text style={{color:'#ff5f64'}}>MATCHES</Text>
              </View>
            <List dataArray={this.state.matches}
             renderRow={(item) =>
              <ListItem avatar >
                <Left>
                <Thumbnail source={{ uri: 'https://filestore.bleed71.hasura-app.io/v1/file/'+ item.fileid}} />
                </Left>
                <Body>
                  <Text>{item.name}</Text>
                  
                  </Body>
                   
                </ListItem>
              }>
            </List>
          </Content>
      </Container>
    );
  }
  else{
    return(
      <Content  refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.fetchMatches}
          tintColor='#ff5f64'
          colors={['#ff5f64']}
        />
      } style={{backgroundColor:'white'}}>
          <View style={{marginTop:20, alignItems:'center'}}>
          <Image source={swipe} style={{flex: 1 }}/>
            <Text style={{textAlign:'center',justifyContent:'center', flex:10, color:'grey', fontSize:30, paddingTop:20, paddingBottom:10}}>
              Get Swiping
            </Text>
            <Text style={{textAlign:'center',justifyContent:'center', flex:10, color:'lightgrey', fontSize:20, padding:25, paddingTop:10}}>
              When you match with other users they'll appear here.
            </Text>
          </View>
      </Content>
    );
  }
}
}