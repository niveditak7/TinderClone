import React, { Component } from "react";
import { BackAndroid,Drawer, StatusBar, Platform,View,Left,Right,Text} from "react-native";
import { variables,Icon,Button, Header, Item,Input} from "native-base";
import Tabs from "./Tabs";
import InitSwipe from './InitSwipe';
import { StackNavigator} from "react-navigation";
import SwipeScreen from './ProfileScreen';
const SwipeStack = StackNavigator ({
    InitSwipe:{ screen: InitSwipe },
    SwipeScreen:{ screen: SwipeScreen},
    },
    {
   headerMode:'none',
});

export default SwipeStack;