import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSupplier, getSuppliers, getSingleSupplier } from '../../actions/suppliers';
import  Reports    from "../../components/suppliers/Reports";

import * as _ from 'lodash';


export class ReportsPage extends Component {
  constructor(props) {
    super(props);

    
  }

  componentWillMount(){
      const supplierId = this.props.match.params.supplierId;
      const { user } = this.props;

      if(supplierId) {

          this.props.getSingleSupplier({supplierId, user});

      }else{
        console.log('--> supplier id not set')
      }
         
  }
  render() {



    return (
      <div>
          <div className="container">
              {this.props.reports && this.props.supplier ? <Reports reports={this.props.reports.reports} supplierId={this.props.supplier.id}  regions={this.props.reports.regions} user={this.props.user} /> : null }
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {

  return {
    reports: state.suppliers.reports,
    user: state.auth.user,
    suppliers: state.suppliers.suppliers,
    dispatch: PropTypes.func.isRequired,
    supplier: state.suppliers.singleSupplier
  };
}

export default connect(mapStateToProps, { getSingleSupplier })(ReportsPage);
