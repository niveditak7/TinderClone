import React, { Component } from "react";
import { BackAndroid,Drawer, StatusBar, Platform,View,Left,Right,Text} from "react-native";
import { variables,Icon,Button, Header, Item,Input} from "native-base";
import { StackNavigator} from "react-navigation";
import LoginPage from "./LoginPage";
import Tabs from "./Tabs";

const LoginNav = StackNavigator ({
    LoginPage:{ screen: LoginPage },
    Tabs :{ screen: Tabs },
},
{
    headerMode: 'none',
}
);

export default LoginNav;