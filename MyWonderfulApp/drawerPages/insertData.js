import React, {Component} from 'react';
import {View, Text, Picker, Dimensions, Switch, Alert, StyleSheet} from 'react-native';
import {Container, Button, Content, Spinner, Thumbnail, Form, Item, Input, CheckBox, Header, Left, Body,Title, Label, Right} from 'native-base';
import { displayTables, getColData, postData, getRowData, triggerZap } from '../connectServerPages/myAPI';

export default class InsertData extends Component{
    static navigationOptions={
        title: 'Insert Data'
    }
    constructor(){
        super();
       this.state={
           isLoggedIn: true,
           fontsAreLoaded: false,
           isLoading: true,
           pickerlabel: '',
           table_names: [],
           cols_of_sel_tab: [],
           rowData: [],
           thisrowData: [],
           isDataInserted: false,
           buttonText: 'Insert',
           zapRows: [],
           thiszapRow: [],
           auth_token: ''
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
              Alert.alert("Error", "Login as admin")      
            }
          } else {            
            console.log("Response is: " + resp._bodyText)
            let parsedData = JSON.parse(resp._bodyText)
            this.setState({isLoading:false})
            this.setState({table_names:parsedData,pickerlabel: ''}) 
          }
    }
    handlePress =({navigation})=>{
        this.props.navigation.navigate('DrawerOpen',{login_user:this.props.navigation.state.params.login_user,auth_token:this.props.navigation.state.params.auth_token})
    }
    // getting Alert message before even pressing select button TO RESOLVE
handleSelect = async ()=>{
    //this.setState({...this.state,isLoading:true});
    let pickerValue = this.state.pickerlabel
    if (pickerValue === 0)
        {
            Alert.alert("Please select a value!")
        }
    else
    {     
    let resp = await getColData(this.state.pickerlabel,this.state.auth_token);
    if(resp.status !== 200){
        if (resp.status === 504) {
          Alert.alert("Network Error", "Check your internet connection" )
        } else {
          Alert.alert("Error", "Data not available")      
        }
      } else {
        console.log("Response is: " + resp._bodyText);
         let parsedData = JSON.parse(resp._bodyText);
         var emptyList = []
        this.setState({cols_of_sel_tab:parsedData})
        this.setState({thisrowData: emptyList,rowData:emptyList})
        console.log("HI HI")
        let thisrowData = this.state.thisrowData
        this.state.cols_of_sel_tab.map(
            col_of_sel=> col_of_sel.table_cols.map(
                cols=>(thisrowData.push(''))  
            )
        )
        console.log("Initial rowData"+ "1. "+ this.state.rowData)
        this.setState({isLoading:false,thisrowData:thisrowData});
      }
    }
}
    handleInsertIntoArray = (key,text) =>{
       console.log("Key" + key + "Text" + text)
       let newData = this.state.thisrowData
       newData.splice(key,1,text)
        this.setState({thisrowData:newData})
        console.log(this.state.thisrowData)
    }
    handleInsertData = async()=>{ 
        let resp = await getRowData(this.state.pickerlabel,this.state.auth_token)
        if(resp.status !== 200){
            if (resp.status === 504) {
              Alert.alert("Network Error", "Check your internet connection" )
            } else {
              Alert.alert("Error", "Error")      
            }
          } else {
            let parsedData = JSON.parse(resp._bodyText);
             this.setState({rowData:parsedData})
            if((this.state.rowData.length) <= 0)
            {
                let thisrowData = this.state.thisrowData
                JSON.stringify(thisrowData)
                this.setState({rowData:thisrowData})
            }
            else
            {
                     //push thisrowData to row Data
            let newData = this.state.rowData[0].row_Data
            //try rejectig null values //DONE
           let bool =  this.state.thisrowData.map(
                (r) => {
                    console.log(r)
                    if(r === ''){
                        return true
                    }
                    else{return false}
                }
            )
            console.log(bool[0])
            if((bool[0].valueOf() === true)  || (this.state.thisrowData.length <= 0))
            {
                Alert.alert("Please select a table and insert valid data!")
            }
            else{
            newData.push(this.state.thisrowData)
            this.setState({
                rowData:newData
            })
                }
            }
            resp = await postData(this.state.pickerlabel,this.state.rowData,this.state.auth_token)
            if(resp.status !== 200){
                if (resp.status === 504) {
                  Alert.alert("Network Error", "Check your internet connection" )
                } else {
                  Alert.alert("Error", "Failed to Insert Data")      
                }
              } else {
                    Alert.alert("One row affected")
                    let resp = await triggerZap(this.state.pickerlabel)
                if(resp.status !== 200){
                if (resp.status === 504) {
                  Alert.alert("Network Error", "Check your internet connection" )
                } else {
                  Alert.alert("Error", "Zap error!")      
                }
              } else 
              {
                Alert.alert("Data Saved and Zap triggered!")
                }
                  this.setState({isDataInserted:true})
                  this.setState({buttonText: 'Insert Again'})
              }
           }
    }
handleLogout = ()    =>
{
    this.props.navigation.navigate('loginScreen')
}
    render(){
        const {params}  = this.props.navigation.state
        const login_user = params ? params.login_user : null
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
                    <Title> Welcome {login_user} </Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.handleLogout}><Text>Logout</Text></Button>
                    </Right>
                </Header>
                <Content style={{margin:20}}>
                <Picker
                    selectedValue={this.state.pickerlabel}
                    onValueChange={(itemValue, itemIndex) => this.setState({pickerlabel:itemValue})}>
                    <Picker.Item label="Please select the table" value="0"/>
                    
                    {   this.state.table_names.map((table, key)=>(
                            <Picker.Item label={table.table_name} value={table.table_name} key={key}/>)
                        )
                    }
                  
                </Picker>
                
                <Button style={{alignSelf:'center'}}onPress={this.handleSelect}><Text> Select </Text></Button>
                 {/* <Text style={{ flex: 1, justifyContent: 'center',  alignContent: 'center', alignSelf:'center'}}>{this.state.pickerlabel}</Text> */}
                    {  
                    this.state.cols_of_sel_tab.map(
                    (col_of_sel) =>( col_of_sel.table_cols.map(
                        (cols,key) => (
                            //console.log("HI I AM HERE" + this.state.thisrowData),
                         this.state.thisrowData.map(
                         (val,id)=>{
                             console.log("In loop " + id + "Key " + key)
                                 if (key === id){
                                 return <Input key={id} style={{borderBottomWidth:2,borderBottomColor:'black'}} placeholder={cols} value={val} onChangeText={(text)=>this.handleInsertIntoArray(key,text)}/>;
                                 }
                                 }))                   
                                ) 
                            ))
            }
             <Button style={{alignSelf:'center'}} onPress={this.handleInsertData}> 
                <Text>{this.state.buttonText}</Text></Button> 
                </Content>
            </Container>
        );
    }
}
    }
} 

