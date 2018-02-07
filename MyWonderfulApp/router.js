
import React, {Component} from 'react';
import {StackNavigator, DrawerNavigator} from 'react-navigation';
import {TouchableHighlight} from 'react-native';
import { Button, Thumbnail } from 'native-base';
import Login from './pages/loginPage';
import EditTable from './drawerPages/editTable';
import CreateTable from './drawerPages/createTable';
import InsertData from './drawerPages/insertData';
import DeleteTable from './drawerPages/deleteTable';


const DrawerScreens = DrawerNavigator({
  createTable: {screen: CreateTable},
  edit: {screen: EditTable,
   navigationOptions: (({navigation})=>{
     <EditTable navigation={navigation}/>
   })
 },
 insertData: {screen: InsertData},
 deleteTable: {screen: DeleteTable}
  }  ,
{
  initialRouteName: 'edit',
  headerMode: 'none'
});

export const StackScreens = StackNavigator({
  loginScreen : {screen: Login},
  drawer: {screen: DrawerScreens}
  },
{
  initialRouteName: 'loginScreen',
  headerMode: 'none'
}
);