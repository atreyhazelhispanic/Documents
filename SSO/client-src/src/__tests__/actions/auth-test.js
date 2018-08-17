import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/auth'
import * as types from '../../actions/types';

import fetchMock from 'fetch-mock'

import expect from 'expect' // You can use any testing library
import {enableTest, getProfile} from '../../utils/apiUtils';
import PCUser from '../../utils/PCUser';
import useradmin from '../../utils/fakes/useradmin';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const testExpiryTime = Buffer.from(Math.floor(addDays(new Date(), 1).getTime() / 1000).toString()).toString("base64")


let localState = {};

global.localStorage = {
        setItem: function(key, data){ return localState[key] = data; },
        getItem: function(key){ 
           if(key === 'token_expiry') return JSON.stringify(testExpiryTime);
           if(key === 'profile') return JSON.stringify(useradmin);
          throw('unexpected key:'+key);
        },
        removeItem: function() {}
};

global.window = {
    location: {
        href: "",
        replace: () => {}
    }
}


describe('Authentication Tests',   () => {
  beforeEach(() => {
    enableTest();
    localState = {}
  })
  afterEach(() => {
    fetchMock.reset()
  })


      it('Gets a login URL', () => {
        
            fetchMock.mock('glob:http://*/loginurl?redirect_url=*', JSON.stringify("http://login_url"))

            const expectedActions = [
              { type: types.GET_LOGIN_URL_REQUEST, gettingLoginUrl: true },
              { type: types.GET_LOGIN_URL_SUCCESS,  loginUrl: "http://login_url", gettingLoginUrl: false }
            ]
            const store = mockStore({});
               store.dispatch(actions.getLoginUrl()).then(function(){
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions) 
              });
               
        
          });


      it.only('Logs out', () => {

         fetchMock.mock('glob:http://*/logout', JSON.stringify("{}"));
              const expectedActions = [ { type: 'LOGOUT_REQUEST', loggingOut: true, error: null },
                                           { type: 'CHECK_TOKEN', expired: false },
                                           { type: 'LOGOUT_SUCCESS', user: null, loggingOut: false, error: null }
                                           ]
              ;

              const store = mockStore({});
              store.dispatch(actions.logout("abcd")).then(function(){
                  // return of async actions
                  expect(store.getActions()).toEqual(expectedActions)
              });

          })
      it('Goes home', () => {
          const store = mockStore({});



          const expectedActions = [
            {
              type: types.GO_HOME
            }
          ]

          store.dispatch(actions.goHome());
          expect(store.getActions()).toEqual(expectedActions);


      });

        
});