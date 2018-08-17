import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../actions/suppliers';
import * as types from '../../actions/types';

import fetchMock from 'fetch-mock'

import expect from 'expect' // You can use any testing library
import {enableTest, getProfile} from '../../utils/apiUtils';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


let localState = {};

const history = {
    push: () => {}
};
describe('Suppliers Actions',   () => {
  beforeEach(() => {
    enableTest();

  })
  afterEach(() => {
    fetchMock.reset()
  })



            it('Sets report parameters', () => {
            
                const parm = "field";
                const value = "fieldValue";
               
     
                 const expectedActions = [
                   { 
                     type: types.SET_REPORTS_PARAMS,  
                     query: { 'field' : 'fieldValue' }
                   }
                 ]
 
     
                 const store = mockStore({ suppliers: { query: null }});
                 
                 store.dispatch(actions.setReportParameters(parm, value));
                 // return of async actions
                 expect(store.getActions()).toEqual(expectedActions) 
     
            });

            it('Sets partner number', ()=> {
                const supplierId = "12345";

     
                 const expectedActions = [
                   { 
                     type: types.SET_SUPPLIER_ID,  
                     viewSupplierId: "12345"
                   }
                 ]
 
     
                 const store = mockStore({ });
                 
                 store.dispatch(actions.setPartnerNumber(supplierId));
                 // return of async actions
                 expect(store.getActions()).toEqual(expectedActions) 
     
            })

        
});