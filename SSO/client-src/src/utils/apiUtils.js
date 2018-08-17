import { detect } from 'detect-browser';

import "isomorphic-fetch";

import jwt_decode from "jwt-decode";
import uuid from 'uuid';
import current from '../../../../../../../../SSO/okta/okta-react/vendor-portal-app-master/client-src/src/configuration/current';
import PCUser from "../../../../../../SSO/okta/okta-react/vendor-portal-app-master/client-src/src/utils/PCUser";
import localTest from '../../../../../../../../SSO/okta/okta-react/vendor-portal-app-master/client-src/src/configuration/localTest';
import moment from 'moment';
import * as _ from 'lodash';

var testOnly = false;

export function checkStatus(response) {

  if (!response.ok) {

    // (response.status < 200 || response.status > 300)
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

export function enableTest(){
    global.Environment = localTest;
}

export function parseJSON(response) {
  return response.json();
}
//Default, non-authenticated token.
export function defaultHeaders() {
  const h = {
    
      "accept": "application/json",
      "content-type": "application/json",
      "source": "vendor-portal-web",
      "correlationId": uuid.v4()
  }
  return h;
};

const checkCurrentUserToken = () => {
    return (dispatch) => {

        const profile = loadUserProfile();


        return dispatch({
            type: "CHECK_TOKEN",
            expired: !profile // loadUserProfile() returns false if the token has expired,
            // or null if no token has been set.
        });
    };

}

//Headers including the authentication token.
export function headers() {
    const h = defaultHeaders();
    h.Authorization = 'Bearer '+loadIdToken();
    return h;
}

  function handleEdge(){
    const browser = detect();

    if(browser && browser.name == "edge") {

      delete window.fetch;
      //console.log('wiping fetch, loading polyfill');
      window.fetch = require("isomorphic-fetch");  
    }

  }

export function downloadFromApi( filename, url,
  config,
  request,
  onRequestSuccess,
  onRequestFailure) {
  return dispatch => {

    dispatch(checkCurrentUserToken());
    
    dispatch(request);
    config.timeout = 300000; // 5 minutes, TODO: Review this value. Should this fetch be timed out sooner?
    //console.log('downloadFromApi', url, config);
    handleEdge();

    return fetch(url, config)
      .then(checkStatus)
       .then(response => response.blob())
        .then(blob => {
          //console.log('fetch', 'blob received');
            if(blob.size !== 0) {
              var url = window.URL.createObjectURL(blob);
             // console.log('blob length', blob.length);
  
              var a = document.createElement('a');
              a.href = url;
              a.download = filename;
              const browser = detect();
     
              switch(browser && browser.name)
              {
                case 'edge':
                case 'ie': {
                  window.navigator.msSaveOrOpenBlob(blob, filename);
                }
                break;
                default: {
                      if (document.createEvent) {
                        var e = document.createEvent('MouseEvents');
                        e.initEvent('click', true, true);
                        a.dispatchEvent(e);
                      }  
                } 
                break;
  
              }
  
  
              dispatch(onRequestSuccess());    
            }else{
              const err = {};
              err.status = 404;
              err.statusText = "Empty document";
              err.message  = "Document contained no data";
              dispatch(onRequestFailure(err));
            }
            
        })
      .catch(error => {
        console.error('fetch', 'error path', JSON.stringify(error) );
        

        const response = error.response;
        if (response === undefined) {
          if(error.message === 'Failed to fetch'){
            error.message = 'Server is not responding.';
          }
          dispatch(onRequestFailure(error));
        } else {
          error.status = response.status;
          error.statusText = response.statusText;
          if(error.status === 500) {
            error.message = 'Internal Server Error';
            dispatch(onRequestFailure(error));
          }else{
            response.text().then(text => {
              try {
                const json = JSON.parse(text);
           
                error.message = json.message ;
              } catch (ex) {
                error.message = text;
              }
              dispatch(onRequestFailure(error));
            });
          }

        }
      });
  };
}


/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param config The config object of the call. Can be null.
 * @param request The request action.
 * @param onRequestSuccess The callback function to create request success action.
 *                 The function expects response json payload as its argument.
 * @param onRequestFailure The callback function to create request failure action.
 *                 The function expects error as its argument.
 * @param skipAuthentication Flag to disable the verification that the user's token isn't expired.
 */
export function callApi(
  url,
  config,
  request,
  onRequestSuccess,
  onRequestFailure,
  skipAuthentication
) {
  return dispatch => {

      if(skipAuthentication !== true) {
          dispatch(checkCurrentUserToken());
      }
      if(!config) {
        throw new Error("config is required to callApi");
      }
      if(!config.headers) {
          config.headers = {};
      }

      //lodash's _.defaults function will assign undefined values from the provided key-value pair.
      // Thus, if the option is already set it remains unchanged, otherwise it's assigned here.
      // https://lodash.com/docs/4.17.5#defaults
      _.defaults(config.headers, defaultHeaders());


      dispatch(request);

    handleEdge();
    return fetch(url, config)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {

        dispatch(onRequestSuccess(json));
      })
      .catch(error => {

        const response = error.response;
        if (response === undefined) {
          if(error.message === `Failed to fetch ${url}`){
            error.message = 'Server is not responding.';
           // console.log('no response')
          }

          //console.log(error);
          dispatch(onRequestFailure(error));
        } else {

          error.status = response.status;
          error.statusText = response.statusText;
          response.text().then(text => {
            try {
              const json = JSON.parse(text);
              error.message = json.message;
            } catch (ex) {
              error.message = text;
            }
            dispatch(onRequestFailure(error));
          });
          console.log('error')

        }
      });
  };
}

export const ID_TOKEN = "token";

export function setIdToken(loginInfo) {

    if(!loginInfo.accessToken){
        throw(new Error('cannot setIdToken when accessToken is not set'));
    }

    let token = loginInfo.accessToken.split(' ')[1];

  const accessToken = loginInfo.accessToken;
  const profile = loginInfo;
  profile.accessToken = token;
  profile.isNordstromEmployee = loginInfo.isNordstromEmployee;

  const expiresInSeconds = parseInt(loginInfo.expiryTime);

    const expiry =  moment().add(expiresInSeconds, 'seconds').valueOf();
    loginInfo.expires = expiry;


    global.localStorage.setItem(ID_TOKEN, token);

    global.localStorage.setItem("token_expiry", JSON.stringify(expiry));
    global.localStorage.setItem("profile", JSON.stringify(profile));

}
var VendorPortalConfig = current;

export async function getConfig(){
        if(testOnly) {
          window.Environment = localTest;
          return await localTest;
        }else{
          return await fetch("/api/environment")
          .then(response => { return response.json()})
          .then(json => {
  
              window.Environment = json;
              return json;
  
          }).catch(function(){
           
              //console.log('unable to retrieve environment details from API, setting to default local settings');
              //console.log('Current Environment Fallback details', current)
              window.Environment = current;
              return current;
          });
        }
}

export function removeIdToken() {
    global.localStorage.removeItem(ID_TOKEN);
    global.localStorage.removeItem("token_expiry");
    global.localStorage.removeItem("profile");
  
}

export function loadIdToken() {
  return global.localStorage.getItem(ID_TOKEN);
}
export function getProfile(){
    return loadUserProfile();
}
export function decodeUserProfile(idToken) {
      return loadIdToken();
}

const toDateFromEpoch = function(epochSeconds){

    const now = new Date(); 
    //we create an epoch date
    const newTime = new Date(0);
    //and just add the seconds
    newTime.setUTCSeconds(epochSeconds);
    return newTime;
}

const getTokenExpiry = function(){
    try{

      const token_expiry = global.localStorage.getItem("token_expiry");
      if(!token_expiry) return null;

      //token_expiry contains the number of epoch seconds to get the expiration time.
      const  expiry = parseInt(JSON.parse(token_expiry));
      return new Date(expiry);
    }
    catch(err){
      // console.log(err);
      return null;
    }
}

export const isTokenExpired = function(){
    const expiry = getTokenExpiry();

    if(!expiry){
      removeIdToken();

      return false;
    }
    
    const now = new Date();
    
    if ( now >= expiry) {

      removeIdToken();

      return true;
    }
 //   console.log(`${now} < ${expiry}`);
    return false;
}

export function loadUserProfile() {
  try {

    if(isTokenExpired())
    {
      return false;
    }
    const nuser = JSON.parse(global.localStorage.getItem("profile"));

    if(nuser){

        return new PCUser(nuser);
    }else{

        return false;
    }



  } catch (e) {

  }
}

