import React, { Component } from "react";
import { BackAndroid,Drawer, StatusBar, Platform,View,Left,Right,Text} from "react-native";
import { variables,Icon,Button, Header, Item,Input} from "native-base";
import Tabs from "./Tabs";
import LoginPage from './LoginPage';
import IntroPage from './IntroPage';
import { StackNavigator} from "react-navigation";
import ProfileScreen from './ProfileScreen';
const StackNav = StackNavigator ({
    IntroPage:{screen:IntroPage},
    LoginPage:{screen: LoginPage},
    Tabs:{ screen: Tabs },
    ProfileScreen:{ screen: ProfileScreen},
    },
    {
   headerMode:'none',
});

export default StackNav;