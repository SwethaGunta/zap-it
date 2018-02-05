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
}
handleColNameChange=(text,key,subindex)=>{
    let newcolNamesAndFeatures=this.state.colNamesAndFeatures
    newcolNamesAndFeatures.map(
        (allcols,index)=> {
            if(key === index)
            {
                let colinfo = allcols[index]
                colinfo.splice(subindex,1,text)
                allcols[index] = colinfo
                return allcols
            }
        }
    )
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
                            alignContent: 'flex-start'
                        }}> Create Table </Text>
                         <Form>
                            <Item floatingLabel>
                             <Label> Table Name </Label>
                             <Input value= {this.state.tableNameText} onChangeText={(text)=>this.handleTableNameChange(text)}/>
                            </Item>

                            {this.state.colNamesAndFeatures.map(
                                (allcols,key)=>allcols[key].map(
                                    (colinfo)=>  {
                                        return(
                                            <View key={key} style={{flexDirection: 'row'}}>
                                            <Input key={0} value={colinfo[0]} onChangeText={(text)=>this.handleColNameChange(text)} />
                                            <Picker key={1} style= {{width:0.25*screen_width}}  selectedValue={colinfo[1]} onValueChange={(itemValue)=>this.handlePickerValueChange(id,itemValue)}>
                                                <Picker.Item label="Integer" value="int" />
                                                <Picker.Item label="Text" value="txt" />
                                                <Picker.Item label="Numeric" value="num" />
                                                <Picker.Item label="Date" value="dt" />
                                            </Picker>
                                            <CheckBox key={2}  />
                                            <Input/>
                                            </View>
                                        )
                                    }                                      
                                   
                                    
                                ))}
                            <Item fixedLabel>
                            <Label> Column {number} </Label>
                            <Input value={} onChangeText={}/>
                            </Item>
                        
                        
                        </Form>
                    </Content>
                    </Container>
        );
    }
}
    }
}