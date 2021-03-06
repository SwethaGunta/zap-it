const clusterName = "bungalow55"

const dataUrl = "https://data." + clusterName + ".hasura-app.io/v1/query";
const loginUrl = "https://auth." + clusterName + ".hasura-app.io/v1/login";
const signupUrl = "https://auth." + clusterName + ".hasura-app.io/v1/signup";
const zapUrl = "https://app." + clusterName + ".hasura-app.io/CreateRow";

import { Alert } from 'react-native';

const networkErrorObj = {
  status: 503
}

export async function tryLogin(username, password) {
    console.log('Making login query');
    let requestOptions = {
      "method": "POST",
      "headers":{
        "Content-Type":"application/json"
      }
    };
  
    let body = {
      "provider":"username",
      "data": {
        "username": username,
        "password": password
      }
    };
  
    requestOptions["body"] = JSON.stringify(body);
  
    console.log("Auth Response ---------------------");
    
    try {
      let resp = await fetch(loginUrl, requestOptions);
      console.log(resp);
      return resp; 
    }
    catch(e) {
      console.log("Request Failed: " + e);
      return networkErrorObj;
    }
  }
  
  export async function displayTables(){
    console.log('Making Data query');
    let requestOptions = {
      "method": "POST",
      "headers": {
        "Content-Type":"application/json",
         "Authorization":"Bearer f2612f90394e9b2c22c8fdf3d857c0da3ee26d955bf42da2",
         "X-Hasura-Role":"admin"
      }
    };

    let body = {
      "type": "select",
      "args": {
          "table": "Tables",
          "columns": [
              "table_name"
          ]
      }
  };
  
    requestOptions["body"] = JSON.stringify(body);
  
    console.log("Data Response ---------------------");
    
    try {
      console.log("Request Options Headers are: "+ requestOptions.headers.Authorization);
      console.log("Request Options Body are: "+ requestOptions.body);
      let resp = await fetch(dataUrl, requestOptions);
      console.log(resp);
      return resp; 
    }
    catch(e) {
      console.log("Request Failed: " + e);
      return networkErrorObj;
    }
  }


  export async function getColData(tableName){
    console.log('Making Data query for Select');
    let requestOptions = {
      "method": "POST",
      "headers": {
        "Content-Type":"application/json",
    "Authorization":"Bearer f2612f90394e9b2c22c8fdf3d857c0da3ee26d955bf42da2",
         "X-Hasura-Role":"admin"
      }
    };
    let body = {
      "type": "select",
      "args": {
          "table": "Tables",
          "columns": [
              "table_cols"
          ],
          "where": {
              "table_name": {
                  "$eq": tableName
              }
          }
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  
  console.log("Data Response from Select ---------------------");
  
  try {
    console.log("Request Options Headers are: "+ requestOptions.headers.Authorization);
    console.log("Request Options Body are: "+ requestOptions.body);
    let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
    return resp; 
  }
  catch(e) {
    console.log("Request Failed: " + e);
    return networkErrorObj;
  }
  }
 
  export async function getRowData(tableName){
    console.log('Making Data query for Select');
    let requestOptions = {
      "method": "POST",
      "headers": {
        "Content-Type":"application/json",
        "Authorization":"Bearer f2612f90394e9b2c22c8fdf3d857c0da3ee26d955bf42da2",
          "X-Hasura-Role":"admin"    
      }
    };
    let body = {
      "type": "select",
      "args": {
          "table": "Data",
          "columns": [
              "row_Data"
          ],
          "where": {
              "table_name": {
                  "$eq": tableName
              }
          }
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log("Data Response from Select ---------------------");
  
  try {
    console.log("Request Options Headers are: "+ requestOptions.headers.Authorization);
    console.log("Request Options Body are: "+ requestOptions.body);
    let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
    return resp; 
  }
  catch(e) {
    console.log("Request Failed: " + e);
    return networkErrorObj;
  }
  }
 

  export async function postData(tableName, rowData)
  {

    console.log('Making Data query for Insert');
    let requestOptions = {
      "method": "POST",
      "headers": {
        "Content-Type":"application/json",
      "Authorization":"Bearer f2612f90394e9b2c22c8fdf3d857c0da3ee26d955bf42da2",
          "X-Hasura-Role": "admin"
        
      }
    };
    let body = {
      "type": "insert",
      "args": {
          "table": "Data",
          "objects": [
              {
                  "table_name": tableName,
                  "row_Data": rowData
              }
          ],
          "on_conflict": {
              "action": "update",
              "constraint_on": [
                  "table_name"
              ]
          }
      }
  };

  requestOptions["body"] = JSON.stringify(body);
  console.log("Data Response from Insert -----------------------");
  try {
    console.log("Request Options Headers are: "+ requestOptions.headers.Authorization);
    console.log("Request Options Body are: "+ requestOptions.body);
    let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
    return resp; 
  }
  catch(e) {
    console.log("Request Failed: " + e);
    return networkErrorObj;
  }
  }

  export async function deleteTable(tableName)
  {
    console.log('Making Data query for Delete');
    let requestOptions = {
      "method": "POST",
      "headers": {
        "Content-Type":"application/json",
        "Authorization":"Bearer f2612f90394e9b2c22c8fdf3d857c0da3ee26d955bf42da2",
          "X-Hasura-Role": "admin"
      }
    };
    let body = {
      "type": "bulk",
      "args": [
          {
              "type": "delete",
              "args": {
                  "table": "Data",
                  "where": {
                      "table_name": {
                          "$eq": tableName
                      }
                  }
              }
          },
          {
              "type": "delete",
              "args": {
                  "table": "Tables",
                  "where": {
                      "table_name": {
                          "$eq": tableName
                      }
                  }
              }
          }
      ]
  }
  requestOptions["body"] = JSON.stringify(body);
  console.log("Data Response from Delete -----------------------");
  try {
    console.log("Request Options Headers are: "+ requestOptions.headers.Authorization);
    console.log("Request Options Body are: "+ requestOptions.body);
    let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
    return resp; 
  }
  catch(e) {
    console.log("Request Failed: " + e);
    return networkErrorObj;
  }
  }

  
  export async function createTable(tableName, tableCols)
  {
    console.log('Making Data query for Create');
    let requestOptions = {
      "method": "POST",
      "headers": {
        "Content-Type":"application/json",
        "Authorization":"Bearer f2612f90394e9b2c22c8fdf3d857c0da3ee26d955bf42da2",
          "X-Hasura-Role": "admin"
      }
    };
    let body = {
      "type": "insert",
      "args": {
          "table": "Tables",
          "objects": [
              {
                  "table_name": tableName,
                  "table_cols": tableCols
              }
          ],
          "on_conflict": {
              "action": "update",
              "constraint_on": [
                  "table_name"
              ]
          }
      }
  }
  requestOptions["body"] = JSON.stringify(body);
  console.log("Data Response from Create -----------------------");
  try {
    console.log("Request Options Headers are: "+ requestOptions.headers.Authorization);
    console.log("Request Options Body are: "+ requestOptions.body);
    let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
    return resp; 
  }
  catch(e) {
    console.log("Request Failed: " + e);
    return networkErrorObj;
  }
  }

  export async function triggerZap(tableName)
  {
  
    console.log('Sending Details to Zap');
    var body = JSON.stringify({
      "id": "5",
      "name": tableName,
      "created_on": "27/01/2018",
      "modified_on": "03/03/2018",
      "desc": "Modified table "+ tableName
         });

    var requestOptions = {
      "method": "PUT",
      "headers": {
        "Content-Type":"application/json",
        "Content-Length": 200,
         },
         "body": body
    }
    //requestOptions["body"] = JSON.stringify(body); 
  console.log(requestOptions.body)
  console.log("Data Response from Zap -----------------------");
  try {
    let resp = await fetch(zapUrl, requestOptions);
    console.log(resp);
    return resp; 
  }
  catch(e) {
    console.log("Request Failed: " + e);
    return networkErrorObj;
  }
  }

  export async function registerUser(userName,password,emailId)
  {
    console.log('Making Data query for Register');
    let requestOptions = {
      "method": "POST",
      "headers": {
        "Content-Type":"application/json",
        "X-Hasura-Role": "user"   
      }
    };
    let body = {
      "provider": "username",
      "data": {
          "username": userName,
          "password": password,
          "email": emailId
      }
  }
  requestOptions["body"] = JSON.stringify(body);
  console.log("Data Response from Register -----------------------");
  try {
    console.log("Request Options Headers are: "+ requestOptions.headers.Authorization);
    console.log("Request Options Body are: "+ requestOptions.body);
    let resp = await fetch(signupUrl, requestOptions);
    console.log(resp);
    return resp; 
  }
  catch(e) {
    console.log("Request Failed: " + e);
    return networkErrorObj;
  }
  }