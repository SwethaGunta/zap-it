import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import {Container, Content, List, ListItem, Thumbnail, Button, Header, Body, Title, Right, Left, Spinner} from 'native-base';
import {displayTables} from '../connectServerPages/myAPI';

export default class EditTable extends Component{
     static navigationOptions={
         title: 'Edit Table',
       
     }
    constructor(){
         super();
        this.state={
            isLoggedIn: true,
            fontsAreLoaded: false,
            isLoading: true,
            table_names: []
        }
    }
    async componentWillMount(){
        this.setState({...this.state, fontsAreLoaded: true})
    }
    async componentDidMount(){
        let resp = await displayTables();
        if(resp.status !== 200){
            if (resp.status === 504) {
              Alert.alert("Network Error", "Check your internet connection" )
            } else {
              Alert.alert("Error", "Check the error")      
            }
          } else {
            this.setState({...this.state,isLoading:false});
            console.log("Response is: " + resp._bodyText);
            let parsedData = JSON.parse(resp._bodyText);
            this.setState({table_names:parsedData})
          }
    }
    handlePress = ({navigation})=>{    
        //   const navigateAction = NavigationActions.navigate({
        //     routeName: "DrawerOpen",
        //     params: {}
        //   })
        //   this.props.navigation.dispatch(navigateAction);
          this.props.navigation.navigate("DrawerOpen",{login_user:this.props.navigation.state.params.login_user});
    }
    handleLogout = ()    =>
{
    this.props.navigation.navigate('loginScreen')
}
    render() { 
        const {params}  = this.props.navigation.state
        const login_user = params ? params.login_user : null
        if(this.state.fontsAreLoaded === true){
            if(this.state.isLoggedIn === true){
                return (
                    <Container>
                        <Header>
                            <Left>
                                <Button transparent onPress={this.handlePress}>
                            <Thumbnail size={16} source={{uri:'https://i.pinimg.com/736x/7c/09/06/7c090686c035c36a78f17d6955ae6980--film-avatar-movie-photo.jpg'}}/>
                            </Button>
                            </Left>
                            <Body>
                                <Title>
                                   Welcome {login_user}
                                </Title>
                                </Body>
                                <Right>
                        <Button transparent onPress={this.handleLogout}><Text>Logout</Text></Button>
                    </Right>
                            </Header>
                      <Content>
                        <Text style={{
                           alignSelf: 'center'
                        }}>
                            List of Tables
                        </Text>
                        <List>
                            {
                                this.state.table_names.map(
                                    (table,key)=>{
                                        return <ListItem key={key}><Text key={key}>{table.table_name}</Text></ListItem>
                                    }
                                )
                            }
                        </List>
                            
                      </Content>
                    </Container>
                )
            }
        }
        return(
            <Container>
        <Content>
          <Spinner color='black' />
        </Content>
      </Container>       
        );
    }
}