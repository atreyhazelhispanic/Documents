import React, {  Component } from "react";
import PropTypes from "prop-types";
import "./suppliers.css";
import SupplierReport from './SupplierReport';
import { FormGroup } from "react-bootstrap";
import NumberBox  from '../generic/NumberBox';
import { connect } from "react-redux";

import { setReportParameters } from '../../actions/suppliers';



class Reports extends Component {
  constructor(props){
    super(props);
    this.updateParams = this.updateParams.bind(this);
    this.state = {
        departmentNumber : "",
        weeks: ""
    };
  }

  componentWillMount() {

       // console.log('Reports MOUNTING');

  }

  state = {
        departmentNumber : "",
        weeks: ""
  };

  updateParams(e) {
    var s = this.state;
    var value = null;

  
    if(e.target.name === 'weeks'){
      try{
        var tval = parseInt(e.target.value);
        if(tval > 0 && tval <= 26){
          s['weeks'] = tval;
        }else{
          s['weeks'] = null;
        }
      }catch(e){
        console.error(e)
      }

    }else{
      s[e.target.name] = e.target.value;

    }
    this.setState(s);
    this.props.setReportParameters(e.target.name, e.target.value);
  }

  renderForm() {

      if(this.props.singleSupplier && !this.props.loadingSingle)
      {
          const valid =  this.state.departmentNumber && this.state.weeks ;
          var reportList = null;
          var supplierForm = null;

          const { id, name } = this.props.singleSupplier;
          const { departmentNumber, weeks }  = this.state;

          reportList = (<ul className="reportList">
              { this.props.reports.map((report, i) =>  (
              <SupplierReport supplierId={id}
                              departmentNumber={departmentNumber}
                              index={i} key={i}
                              report={report}
                              regions={this.props.regions} />
                 ))}</ul>);

              const wholeForm =  <div className="reportsContainer" >
              <div className="row">
                  <div className="col-md-8" style={{ float: "none", padding: "0" }}>
                      <h4>{name} - Supplier Reports</h4>

                      <form>
                          <FormGroup
                              controlId="mainReportForm"
                          >
                              <NumberBox
                                  name="departmentNumber"
                                  displayText="Department Number"
                                  invalid={!departmentNumber}
                                  onChange={(e, target) => { this.updateParams(e, target); }} />

                              <NumberBox
                                  name="weeks"
                                  displayText="# of Weeks (1-26)"
                                  invalid={!weeks}
                                  onChange={(e, target) => { this.updateParams(e, target); }} />

                          </FormGroup>
                      </form>
                      {valid ? reportList : null }

                  </div>
              </div>
          </div>;

              return wholeForm;
    }

      return null;
  }

  render() {

        if(!this.props.loadingSingle && this.props.singleError) {
            return (<p className="alert alert-danger">The requested supplier could not be referenced.</p>)
        }
        if(!this.props.loadingSingle && !this.props.singleSupplier ) {
            return <p className="alert alert-danger"><i className={"fa fa-chain-broken"}></i> The requested supplier cannot be found in our records.</p>
        }
         return (
              this.props.loadingSingle ?   <h1>Loading Supplier ...</h1> : this.renderForm()
            );
  }
}

function mapStateToProps(state) {
  const { singleSupplier, query, loadingSingle, singleError } = state.suppliers;
  const { user } = state.auth;

  return { singleSupplier, query, user, loadingSingle, singleError };
}

export default connect(mapStateToProps, { setReportParameters })(Reports);
