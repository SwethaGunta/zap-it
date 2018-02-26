import React, {Component} from 'react';
import {View,Text,Alert, Dimensions} from 'react-native';
import {Container, Content, Input, Button, Body,Right, Header, Title, Left, Icon} from 'native-base';
import {registerUser} from '../connectServerPages/myAPI';
import {Login} from '../pages/loginPage';
const screen_width = Dimensions.get('window').width
const screen_hght = Dimensions.get('window').height

export default class SignUpPage extends Component {
    constructor(){
        super();
        this.state = {
            isLoggedIn: false,
            fontsAreLoaded: false,
            userNameText: '',
            passwordText: '',
            emailIdText: '',
            canRegister: false,
            isRegistered: false
        }
    } 
    handleUserNameChange = (text)=>{
        this.setState({userNameText:text})
    }   
    handlePwdChange = (text)=>{
        this.setState({passwordText:text})
    }
    handleEmailChange = (text)=>{
        this.setState({emailIdText:text})
    }
    handleRegisterPress = async()=>{
        let userName_bool = this.state.userNameText.toString().match('^[^0-9][a-zA-Z0-9._]')
        let password_bool = this.state.passwordText.toString().match('[a-zA-Z0-9@#$%&*!]')
        let emailId_bool = this.state.emailIdText.toString().match('[a-zA-Z0-9_.]@[a-z]+.[a-z.]{3,}$')
        
            if((userName_bool) && (password_bool) && (emailId_bool))
            {
                let resp = await registerUser(this.state.userNameText,this.state.passwordText,this.state.emailIdText)
                if(resp.status !== 200){
                if (resp.status === 504) {
                    Alert.alert("Network Error", "Check your internet connection" )
                    } else {
                        Alert.alert("Error", "Failed to register")      
                        }
                    }
                    else
                    {
                        Alert.alert("User registered successfully")
                        this.props.navigation.navigate('loginScreen')
                    }
            }
             else
            {
                Alert.alert("User cannot be registered! Please enter valid Details")
            }
        }
handleGoBack = ()=>
{
    this.props.navigation.goBack()
}
 
    render(){
        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.handleGoBack}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>
                        Sign Up
                        </Title>
                    </Body>
                    <Right>
                    </Right>
                    </Header>
                    <Content>
                        <View style={{
                            margin: 20
                        }}>
                        <Input placeholder={"Enter User Name"} style={{alignSelf:'center',
                                        width: (screen_width - 40)      }}  value = {this.state.userNameText} onChangeText={(text)=>this.handleUserNameChange(text)} />
                        <Input placeholder={"Enter Password"} style={{alignSelf:'center',width: (screen_width - 40)}}  secureTextEntry value={this.state.passwordText} onChangeText={(text)=>this.handlePwdChange(text)}/>
                        <Input placeholder={"Enter email address"} style={{alignSelf:'center',width: (screen_width - 40)}}  value={this.state.emailId} onChangeText={(text)=>this.handleEmailChange(text)}/>
                    <Button style={{alignSelf:'center'}} onPress={this.handleRegisterPress}><Text>Register</Text></Button>
                    </View>
                    
                    </Content>
                    
                </Container>
        );
    }
}