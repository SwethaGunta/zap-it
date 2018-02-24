import React, {Component} from 'react';
import {View,Text,Alert} from 'react-native';
import {Container, Content, Input, Button, Header, Title} from 'native-base';
import {registerUser} from '../connectServerPages/myAPI';
import {Login} from '../pages/loginPage';

export default class SignUpPage extends Component {
    constructor(){
        super();
        this.state = {
            isLoggedIn: false,
            usernameText: '',
            passwordText: '',
            fontsAreLoaded: false,
            userNameText: '',
            passwordText: '',
            emailIdText: '',
            canRegister: false,
            isRegistered: false
        }
    } 
    handleUserNameChange = (text)=>{
        this.setState({usernameText:text})
    }   
    handlePwdChange = (text)=>{
        this.setState({passwordText:text})
    }
    handleEmailChange = (text)=>{
        this.setState({emailIdText:text})
    }
    handleRegisterPress = async()=>{
        let userName = this.state.usernameText
        let password = this.state.passwordText
        let emailId = this.state.emailIdText
        if((userName.match('[a-zA-Z][a-zA-Z0-9]')) && (password.match('[a-zA-Z0-9@#$%&*!\\]'))){
           this.setState({canRegister:true})
        }
        else
            {
                Alert.alert("Please enter a valid UserName and Password")
                this.setState({canRegister:false})
            }
        if(emailId.match('[a-zA-Z0-9._][@][a-z][.][a-z]{3}'))
        {
            this.setState({canRegister:true})
        }
        else{Alert.alert("Please enter a valid email")
            this.setState({canRegister:false})
        }
        let resp = await registerUser(this.state.usernameText,this.state.passwordText,this.state.emailIdText)
        if(resp.status !== 200){
            if (resp.status === 504) {
              Alert.alert("Network Error", "Check your internet connection" )
            } else {
              Alert.alert("Error", "Failed to Insert Data")      
            }
          }
          else
          {
            Alert.alert("User registered successfully")
          }
    }
    render(){
        return(
            <Container>
                <Header>
                    <Title>
                        Register
                        </Title>
                    </Header>
                    <Content>
                        <Input placeholder={"Enter User Name"} value={this.state.userNameText} onChangeText={(text)=>{handleUserNameChange(text)}} />
                        <Input placeholder={"Enter Password"}secureTextEntry value={this.state.passwordText} onChangeText={(text)=>{this.handlePwdChange(text)}}/>
                        <Input placeholder={"Enter email address"}value={this.state.emailId} onChangeText={(text)=>{this.handleEmailChange(text)}}/>
                    <Button style={{alignSelf:'center'}} onPress={this.handleRegisterPress}><Text>SignUp</Text></Button>
                    </Content>
                    
                </Container>
        );
    }
}