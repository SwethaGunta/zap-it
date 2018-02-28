
import React, {Component} from 'react';
import { tryLogin } from '../connectServerPages/myAPI';
import {View, Text, Alert} from 'react-native';
import {Container, Header, Left, Right, Body, Content, Form, Item, Label, Input, Button, Title} from 'native-base';
import EditTable from '../drawerPages/editTable';

export default class Login extends Component{
constructor(){
    super();
    this.state = {
        //isLoggedIn: false,
        usernameText: '',
        passwordText: '',
        fontsAreLoaded: false,
        auth_token: ''
    }
}

async componentWillMount() {
    this.setState({...this.state, fontsAreLoaded: true});
  }

handleUsernameChange = (usernameText) => {
    this.setState({...this.state,usernameText: usernameText})
}

handlePasswordChange = (passwordText) =>{
    this.setState({...this.state,passwordText: passwordText})
}
handleLoginPressed = async () => {
    let resp = await tryLogin(this.state.usernameText, this.state.passwordText);
    if(resp.status !== 200){
      if (resp.status === 504) {
        Alert.alert("Network Error", "Check your internet connection" )
      } else {
        Alert.alert("Error", "Unauthorized, Invalid username or password")      
      }
    } else {
      let parsedData = JSON.parse(resp._bodyText);
      this.setState({auth_token:parsedData.auth_token,user:parsedData.username})
      this.props.navigation.navigate('drawer',{login_user:this.state.usernameText,auth_token:this.state.auth_token})
    }
  }
  handleSignUpPressed = ()=>
  {
    this.props.navigation.navigate('signUp')
  }
render(){
  if(this.state.fontsAreLoaded === true){
    return(
        <Container>
          <Header>
            <Left />
            <Body>
              <Title> Login </Title>
            </Body>
            <Right />
          </Header>
          <Content contentContainerStyle={{justifyContent:'center', margin: 20}}>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input value={this.state.usernameText} onChangeText={this.handleUsernameChange}/>
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input value={this.state.passwordText} onChangeText={this.handlePasswordChange} secureTextEntry/>
              </Item>
            </Form>
            <View style = {{height:10}} />
            <Button block onPress={this.handleSignUpPressed} >
              <Text> Sign up </Text>
            </Button>
            <View style = {{height:10}} />
            <Button block title="Log in" onPress={this.handleLoginPressed} >
              <Text> Log in </Text>
            </Button>
          </Content>
        </Container>
    )
}
return(
    <Container>
        <Header />
        <Content>
          <Spinner color='black' />
        </Content>
      </Container>
);
}
}