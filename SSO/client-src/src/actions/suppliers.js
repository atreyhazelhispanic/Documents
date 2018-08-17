import { callApi, headers, downloadFromApi, getConfig } from "../utils/apiUtils";

import _ from 'lodash';
import * as types from './types';
import current from '../configuration/current';
import moment from 'moment';

function suppliersRequest() {
    
    return {
        type: types.SUPPLIERS_REQUEST
    }
}

function suppliersSuccess(payload) {

    
    return (dispatch) =>
    dispatch({
      type: types.SUPPLIERS_SUCCESS,
      suppliers: payload.suppliers
    });
  
}


function suppliersFailure(error) {

    return {
      type: types.SUPPLIERS_FAILURE,
      suppliers : [],
      error,
      loading: false
    };

}


function getReportRequest(report) {
  report.loading = true;

  return {
    type: types.GET_REPORT_REQUEST,
    query: null,
    success: false,
    report: report
  };
}

function getReportSuccess(data, report) {
  return {
    type: types.GET_REPORT_SUCCESS,
    success: true,
    report: report
  };
}
function getReportError(e, report) {
  report.loading = false;

  return {
    type: types.GET_REPORT_ERROR,
    success: false,
    error: e.message,
    report
  };
}
export function getReport(query, supplierId, departmentId, report) {

    return dispatch => { 
      
        const frag = report.urlFragment+'.'+query.fileType;
        const apiConfig = window.Environment;

        var url = `${apiConfig.reportApiUrl}${frag}?supplierId=${supplierId}&departmentId=${departmentId}&numberOfWeeks=${query.weeks}`;
            if(query.regions) {
              var qry = "&regions="
              _.each(query.regions, function(r, i){
                  qry += r;
                  if(i !== (query.regions.length - 1))
                  {
                      qry += ',';
                  }

                  
              });
              url += qry;
            }
        
               if(query.vpns) {
                 var qry = "&vpns=";
                 _.each(query.vpns, function(r, i){
                   qry += r;
                   if(i !== (query.vpns.length -1))
                   {
                     qry += ',';
                   }
                 });
                 url += qry;
               }
            var baseName = frag.split('/')[2].split('?')[0];
            var fileExt = baseName.split('.')[1];
            baseName = baseName.split('.')[0];

            // Example: SalesAndInventoryByDeptLocations_103_2017-10-17_19.56.51.pdf
            const dateName = moment().format("YYYY-MM-DD_HH.mm.ss") ;
            const fileName = `${baseName}_${departmentId}_${dateName}.${fileExt}`;

               var h = headers();
               h['Content-Type'] = 'application/x-www-form-urlencoded';
               delete h['Accept'];

            const config = {
              method: "GET",
              headers: h
            };
            
            dispatch(getReportRequest(report));
            
            var success = function(data){
              return getReportSuccess(data, report);
            }
            var err = function(e) {
            
              return getReportError(e, report)
            }
           return dispatch(downloadFromApi(
              fileName,
              url,
              config,
              function(){},
              success,
              err
            ));

    };
};

export function setSupplier(supplier, user) {

  return (dispatch, state) => {


        if(user.canAccessSupplier(supplier.id))
        {
            const current = { id: supplier.id, name: supplier.name  };

            return dispatch({
                type: types.SET_SUPPLIER,
                current
            });

        }
    }
}

export function setReportParameters(parm, value) {

    return (dispatch, state) =>  {
      const s = state();
      const q = s.suppliers.query||{};
      q[parm] = value;
      dispatch({
          type: types.SET_REPORTS_PARAMS,
          query: q
        });
    };
};

export function setPartnerNumber(supplierId) {
  return {
    type: types.SET_SUPPLIER_ID,
    viewSupplierId: supplierId
  }
}

//Retrieves the list of suppliers for the currently logged-in user.
export  function getSuppliers(supplierIds) {

    return (dispatch) => {
      getConfig().then(function(){
 
        const apiConfig = window.Environment;

         const supplierLookups = {
              supplierIds: supplierIds
         }
 
         const config = {
           method: "post",
           headers: headers(),
           body: JSON.stringify(supplierLookups)
         };
 
 
 
         var url = `${apiConfig.appUrl}/api/supplierInfo`;
         dispatch(suppliersRequest());

         return dispatch(callApi(
           url,
           config,
           suppliersRequest,
           suppliersSuccess,
           suppliersFailure
         ));
      })
    }

}

const singleSupplierRequest = () => {
    return {
        type: types.SINGLE_SUPPLIER_REQUEST
    }
};

const singleSupplierSuccess = (payload) => {
    const { suppliers } = payload;

    return {
        type: types.SINGLE_SUPPLIER_SUCCESS,
        payload: suppliers[0]
    }
};

const singleSupplierFailure = (error) => {
    return {
        type: types.SINGLE_SUPPLIER_FAILURE,
        payload: error
    }
};

export const clearSingleSupplier = () => {
    return {
        type: types.SINGLE_SUPPLIER_CLEAR
    }
};

export const getSingleSupplier = ({ supplierId, user }) => {
    return (dispatch) => {

        if(!user.canAccessSupplier(supplierId))
        {
                return dispatch(singleSupplierFailure(
                                new Error("user attempted to access a supplier to which they are not associated")));

        }

        getConfig().then(function(){

            const apiConfig = window.Environment;

            const supplierLookups = {
                supplierIds: [ supplierId ]
            }

            const config = {
                method: "post",
                headers: headers(),
                body: JSON.stringify(supplierLookups)
            };



            var url = `${apiConfig.appUrl}/api/supplierInfo`;
            dispatch(singleSupplierRequest());

            return dispatch(callApi(
                url,
                config,
                singleSupplierRequest,
                singleSupplierSuccess,
                singleSupplierFailure
            ));
        })
    }
};
