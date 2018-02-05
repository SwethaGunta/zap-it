const clusterName = "anther74"
const integratedclusterName = "catercorner16"

const dataUrl = "https://data." + clusterName + ".hasura-app.io/v1/query";
const loginUrl = "https://auth." + clusterName + ".hasura-app.io/v1/login";
const signupUrl = "https://auth." + clusterName + ".hasura-app.io/v1/signup";
const zapUrl = "https://app." + integratedclusterName + "hasura-aap.io/CreateRow";

import { Alert } from 'react-native';

const networkErrorObj = {
  status: 503
}

export async function tryLogin(username, password) {
    console.log('Making login query');
    let requestOptions = {
      "method": "POST",
      "headers":{
        "Content-Type":"application/json",
        "Authorization": "9262f29bc0e776142fffd496e091f6575cb92483013875ce"
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
        "Authorization":"Bearer 9262f29bc0e776142fffd496e091f6575cb92483013875ce",
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
        "Authorization":"Bearer 9262f29bc0e776142fffd496e091f6575cb92483013875ce",
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
        "Authorization":"Bearer 9262f29bc0e776142fffd496e091f6575cb92483013875ce",
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
        "Authorization":"Bearer 9262f29bc0e776142fffd496e091f6575cb92483013875ce",
        "X-Hasura-Role":"admin"    
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
        "Authorization":"Bearer 9262f29bc0e776142fffd496e091f6575cb92483013875ce",
        "X-Hasura-Role":"admin"    
      }
    };
    let body = {
      "type": "delete",
      "args": {
          "table": "Tables",
          "where": {
              "table_name": {
                  "$eq": tableName
              }
          }
      }
  };
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

  
  export async function createTable(tableName)
  {
    console.log('Making Data query for Create');
    let requestOptions = {
      "method": "POST",
      "headers": {
        "Content-Type":"application/json",
        "Authorization":"Bearer 9262f29bc0e776142fffd496e091f6575cb92483013875ce",
        "X-Hasura-Role":"admin"    
      }
    };
    let body = 
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
    let requestOptions = {
      "method": "POST",
      "headers": {
        "Content-Type":"application/json"
        }
    };
    let body = {
      "type": "insert",
      "args": {
          "table": "Global Tables",
          "objects": [
              {
                  "table_name": "Global Tables",
                  "row_Data": {"id": "",
                  "name": "",
                  "created_on": "",
                  "modified_on": "",
                  "desc":   ""     }
              }
          ]
      }
  };


  requestOptions["body"] = JSON.stringify(body);
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