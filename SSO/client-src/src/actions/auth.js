
import { getConfig } from '../utils/apiUtils';
import * as types from './types';

import {
  callApi,
  //ID_TOKEN,
  //loadIdToken,
  setIdToken,
  removeIdToken,
  //decodeUserProfile,
  defaultHeaders,
  getProfile,
  //loadUserProfile
} from "../utils/apiUtils";



export const REDIRECT_TO_AUTHENTICATION = "REDIRECT_TO_AUTHENTICATION";

function getLoginUrlRequest() {
  return {
    type: types.GET_LOGIN_URL_REQUEST,
    gettingLoginUrl: true
  }
}

 export  function  getLoginUrl() {

       const apiConfig = global.Environment;

        const authUrl = apiConfig.baseUrl + '/vendor/auth';
        const redirectUrl = apiConfig.authRedirectUrl;

        const config = {};
        config.method = 'GET';

        function success(urlData){
          return {
            type: types.GET_LOGIN_URL_SUCCESS,
            loginUrl: urlData,
            gettingLoginUrl: false
          }
        }
        function err(e){
          return {
            type: types.GET_LOGIN_URL_FAILURE,
            error: e,
            gettingLoginUrl: false
          }
        }
        var checkLoginUrl = `${authUrl}/loginurl?redirect_url=${redirectUrl}`;

        return callApi(checkLoginUrl, config, getLoginUrlRequest(), success, err, true);


 }

export function goHome(history) {
    return (dispatch, state) => {

        window.location.replace('/#/');

        return dispatch({
            type: types.GO_HOME
        });
    }


}

function exchangeSuccess(payload) {
    return (dispatch) => {
        try {

            setIdToken(payload);


        }catch(e){
            console.log('failing to setIdToken', e)
            return loginFailure(e);
        }

        const profile = getProfile();

        if(profile && profile.sub) {

            dispatch({
                type: types.KEY_EXCHANGE_SUCCESS,
                user: profile
            });

            window.location.replace('/#/');

        }else{
            return loginFailure("Access to this application cannot be granted at this time. Please contact support or try logging in at a later time.");
        }
    }


  }



function loginFailure(error) {
  removeIdToken();


}

function exchangeRequest() {
    return (dispatch) => {
        return dispatch({
            type: types.KEY_EXCHANGE_REQUEST
        });
    }

}
function exchangeError(error) {
    return (dispatch) => {

        return dispatch({
            type: types.KEY_EXCHANGE_FAILURE,
            user: null,
            roles: []
        })

    }

}

function exchangeCodeForJwt(code, authstate) {
    const apiConfig = global.Environment;
    const redirectUrl = apiConfig.authRedirectUrl;
    const config = { 'content-type': 'text/plain' };
    const authUrl = apiConfig.baseUrl + '/vendor/auth';

    //console.log(`AUTH URL => ${authUrl}/tokens?code=${code}&state=${authstate}&redirectUri=${redirectUrl}`);

    config.method = 'POST';

    return callApi(`${authUrl}/tokens?code=${code}&state=${authstate}&redirectUri=${redirectUrl}`, config, exchangeRequest(), exchangeSuccess, exchangeError, true);

}

export function exchangeCodeAndState(code, authstate) {

    return exchangeCodeForJwt(code, authstate);

}

export function getLogoutUrl() {

/*
          const apiConfig = global.Environment;


          const authUrl = apiConfig.baseUrl + '/vendor/auth';
          const redirectUrl = apiConfig.authRedirectUrl;

          const config = {}
          config.method = 'GET'

          var checkLogoutUrl = `${authUrl}/logouturl?redirect_url=${redirectUrl}`;
          function success(urlData){

            return {
              type: types.GET_LOGOUT_URL_SUCCESS,
              logoutUrl: urlData
            }
          }
          function err(e){
            console.log('error logging out from ', checkLogoutUrl);
            return {
              type: types.GET_LOGOUT_URL_FAILURE,
              logoutUrl: null,
              error: e
            }
          }

          return callApi(checkLogoutUrl, config, function(){}, success, err, true);

    */

}

export function logout(accessToken) {
    return (dispatch) => {
        const apiConfig = global.Environment;

        const logoutUrl = `${apiConfig.baseUrl}/vendor/auth/logout`;
        const config = {
            headers: {
                'accessToken' : accessToken
            }

        };
        config.method = 'GET';
        const req = function(){
            return {
                type: types.LOGOUT_REQUEST,
                loggingOut: true,
                error: null
            }
        }
        const success = function(){

            removeIdToken();

            return {
                type: types.LOGOUT_SUCCESS,
                user: null,
                loggingOut: false,
                error: null
            }
        };
        const failure = function(err){
            return {
                type: types.LOGOUT_FAILURE,
                loggingOut: false,
                error: err
            }

        };
        dispatch(req());
        return dispatch(callApi(logoutUrl, config, function(){}, success, failure ));






    }

}
