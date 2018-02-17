import React, {Component} from 'react';
import {View,Text, Alert, Picker, Switch, Dimensions} from 'react-native';
import {Container, Button, Content, Spinner, Thumbnail, Form, Item, Input, CheckBox, Header, Left, Body,Title, Label} from 'native-base';
import { displayTables,deleteTable } from '../connectServerPages/myAPI';

export default class DeleteTable extends Component{
    constructor(){
        super();
        {
            this.state={
                isLoggedIn: true,
                fontsAreLoaded: false,
                isLoading: true,
                pickerlabel: '',
                table_names: [],
                isDataInserted: false,
            }
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
              Alert.alert("Error", "You do not have delete permissions")      
            }
          } else {
            this.setState({...this.state,isLoading:false});
            console.log("Response is: " + resp._bodyText);
            let parsedData = JSON.parse(resp._bodyText);
            this.setState({...this.state,table_names:parsedData})
          }
    }
    async componentWillUpdate(){
        let resp = await displayTables();
        if(resp.status !== 200){
            if (resp.status === 504) {
              Alert.alert("Network Error", "Check your internet connection" )
            } else {
              Alert.alert("Error", "You do not have delete permissions")      
            }
          } else {
            this.setState({...this.state,isLoading:false});
            console.log("Response is: " + resp._bodyText);
            let parsedData = JSON.parse(resp._bodyText);
            this.setState({...this.state,table_names:parsedData})
          }

    }
    handleDelete = async ()=>{
        this.setState({...this.state,isLoading:true});
        let resp = await deleteTable(this.state.pickerlabel);
        if(resp.status !== 200){
            if (resp.status === 504) {
              Alert.alert("Network Error", "Check your internet connection" )
            } else {
              Alert.alert("Error", "Data not available")      
            }
          } else {
            Alert.alert("Table " + this.state.pickerlabel + "successfully deleted")
            this.setState({...this.state,isLoading:false});
            
          }
        }
        handlePress = ({navigation})=>{    
            //   const navigateAction = NavigationActions.navigate({
            //     routeName: "DrawerOpen",
            //     params: {}
            //   })
            //   this.props.navigation.dispatch(navigateAction);
              this.props.navigation.navigate("DrawerOpen");
        }
render(){
    if(this.state.isLoading === true)
        {
            return(<View style={{flex: 1, paddingTop: 20}}>
            <Spinner color='blue'/>
            </View>)
        }
        if(this.state.fontsAreLoaded === true){
            if(this.state.isLoggedIn === true){
        return(
            <Container>
            <Header>
                <Left>
                <Button transparent onPress={this.handlePress}>
                <Thumbnail size={16} source={{uri:'https://i.pinimg.com/736x/7c/09/06/7c090686c035c36a78f17d6955ae6980--film-avatar-movie-photo.jpg'}}/>
                </Button>
                </Left>
                <Body>
                    <Title> Welcome Name </Title>
                    </Body>
                </Header>
                <Content>
                <Picker
                    selectedValue={this.state.pickerlabel}
                    onValueChange={(itemValue, itemIndex) => {if (itemValue!=0){this.setState({pickerlabel: itemValue})}else{Alert.alert("Please select a value!")}       }        }>
                    <Picker.Item label="Please select the table" value="0"/>
                    
                    {   this.state.table_names.map((table, key)=>(
                            <Picker.Item label={table.table_name} value={table.table_name} key={key}/>)
                        )
                    }
                </Picker>
                <Button style={{alignSelf:'center'}} onPress={this.handleDelete}><Text> Delete</Text></Button>
                  </Content>
                  </Container>
        )
}
        }
    }
}