import React, {Component} from 'react';
import {View, Text, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import {Container, Content, List, ListItem, Thumbnail, Button, Header, Body, Title, Left} from 'native-base';
import {DrawerScreens} from '../router';
import { NavigationActions } from 'react-navigation';

export default class EditTable extends Component{
     static navigationOptions={
         title: 'Edit Table'
     }
    
    constructor(){
         super();
        this.state={
            isLoggedIn: true,
            fontsAreLoaded: false
        }
    }
    async componentWillMount(){
        this.setState({...this.state, fontsAreLoaded: true})
    }
    handlePress = ({navigation})=>{    
        //   const navigateAction = NavigationActions.navigate({
        //     routeName: "DrawerOpen",
        //     params: {}
        //   })
        //   this.props.navigation.dispatch(navigateAction);
          this.props.navigation.navigate("DrawerOpen");
    }
    render() {        
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
                                    Welcome name!
                                </Title>
                                </Body>
                            </Header>
                      <Content>
                        <Text style={{
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            List of Tables
                        </Text>
                        <List>
                          <ListItem>
                            <Text>Table 1</Text>
                          </ListItem>
                          <ListItem>
                            <Text>Table 2</Text>
                          </ListItem>
                          <ListItem>
                            <Text>Table 3</Text>
                          </ListItem>
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