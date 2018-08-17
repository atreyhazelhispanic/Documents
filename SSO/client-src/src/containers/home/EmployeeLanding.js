import React, { Component } from "react";

import "./home.css";

import  PartnerLookup  from '../../components/suppliers/PartnerLookup';

const EmployeeLanding = ({ history, user }) => {
  return  ( 
      <div className="landing">
        <h3 className="welcome">Welcome, {user.displayName}!</h3>
        <div>
                <PartnerLookup history={history}/>
        </div>
      </div>
     )
}

export default EmployeeLanding;