import React, {Component} from 'react';
import {View, Text, Picker, Dimensions, Switch, Alert, StyleSheet} from 'react-native';
import {Container, Button, Content, Spinner, Thumbnail, Form, Item, Input, CheckBox, Header, Left, Body,Title, Label} from 'native-base';
import { createTable } from '../connectServerPages/myAPI';

const screen_width= Dimensions.get('window').width
export default class CreateTable extends Component{
    static navigationOptions={
        title: 'Create Table'
    }
    constructor(){
        super();
       this.state={
           isLoggedIn: true,
           fontsAreLoaded: false,
           tableNameText: '',
           colNamesAndFeatures: []
       }
   }
   async componentWillMount(){
       this.setState({...this.state, fontsAreLoaded: true})
   }
handleTableNameChange = (text)=>{
    this.setState({tableNameText:text})
    console.log("TABLE NAME: "+this.state.tableNameText)
}
handleColNameChange = (text,index,subindex) => {
    let newcolNamesAndFeatures=this.state.colNamesAndFeatures
    newcolNamesAndFeatures.map(
        (eachCol,itsIndex) => { 
                if(index === itsindex)
                {
                    let colinfo = eachCol[itsIndex]
                    colinfo.splice(subindex,1,text)
                    eachCol[itsIndex] = colinfo
                    return eachCol
                }
            }
    )
    console.log("In Handle Col name Change" + newcolNamesAndFeatures)
    this.setState({colNamesAndFeatures:newcolNamesAndFeatures})
}
handlePickerValueChange = (itemValue,index,subindex) =>
{
    let newcolNamesAndFeatures=this.state.colNamesAndFeatures
    newcolNamesAndFeatures.map(
        (eachCol,itsIndex) => { 
                if(index === itsindex)
                {
                    let colinfo = eachCol[itsIndex]
                    colinfo.splice(subindex,1,itemValue)
                    eachCol[itsIndex] = colinfo
                    return eachCol
                }
            }
        
    )
    console.log("In Handle Picker value Change" + newcolNamesAndFeatures)
    this.setState({colNamesAndFeatures:newcolNamesAndFeatures})
}
handleCheckboxChange = (bool,index,subindex) =>
{
    let newcolNamesAndFeatures=this.state.colNamesAndFeatures
    newcolNamesAndFeatures.map(
        (eachCol,itsIndex) => { 
                if(index === itsindex)
                {
                    let colinfo = eachCol[itsIndex]
                    colinfo.splice(subindex,1,bool)
                    eachCol[itsIndex] = colinfo
                    return eachCol
                }
            }
        
    )
    console.log("In Handle CheckBox Change" + newcolNamesAndFeatures)
    this.setState({colNamesAndFeatures:newcolNamesAndFeatures}) 
}
handleDefaultChange = (text,index,subindex) => {
    let newcolNamesAndFeatures=this.state.colNamesAndFeatures
    newcolNamesAndFeatures.map(
        (eachCol,itsIndex) => { 
                if(index === itsindex)
                {
                    let colinfo = eachCol[itsIndex]
                    colinfo.splice(subindex,1,text)
                    eachCol[itsIndex] = colinfo
                    return eachCol
                }
            }
        
    )
    console.log("In Handle Default Change" + newcolNamesAndFeatures)
    this.setState({colNamesAndFeatures:newcolNamesAndFeatures})
}
handlePress = ({navigation})=>{    
    //   const navigateAction = NavigationActions.navigate({
    //     routeName: "DrawerOpen",
    //     params: {}
    //   })
    //   this.props.navigation.dispatch(navigateAction);
      this.props.navigation.navigate("DrawerOpen");
}
handleCreateTablePress = async() =>
{
    let tableName = this.state.tableNameText
    if(tableName === '' || !(isNaN(tableName)))
    {
        Alert.alert("Table Name cannot be empty!")
    }
    else{
    let resp = await createTable(this.state.tableNameText,this.state.colNamesAndFeatures)
    if(resp.status !== 200){
        if (resp.status === 504) {
          Alert.alert("Network Error", "Check your internet connection" )
        } else {
          Alert.alert("Error", "Cannot give access")      
        }
      } else {            
        Alert.alert("Table successfully created !")
      }
    }
}
handleAddColumnPress = ()=>{
    let newcolNamesAndFeatures = this.state.colNamesAndFeatures
    newcolNamesAndFeatures.apply(null,{length:4})
    this.setState({colNamesAndFeatures:newcolNamesAndFeatures})
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
                    <Content contentContainerStyle={{alignItems:'center'}}>
                    <Text style={{
                            justifyContent: 'center',
                            alignContent: 'flex-start',
                            padding: 10
                        }}> Create Table </Text>
                         
                            <Item floatingLabel >
                             <Label> Table Name </Label>
                             <Input style={{padding: 10}} value= {this.state.tableNameText} onChangeText={(text)=>this.handleTableNameChange(text)}/>
                            </Item>
                            {
                                this.state.colNamesAndFeatures.map(
                                (eachCol,index)=> eachCol.map(
                                    (colFeatures) =>  {
                                        return(
                                            <View key={index} style={{flexDirection: 'row'}}>
                                            <Input key={0} style= {{width:0.35*screen_width}}  value={colFeatures[0]} onChangeText={(text)=>this.handleColNameChange(text,index,0)} />
                                            <Picker key={1} style= {{width:0.25*screen_width}}  selectedValue={colFeatures[1]} onValueChange={(itemValue)=>this.handlePickerValueChange(itemValue,index,1)}>
                                                <Picker.Item label="Integer" value="int" />
                                                <Picker.Item label="Text" value="txt" />
                                                <Picker.Item label="Numeric" value="num" />
                                                <Picker.Item label="Date" value="dt" />
                                            </Picker>
                                            <CheckBox key={2} style= {{width:0.15*screen_width}} checked={colFeatures[2]} onPress={(bool)=>this.handleCheckboxChange(bool,index,2)}/>
                                            <Input key={3} style= {{width:0.25*screen_width}} value={colFeatures[3]} onChangeText={(text)=>this.handleDefaultChange(text,index,3)}/>
                                            </View>
                                        )
                                    }                                      
                                ))}

                        <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
                        <Button onPress={this.handleCreateTablePress}><Text> Create Table </Text></Button>
                        <Button onPress={this.handleAddColumnPress}><Text> Add Column </Text></Button>
                                </View>
                    </Content>
                    </Container>
        );
    }
}
    }
}