const clusterName = "bleed71"

const dataUrl = "https://data." + clusterName + ".hasura-app.io/v1/query";
const loginUrl = "https://auth." + clusterName + ".hasura-app.io/v1/login";
const signupUrl = "https://auth." + clusterName + ".hasura-app.io/v1/signup";

import { Alert } from 'react-native';

const networkErrorObj = {
  status: 503
}

export async function trySignup(username, password) {
  console.log('Making signup query');
  let requestOptions = {
    "method": "POST",
    "headers": {
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
    let resp = await fetch(signupUrl, requestOptions);
    console.log(resp);
    return resp; 
  }
  catch(e) {
    console.log("Request Failed: " + e);
    return networkErrorObj;
  }
}

export async function tryLogin(username, password) {
  console.log('Making login query');
  let requestOptions = {
    "method": "POST",
    "headers": {
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





