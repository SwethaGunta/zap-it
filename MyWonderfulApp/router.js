
import React, {Component} from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import {TouchableHighlight} from 'react-native';
import { Button, Thumbnail } from 'native-base';
import Login from './pages/loginPage';
import CreateTable from './drawerPages/createTable';
import EditTable from './drawerPages/editTable';
import InsertData from './drawerPages/insertData';
import DeleteTable from './drawerPages/deleteTable';
import SignUpPage from './pages/signUpPage';


const DrawerScreens = DrawerNavigator({
createTable: {screen: CreateTable},
 editTable: {screen: EditTable},
 insertData: {screen: InsertData},
 deleteTable: {screen: DeleteTable}
  }  ,
{
  initialRouteName: 'editTable',
  headerMode: 'none'
});

export const StackScreens = StackNavigator({
  loginScreen : {screen: Login},
  drawer: {screen: DrawerScreens},
  signUp: {screen: SignUpPage}
  },
{
  initialRouteName: 'loginScreen',
  headerMode: 'none'
}
);