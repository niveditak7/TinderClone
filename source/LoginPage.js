import React, { Component } from "react";
import styles from "./../styles";
import { Container, Content, Card, CardItem, Text, Body, View, Right, Left, Header, Title, Button, Icon  } from "native-base";
import Animated, { TextInput } from "react-native";
import Tabs from "./Tabs";
import Carousel from "./Carousel";
const LoginPage = ({ navigation: {navigate}}) =>
      <Container style={{backgroundColor:'white'}}>
          <Carousel />
        <View style={{marginLeft:100, top:-40}}>
            <Button rounded style={{width:225, backgroundColor:'#3b5998' ,marginBottom:15}} onPress={() => navigate("Tabs")}>
                <Text>     LOG IN WITH FACEBOOK</Text>
            </Button>
            <Button rounded transparent bordered onPress={() => navigate("Tabs")}>
                <Text>LOG IN WITH PHONE NUMBER</Text>
            </Button>
        </View>
      </Container>
export default LoginPage;

    
